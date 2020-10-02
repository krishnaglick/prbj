import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router";
import { Volunteers } from "./volunteers/Volunteers";

function AppA() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export const App = () => {
    return (
        <Switch>
            <Route path="/home" exact>
                <AppA />
            </Route>
            <Route path="/dogs" exact>
                <AppA />
            </Route>
            <Route path="/cats" exact>
                <AppA />
            </Route>
            <Route path={`/volunteers`}>
                <Volunteers />
            </Route>
        </Switch>
    );
};
