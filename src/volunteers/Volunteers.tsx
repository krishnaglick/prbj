import React, { useEffect } from "react";
import { collect } from "react-recollect";
import { Route, Switch, useHistory } from "react-router";
import { Login } from "./Login";
import { Manage } from "./Manage";

export const Volunteers = collect(({ store }) => {
    const history = useHistory();
    useEffect(() => {
        if (!history.location.pathname.includes("volunteer"))
            if (store.user.loggedIn) {
                history.push(history.location.pathname + "/manage");
            } else {
                history.push(history.location.pathname + "/login");
            }
    });
    return (
        <Switch>
            <Route path="/Volunteers/login" exact>
                <Login />
            </Route>
            <Route path="/Volunteers/manage" exact>
                <Manage />
            </Route>
        </Switch>
    );
});
