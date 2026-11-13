// The world for lord_boogers_house_of_horrors.exe. Edit freely: rooms, items,
// people, and the puzzle hooks at the bottom. engine.js reads this.
//
// The goal: proof of the supernatural, on film, by Friday. Everything in the
// house is fake except one thing, and it only shows if you do things in order.
// Nothing in the room text is capitalized on purpose. Nobody said it was easy.

export const title = "LORD BOOGER'S HOUSE OF HORRORS";
export const intro = [
  "LORD BOOGER'S HOUSE OF HORRORS",
  "",
  "You write for a weekly paper, the paper is dying. Print media is dying in",
  "general, we're scraping the bottom of the barrel for scoops. The editor",
  "comes to your desk...He wants the proof of the supernatural. He wants the",
  "proof by Friday. You look at him and think, \"I spent so much fucking money",
  "on college and journalism classes. How did it come to this? Good lord.\"",
  "Snapping out of your disbelief you grab your camera and start to head off.",
  "They give you a map and a location circled. They buried the lede, the",
  "location is four hundred miles away north south then north again.",
  "",
  "You have a shitbox car filled with trash, your camera, a flashlight with no",
  "batteries, and one match in a matchbook.",
  "",
  "It's Wednesday night. You've just pulled up.",
  "",
  "Type help if you get stuck. Type look to look around. Good luck.",
];

export const start = "courtyard";

export const rooms = {
  courtyard: {
    name: "Courtyard",
    desc:
      "Gravel, weeds, a manor house that has been dying longer than the paper. Three stories of it, shutters hanging off, one window lit on the top floor and then not. Your car ticks behind you where you left it. There is a fountain in the middle of the drive, dry, with something bolted to the rim. Steps go up to the front door. A low building sits off to the west with a light moving in it. The road is back south, if you can call it a road.",
    exits: { up: "porch", house: "porch", north: "porch", west: "carriage", south: "road", road: "road", car: "car" },
  },
  car: {
    name: "Your Car",
    desc:
      "The driver's seat of the shitbox. It smells like the inside of a glove. Fast food bags to the windows, a parking ticket from a city you have never been to, receipts, more bags. You are not proud of this. There is probably something useful in the trash if you were desperate enough to dig, and you are. The courtyard is out.",
    exits: { out: "courtyard", back: "courtyard" },
  },
  carriage: {
    name: "Carriage House",
    desc:
      "A stone outbuilding that used to hold horses and now holds a man. An old man sits in a kitchen chair by the door with a lantern at his feet that has gone out, a transistor radio on a crate playing static, and the look of someone who stopped expecting visitors around 1991. He does not get up. The courtyard is east.",
    exits: { east: "courtyard", back: "courtyard" },
  },
  porch: {
    name: "Front Porch",
    desc:
      "Wide boards, half of them soft. A rocking chair rocks a little on its own, which you decide is wind. The front door is a slab of oak with a lock the size of your fist. The courtyard is back down the steps.",
    exits: { down: "courtyard", back: "courtyard", door: { to: "foyer", locked: true, msg: "Locked. You put your shoulder into it. It does not notice." }, in: { to: "foyer", locked: true, msg: "Locked. You put your shoulder into it. It does not notice." }, north: { to: "foyer", locked: true, msg: "Locked. You put your shoulder into it. It does not notice." } },
  },
  foyer: {
    name: "Foyer",
    desc:
      "Inside. It is colder in here than outside, which is a trick houses like this know. A chandelier hangs over you made of something pale. A staircase sweeps up and stops at a wall; somebody built it for the look. A doorway north, candlelight past it. Stone steps go down into a smell. The porch is out.",
    exits: { north: "parlor", down: "cellar", out: "porch", south: "porch" },
  },
  cellar: {
    name: "Cellar",
    desc:
      "Dirt floor, low beams, shelves along one wall with jars on them, and you do not look at the jars long. Something drips. The steps go back up.",
    exits: { up: "foyer" },
    dark: true,
  },
  parlor: {
    name: "Parlor",
    desc:
      "Velvet drapes gone the color of tea. A fire burns in the grate without heat. Over the mantel a tall mirror in a gilt frame, and beside the fireplace a grandfather clock with its hands stopped and a card taped to the glass. On the far wall a portrait of a man in a cape watches you cross the room. The foyer is south.",
    exits: { south: "foyer" },
  },
  road: { name: "The Road", desc: "", exits: {} },
};

