// A small two-word parser in the Sierra manner. World data lives in world.js.
import * as W from "./world.js";

const DIRS = {
  n: "north", s: "south", e: "east", w: "west", u: "up", d: "down",
  north: "north", south: "south", east: "east", west: "west", up: "up", down: "down",
  aft: "aft", forward: "forward", fore: "forward", back: "back", out: "out", outside: "outside", door: "door", in: "in", car: "car", house: "house", road: "road",
};
const VERBS = {
  l: "look", look: "look", x: "examine", examine: "examine", inspect: "examine", read: "examine",
  get: "take", take: "take", grab: "take", pick: "take", drop: "drop", i: "inventory", inv: "inventory", inventory: "inventory",
  go: "go", walk: "go", climb: "go", enter: "go", talk: "talk", speak: "talk", ask: "talk",
  show: "show", give: "show", use: "use", insert: "use", drink: "use", turn: "use", switch: "use", put: "use",
  open: "open", help: "help", save: "save", restore: "restore", restart: "restart",
  wait: "wait", z: "wait", hello: "talk", hi: "talk",
  photograph: "photo", photo: "photo", shoot: "photo", snap: "photo", wind: "use", load: "use", eat: "use", set: "use", touch: "use",
  search: "examine", dig: "examine", rummage: "examine", check: "examine", light: "use", strike: "use", unlock: "use", insert: "use", put: "use", remove: "use", scrape: "examine",
};
const PHOTO_WORDS = new Set(["photo", "picture", "photograph", "pic", "shot"]);
const STOP = new Set(["the", "a", "an", "to", "at", "on", "into", "with", "of", "my", "it", "please", "through", "around", "inside", "from"]);

function clone(o) { return JSON.parse(JSON.stringify(o)); }

