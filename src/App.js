import React from "react";
import Home from "./components/Home";
import { Route } from "react-router-dom";

function App() {
  // const { themeString, toggleTheme } = useDarkMode();
  return (
    <div>
      <Route path="/">
        <Home />
      </Route>
    </div>
  );
}

export default App;
