import React from "react";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Resumap from "./components/Resumap";
function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Home></Home>
      </Route>
      <Route path="/about">
        <About />
      </Route>

      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/projects">
        <Projects />
      </Route>
      <Route path="/resumap">
        <Resumap />
      </Route>
    </div>
  );
}

export default App;
