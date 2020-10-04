import React from "react";
import { Store } from "react-recollect";
import { Login } from "./volunteers/Login";
import { Manage } from "./volunteers/Manage";

type Route = {
    route: string;
    name: string;
    component?: () => React.ReactElement;
    hide?: (store: Store) => boolean;
};

export const routes: { [key: string]: Route } = {
    home: {
        route: "/home",
        name: "Home",
    },
    cats: {
        route: "/cats",
        name: "Cats",
    },
    dogs: {
        route: "/dogs",
        name: "Dogs",
    },
    login: {
        route: "/login",
        name: "Login",
        component: () => <Login />,
        hide: (store: Store) => !!store.user?.loggedIn,
    },
    manage: {
        route: "/manage",
        name: "Manage Pets",
        component: () => <Manage />,
        hide: (store: Store) => !store.user?.loggedIn,
    },
};
