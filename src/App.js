import React from "react";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";
import HauntedMap from "./components/Maps/HauntedMap"


function App() {
  // const { themeString, toggleTheme } = useDarkMode();
  return (
    <div>
      <Switch>
       <Route exact path="/haunted-locations">
        <HauntedMap/>
      </Route>
      <Route path="/">
        <Home />
      </Route>
      </Switch>
     
    </div>
  );
}

export default App;