export const items = {
  camera: {
    name: "camera",
    aliases: ["camera", "polaroid"],
    desc: "The paper's Polaroid. Tape on the back says property of, and then nothing, which is about right. The film door is empty. You knew that. You drove four hundred miles knowing that.",
    location: "player",
    takeable: true,
  },
  flashlight: {
    name: "flashlight",
    aliases: ["flashlight", "torch"],
    desc: "A plastic flashlight with no batteries in it. Right now it is a tube you carry.",
    location: "player",
    takeable: true,
  },
  matchbook: {
    name: "matchbook",
    aliases: ["matchbook", "match", "matches", "book"],
    desc: "A matchbook from a bar that closed. One match left, bent. You have been saving it for something and you do not know what.",
    location: "player",
    takeable: true,
  },
  trash: {
    name: "trash",
    aliases: ["trash", "garbage", "bags", "bag", "receipts", "mess", "seat", "glovebox", "glove box"],
    desc: "Bags on bags. You could dig through it. You would rather not. You are going to.",
    location: "car",
    takeable: false,
  },
  film: {
    name: "pack of film",
    aliases: ["film", "pack", "cartridge"],
    desc: "Polaroid film. One shot left in the pack, expired some time in the last century. The box says true color like it is making a promise.",
    location: null,
    takeable: true,
  },
  fountain: {
    name: "fountain",
    aliases: ["fountain", "basin"],
    desc: "A stone basin with a stone figure in the middle, caped, pointing at nothing. Dry. Leaves in the bottom. The thing bolted to the rim is a plaque gone green.",
    location: "courtyard",
    takeable: false,
  },
  plaque: {
    name: "plaque",
    aliases: ["plaque", "bronze", "inscription", "rim"],
    desc: "You scrape the green off with a thumbnail. in memory of ned booger, lord of this house, 1931 to 1991. he died in the parlor at 3:33 in the morning, winding the clock he loved. do not wind the clock. Somebody has scratched a small heart next to the word clock, and somebody else has scratched it out.",
    location: "courtyard",
    takeable: false,
  },
  lantern: {
    name: "lantern",
    aliases: ["lantern", "lamp", "wick"],
    desc: "An oil lantern, old and well kept, which is more than you can say for the man. The wick is dry and the glass is cold. It went out a while ago.",
    location: "carriage",
    takeable: false,
  },
  radio: {
    name: "radio",
    aliases: ["radio", "transistor"],
    desc: "A transistor radio the size of a brick, playing static with real commitment. The battery door on the back is held on with tape.",
    location: "carriage",
    takeable: false,
  },
  batteries: {
    name: "batteries",
    aliases: ["batteries", "battery", "cells"],
    desc: "Two fat batteries, warm from the radio, which means there is something left in them.",
    location: null,
    takeable: true,
  },
  housekey: {
    name: "iron key",
    aliases: ["iron", "housekey", "house key", "door key", "big key", "key"],
    desc: "An iron key as long as your hand, cold, heavy, the kind you could hurt somebody with. It fits the front door. He said so.",
    location: null,
    takeable: true,
  },
  key: {
    name: "brass key",
    aliases: ["key", "brass", "winding key", "small key"],
    desc: "A small brass key with a square hole in the end, the kind that winds a clock. It is colder than the cellar, which should not be possible.",
    location: "cellar",
    takeable: true,
    hidden: true,
    inRoom: "On the shelf, between two jars, there is a small brass key.",
  },
  chandelier: {
    name: "chandelier",
    aliases: ["chandelier", "bones", "bone"],
    desc: "Bones, you think, and your stomach does a thing. You look closer. Plaster. Made in ohio, says a femur, in raised letters.",
    location: "foyer",
    takeable: false,
  },
  clock: {
    name: "clock",
    aliases: ["clock", "grandfather", "hands", "pendulum", "card"],
    desc: "Taller than you. Hands stopped at twenty past eleven, pendulum still. A square keyhole in the face. The card taped to the glass says, in pencil, do not wind, and under that, in a different hand, i mean it.",
    location: "parlor",
    takeable: false,
  },
  mirror: {
    name: "mirror",
    aliases: ["mirror", "glass", "reflection"],
    desc: "A tall mirror in a gilt frame. The room in it, the drapes, the fire, and you, looking like four hundred miles.",
    location: "parlor",
    takeable: false,
  },
  fire: {
    name: "fire",
    aliases: ["fire", "fireplace", "flames", "grate"],
    desc: "You put your hand near it. Nothing. Orange cellophane, a fan, a bulb. You stood there a while before you noticed and that is the part that bothers you.",
    location: "parlor",
    takeable: false,
  },
  portrait: {
    name: "portrait",
    aliases: ["portrait", "painting", "booger", "lord", "ned", "man in cape"],
    desc: "Ned Booger in oils. Cape, widow's peak, the smile of a man who was never once asked a follow-up question. The eyes track you. There is a motor behind the canvas and you can hear it.",
    location: "parlor",
    takeable: false,
  },
};

