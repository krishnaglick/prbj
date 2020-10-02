import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { Navigation } from "./Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import { init } from "./stores/user";

ReactDOM.render(
    <React.Fragment>
        <Router>
            <Navigation />
            <App />
        </Router>
    </React.Fragment>,
    document.getElementById("root"),
    () => init(),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
