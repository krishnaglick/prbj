import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import logo from "./logo.svg";
import { routes } from "./Routes";

function AppA() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
        </div>
    );
}

export const App = () => {
    return (
        <Switch>
            {Object.values(routes).map(({ route, component }) => (
                <Route path={route} exact>
                    {component?.() || <AppA />}
                </Route>
            ))}
        </Switch>
    );
};