export const people = {
  caretaker: {
    name: "old man",
    aliases: ["man", "old man", "caretaker", "earl", "him", "guy"],
    location: "carriage",
    desc: "Eighty if he is a day. Cardigan, slippers, a face like a closed gate. He is looking at the dead lantern the way you look at a phone that will not ring.",
    talk: [
      '"Paper sent you." It is not a question. "They send one every few years. None of them had a light either." He nudges the dead lantern with a slipper. "Can\'t see to find the key in the dark and I ain\'t getting up. Light that and we\'ll talk."',
      '"Lantern," he says, and nods at it, and that is the whole conversation.',
      '"Ned was my brother," he says to the wall. "Everything in that house is fake. The bones, the fire, the eyes on the painting, he built all that for the tourists. Everything\'s fake except him." He does not explain. "Don\'t wind the clock."',
    ],
  },
};

// The real thing is visible when: parlor, clock wound, flashlight off.
function ghostVisible(g) { return g.here === "parlor" && g.flags.clockWound && !g.flags.lightOn; }

export const hooks = {
  talk: {
    caretaker(g) {
      if (g.flags.lanternLit && !g.flags.gotKey) {
        g.flags.gotKey = true;
        g.give("housekey");
        g.said.caretaker = Math.max(g.said.caretaker || 0, 2);
        return '"There it is." He fishes in the cardigan, comes out with an iron key, and holds it out without looking at you. "Front door. Don\'t touch anything that touches you back, and if you need the radio batteries take \'em, all it gets is static and I know the words." Then, to the wall: "Ned was my brother. Everything in that house is fake. Everything except him. Don\'t wind the clock."';
      }
      return g.say("caretaker");
    },
  },
  show: {
    matchbook(g, to) { if (to === "caretaker") return '"Then use it," he says. "On the lantern. Not on me."'; },
    camera(g, to) { if (to === "caretaker") return 'He looks at the camera a long time. "No flash in the parlor," he says. "He don\'t care for it." A pause. "The paint. The paint don\'t care for it."'; },
  },
  examine: {
    trash(g) {
      if (!g.flags.film1) {
        g.flags.film1 = true; g.give("film");
        return "You dig. Bags, a sock, a fork, half a map of a state you drove through. At the bottom, under the seat, a pack of Polaroid film you forgot you ever bought. One shot in it. You take it. You feel nothing like pride.";
      }
      if (g.flags.wasted && !g.flags.film2) {
        g.flags.film2 = true; g.flags.wasted = false; g.give("film");
        return "You dig again, deeper, past the layer you were afraid of. Your hand closes on another pack of film, older than the first, with something dried on it. One shot. You have no idea how long it has been in here. It will have to do.";
      }
      return "You dig. There is nothing left in here but your own bad decisions, and those you already have.";
    },
    mirror(g) {
      if (ghostVisible(g)) return "The room in the mirror is the same room, except for the man standing behind your reflection. Cape. Widow's peak. He is holding a small card that says no refunds and he is looking at you, which is more than the portrait ever managed. You turn around. Nothing. You turn back. Still there. He raises his eyebrows like a man waiting for you to get on with it.";
      if (g.flags.clockWound) return "The mirror shows the room and you. Where the flashlight hits the glass it glares white and shows nothing. At the edge of the glare something moves away from the light, or you need sleep.";
    },
    clock(g) {
      if (g.flags.clockWound) return "The pendulum swings. The hands sit at 3:33 and do not move. It is not keeping time. It is keeping something.";
    },
    fire(g) {
      if (g.flags.clockWound) return "The fan has stopped. The cellophane hangs. The bulb is dead. The room is colder than a room with a fire has any right to be and you can see your breath in the mirror.";
    },
    lantern(g) {
      if (g.flags.lanternLit) return "Lit now. Yellow light up the stone walls. The old man looks ten years younger in it, which puts him at seventy.";
    },
    radio(g) {
      if (g.flags.tookBatteries) return "Quiet now. The battery door hangs open. The old man does not seem to miss it.";
    },
  },
  use: {
    trash(g) { return hooks.examine.trash(g); },
    matchbook(g) {
      if (!g.has("matchbook")) return "You don't have it.";
      if (g.here === "carriage") {
        g.flags.lanternLit = true;
        g.items.matchbook.location = "gone";
        g.items.lantern.desc = "Lit now. Yellow light up the stone walls.";
        return "You tear out the last match, strike it on the third try, and get it to the wick before it reaches your fingers. The lantern catches. The carriage house comes up out of the dark, stone and straw and the old man blinking at you like you did something. \"Well,\" he says. \"Huh.\"";
      }
      if (g.here === "cellar") return "You think about it. One match. Four seconds of cellar and then you are standing in the dark with no match and nothing to show for it. You put it back.";
      return "You have one match. You are not going to spend it on this.";
    },
    lantern(g) {
      if (g.flags.lanternLit) return "It is lit. Leave it.";
      if (!g.has("matchbook")) return "No match, no fire. That is how fire works.";
      return hooks.use.matchbook(g);
    },
    radio(g) { return hooks.use.batteries(g); },
    batteries(g) {
      if (g.has("batteries")) {
        if (!g.has("flashlight")) return "You have batteries and nothing to put them in.";
        g.flags.batteries = true;
        g.items.batteries.location = "gone";
        g.items.flashlight.desc = "A plastic flashlight with two warm radio batteries in it. It works. Mostly.";
        return "You thumb the batteries into the flashlight, wrong way, right way. The bulb comes up orange, then white. You have a flashlight now.";
      }
      if (g.here !== "carriage") return "There are no batteries here.";
      if (!g.flags.gotKey) return "You reach for the radio. The old man does not move, but something about how he does not move makes you stop.";
      g.flags.tookBatteries = true;
      g.give("batteries");
      g.items.radio.desc = "Quiet now. The battery door hangs open.";
      return "You peel the tape off the radio and shake two fat batteries out into your hand. The static stops. The quiet is worse. \"Told you,\" says the old man.";
    },
    flashlight(g) {
      if (!g.has("flashlight")) return "You don't have it.";
      if (!g.flags.batteries) return "You thumb the switch. Nothing. It is a tube with a switch on it until you find batteries.";
      g.flags.lightOn = !g.flags.lightOn;
      if (g.flags.lightOn && g.here === "cellar") { g.items.key.hidden = false; return "Click. Dirt floor, beams, the shelf, the jars. " + g.items.key.inRoom; }
      if (!g.flags.lightOn && ghostVisible(g)) return "Click. The parlor goes dim. The mirror does not. In it, behind your reflection, a man in a cape straightens his collar and waits.";
      return g.flags.lightOn ? "Click. A circle of orange light." : "Click. Dark.";
    },
    housekey(g) {
      if (g.here === "parlor" && g.has("key")) return hooks.use.clock(g);
      if (g.here !== "porch") return "There is no lock here it fits.";
      g.rooms.porch.exits.door.locked = false;
      g.rooms.porch.exits.in.locked = false;
      g.rooms.porch.exits.north.locked = false;
      return "The iron key goes in like it lives there. You turn it with both hands. The bolt gives with a sound you feel in your teeth and the door drifts open on its own, six inches, and stops.";
    },
    door(g) {
      if (g.here !== "porch") return "There is no door here that wants you.";
      if (!g.rooms.porch.exits.door.locked) return hooks.goDoor(g);
      if (g.has("housekey")) return hooks.use.housekey(g);
      return "Locked. You put your shoulder into it. It does not notice.";
    },
    film(g) {
      if (!g.has("film")) return "You don't have any film.";
      if (!g.has("camera")) return "Film and nothing to put it in. There is a column in that.";
      g.flags.filmLoaded = true;
      g.items.film.location = "gone";
      return "You load the pack into the Polaroid. It whirs and spits the dark slide out onto the ground. One shot. Expired. True color.";
    },
    key(g) {
      if (g.here !== "parlor") return "There is nothing here to wind.";
      return hooks.use.clock(g);
    },
    clock(g) {
      if (g.flags.clockWound) return "It is wound. It is, if anything, over-wound.";
      if (!g.has("key")) return "A square keyhole in the face. You have nothing square.";
      g.flags.clockWound = true;
      return "You fit the brass key and turn it. The clock resists, then gives, then takes the key out of your fingers and turns itself. The pendulum swings. The hands run backward, past eleven, past six, and stop at 3:33. Behind you the fire goes out with a sigh like it had been holding one. The room goes cold. The mirror fogs over, and clears.";
    },
    camera(g) {
      if (!g.has("camera")) return "You don't have the camera.";
      if (!g.flags.filmLoaded) return "You press the button. The camera makes the sound a camera makes with no film in it, which is a sad sound, and you knew that before you pressed it.";
      if (ghostVisible(g)) return g.win();
      g.flags.filmLoaded = false;
      g.flags.wasted = true;
      if (g.here === "parlor" && g.flags.clockWound) return g.die("You take the picture with the flashlight still on. The flash fills the mirror white. Something in the glass does not care for that at all. The photo develops in your hand: the parlor, the fire out, and over your shoulder a face much too close, and the last thing you think is that the focus is soft.");
      return "You take the picture. Flash, whir, a grey square slides out and slowly becomes a photo of exactly what you were looking at, which was nothing. That was the shot. You are a professional.";
    },
    portrait(g) { return "You touch the canvas. The eyes stop moving. Then they start again, slower, which is worse."; },
    mirror(g) { return hooks.examine.mirror(g) || "You touch the glass. Cold. A mirror."; },
    fountain(g) { return "You lean over the dry basin. Leaves. A penny. Nothing to drink, which is probably a mercy."; },
    plaque(g) { return hooks.examine.plaque ? hooks.examine.plaque(g) : g.items.plaque.desc; },
  },
  take: {
    batteries(g) { return hooks.use.batteries(g); },
    battery(g) { return hooks.use.batteries(g); },
    film(g) { if (g.here === "car") return hooks.examine.trash(g); },
  },
  goDoor(g) { g.here = "foyer"; return g.describe(true); },
  go: {
    south(g) { if (g.here === "courtyard") return g.die("You walk back down the drive to the road to flag a ride, because Friday is Friday. The first truck is going the other way. The second truck is not going anywhere now, and neither are you."); },
    road(g) { return hooks.go.south(g); },
  },
};

export const winText = [
  "You raise the Polaroid, keep the flashlight off, and take the picture.",
  "",
  "Whir. A grey square slides out. You wait like you waited as a kid, waving",
  "it, which does nothing. Grey to brown to gold and there he is: the parlor,",
  "your own shoulder, and behind it a man in a cape, sharper than anything",
  "else in the frame, holding a small card.",
  "",
  "no refunds",
  "",
  "In the mirror he nods once, satisfied, and is not there. The clock stops.",
  "The fan in the fireplace clicks back on. Somewhere out in the carriage",
  "house a radio with no batteries plays one bar of a ballgame and quits.",
  "",
  "You have your proof. Nobody will believe it. The paper will run it on page",
  "six under a mattress ad and fold in the spring. But it is Wednesday, and",
  "it is true color, and you spent a lot of fucking money on college.",
  "",
  "*** You have won. Thanks for playing. ***",
];