export class Game {
  constructor(print) {
    this.print = print;
    this.reset();
  }
  reset() {
    this.rooms = clone(W.rooms);
    this.items = clone(W.items);
    this.people = clone(W.people);
    this.flags = {};
    this.here = W.start;
    this.said = {};
    this.over = false;
    this.moves = 0;
  }
  // ----- helpers exposed to hooks -----
  has(id) { return this.items[id] && this.items[id].location === "player"; }
  give(id) { this.items[id].location = "player"; }
  say(who) {
    const lines = this.people[who].talk;
    const n = this.said[who] || 0;
    this.said[who] = n + 1;
    return lines[Math.min(n, lines.length - 1)];
  }
  win() { this.over = "won"; return W.winText.join("\n"); }
  die(text) {
    this.over = "dead";
    return text + "\n\n*** You have died. ***\n\nType RESTORE to go back to your last save, or RESTART to begin again.";
  }
  // ----- state -----
  snapshot() {
    return JSON.stringify({ rooms: this.rooms, items: this.items, people: this.people, flags: this.flags, here: this.here, said: this.said, moves: this.moves });
  }
  load(json) {
    const s = JSON.parse(json);
    Object.assign(this, s);
    this.over = false;
  }
  // ----- describing -----
  dark() { return this.rooms[this.here].dark && !this.flags.lightOn; }
  describe(full) {
    const r = this.rooms[this.here];
    let out = r.name.toUpperCase() + "\n";
    if (this.dark()) return out + "It is too dark to see. You can hear traffic overhead and the train ticking as it cools.";
    out += r.desc;
    for (const it of Object.values(this.items))
      if (it.location === this.here && !it.hidden && (it.takeable || it.inRoom)) out += "\n" + (it.inRoom || `There is a ${it.name} here.`);
    return out;
  }
  findThing(word, where) {
    if (!word) return null;
    // prefer the thing in the room over the thing in your pocket when a word fits both
    let fallback = null;
    for (const [id, it] of Object.entries(this.items)) {
      if (!it.aliases.includes(word) || it.hidden) continue;
      if (where !== "any" && it.location !== where && it.location !== "player") continue;
      const m = { id, it, kind: "item" };
      if (it.location === this.here) return m;
      if (!fallback) fallback = m;
    }
    if (fallback) return fallback;
    for (const [id, p] of Object.entries(this.people))
      if (p.aliases.includes(word) && p.location === this.here) return { id, it: p, kind: "person" };
    return null;
  }
  // ----- the parser -----
  run(line) {
    const words = line.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w));
    if (!words.length) return "Say something.";
    if (this.over && !["restore", "restart", "load", "quit"].includes(words[0]))
      return this.over === "won" ? "The game is over. Type RESTART to play again." : "You are dead. Type RESTORE or RESTART.";
    this.moves++;
    let verb = VERBS[words[0]];
    let noun = words[1], noun2 = words.length > 2 ? words[words.length - 1] : undefined;
    if (words[0] === "pick" && noun === "up") { noun = words[2]; noun2 = words.length > 3 ? words[words.length - 1] : undefined; }
    if (!verb && DIRS[words[0]]) { verb = "go"; noun = words[0]; }
    if (!verb) return `I don't know the word "${words[0]}".`;
    if (verb === "go" && DIRS[noun]) noun = DIRS[noun];
    if (verb === "take" && PHOTO_WORDS.has(noun)) verb = "photo";
    if (verb === "photo") { verb = "use"; noun = "camera"; }
    if ((noun === "on" || noun === "off") && words[2]) noun = words[2];
    switch (verb) {
      case "look": return noun ? this.examine(noun) : this.describe(true);
      case "examine": return this.examine(noun);
      case "take": return this.take(noun);
      case "drop": return this.drop(noun);
      case "inventory": {
        const inv = Object.values(this.items).filter((i) => i.location === "player").map((i) => "  " + i.name);
        return inv.length ? "You are carrying:\n" + inv.join("\n") : "You are carrying nothing but a feeling.";
      }
      case "go": return this.go(noun);
      case "talk": return this.talk(noun);
      case "show": return this.show(noun, noun2);
      case "use": return this.use(noun);
      case "open": return noun === "door" ? (W.hooks.use && W.hooks.use.door && this.here === "porch" ? W.hooks.use.door(this) : this.go("door")) : "That doesn't open.";
      case "wait": return "Time passes. The train does not care.";
      case "help": return [
        "Two words will usually do: LOOK, EXAMINE thing, TAKE thing, DROP thing,",
        "GO direction (or just N, S, UP, AFT...), TALK TO person, SHOW thing TO person,",
        "USE thing, INVENTORY, SAVE, RESTORE, RESTART.",
        "You have died before. You will die again. Save often.",
      ].join("\n");
      case "save": try { localStorage.setItem("adventure:save", this.snapshot()); return "Game saved."; } catch (e) { return "Could not save."; }
      case "restore": {
        let s = null; try { s = localStorage.getItem("adventure:save"); } catch (e) {}
        if (!s) return "No saved game.";
        this.load(s); return "Game restored.\n\n" + this.describe(true);
      }
      case "restart": this.reset(); return W.intro.join("\n") + "\n\n" + this.describe(true);
    }
    return "Nothing happens.";
  }
  examine(noun) {
    if (!noun) return "Examine what?";
    if (noun === "car" && this.here === "car") noun = "trash";
    if (noun === "car" && this.here === "courtyard") return "Your car. Dented, dusty, full. You could get in it.";
    if (this.dark()) return "It is too dark.";
    const f = this.findThing(noun, this.here);
    if (!f) return `You see no ${noun} here.`;
    if (W.hooks.examine && W.hooks.examine[f.id]) { const t = W.hooks.examine[f.id](this); if (t) return t; }
    return f.it.desc;
  }
  take(noun) {
    if (!noun) return "Take what?";
    if (this.dark()) return "You feel around in the dark and find nothing you want to keep.";
    const f = this.findThing(noun, this.here);
    if (!f) {
      if (W.hooks.take && W.hooks.take[noun]) { const t = W.hooks.take[noun](this); if (t) return t; }
      return `You see no ${noun} here.`;
    }
    if (f.kind === "person") return `The ${f.it.name} would object.`;
    if (f.it.location === "player") return "You already have it.";
    if (!f.it.takeable) return "You can't take that.";
    f.it.location = "player";
    return "Taken.";
  }
  drop(noun) {
    const f = this.findThing(noun, "player");
    if (!f || f.it.location !== "player") return "You don't have that.";
    f.it.location = this.here;
    return "Dropped.";
  }
  go(dir) {
    if (!dir) return "Go where?";
    if (W.hooks.go && W.hooks.go[dir]) { const t = W.hooks.go[dir](this, dir); if (t) return t; }
    let ex = this.rooms[this.here].exits[dir];
    if (!ex) return "You can't go that way.";
    if (typeof ex === "object") {
      if (ex.blockedBy && !this.flags.ticketShown) return this.people[ex.blockedBy].block;
      if (ex.locked) return ex.msg || "It's locked.";
      ex = ex.to;
    }
    this.here = ex;
    return this.describe(true);
  }
  talk(noun) {
    if (!noun) return "Talk to whom?";
    const f = this.findThing(noun, this.here);
    if (!f || f.kind !== "person") return "There is nobody by that name here. Talking to yourself is free, though.";
    if (W.hooks.talk && W.hooks.talk[f.id]) { const t = W.hooks.talk[f.id](this); if (t) return t; }
    return this.say(f.id);
  }
  show(noun, to) {
    const f = this.findThing(noun, "player");
    if (!f || f.it.location !== "player") return "You don't have that.";
    const p = this.findThing(to, this.here);
    if (W.hooks.show && W.hooks.show[f.id]) { const t = W.hooks.show[f.id](this, p ? p.id : null); if (t) return t; }
    return p && p.kind === "person" ? `The ${p.it.name} looks at your ${f.it.name} and is not moved.` : "Show it to whom?";
  }
  use(noun) {
    if (!noun) return "Use what?";
    if (noun === "door" && W.hooks.use && W.hooks.use.door) return W.hooks.use.door(this);
    const f = this.findThing(noun, "any");
    if (!f) return `You see no ${noun} here.`;
    if (f.kind === "item" && f.it.location !== "player" && f.it.location !== this.here) return "You don't have that.";
    if (W.hooks.use && W.hooks.use[f.id]) { const t = W.hooks.use[f.id](this); if (t) return t; }
    return "That doesn't do anything useful.";
  }
  begin() { return W.intro.join("\n") + "\n\n" + this.describe(true); }
}
