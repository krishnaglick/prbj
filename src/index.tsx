import React from "react";
import ReactDOM from "react-dom";
import "./index.style.scss";
import "semantic-ui-css/semantic.min.css";
import { AppRouter } from "./AppRouter";
import * as serviceWorker from "./serviceWorker";
import { Navigation } from "./Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import { initStore } from "./stores";

initStore();
ReactDOM.render(
    <React.Fragment>
        <Router>
            <Navigation />
            <AppRouter />
        </Router>
    </React.Fragment>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
