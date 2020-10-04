import React from "react";
import { Store } from "react-recollect";
import { Login } from "./volunteers/Login";
import { Cats } from "./volunteers/manage/Cats";
import { Dogs } from "./volunteers/manage/Dogs";
import { Manage } from "./volunteers/manage/Manage";
import { Volunteers } from "./volunteers/manage/Volunteers";

export type Route = {
    route: string;
    name: string;
    component?: () => React.ReactElement;
    hideInNav?: (store: Store) => boolean;
    exact: boolean;
};

type Routes = { [key: string]: Route };

export const routes: Routes = {
    home: {
        route: "/home",
        name: "Home",
        exact: true,
    },
    cats: {
        route: "/cats",
        name: "Cats",
        exact: true,
    },
    dogs: {
        route: "/dogs",
        name: "Dogs",
        exact: true,
    },
    login: {
        route: "/login",
        name: "Login",
        component: () => <Login />,
        hideInNav: (store: Store) => !!store.user?.loggedIn,
        exact: true,
    },
    manage: {
        route: "/manage",
        name: "Manage Pets",
        component: () => <Manage />,
        hideInNav: (store: Store) => !store.user?.loggedIn,
        exact: false,
    },
};

export const manageRoutes: Routes = {
    cats: {
        route: "/manage/cats",
        name: "Manage Cats",
        component: () => <Cats />,
        hideInNav: (store: Store) => !store.user?.user?.permissions?.cats,
        exact: true,
    },
    dogs: {
        route: "/manage/dogs",
        name: "Manage Dogs",
        component: () => <Dogs />,
        hideInNav: (store: Store) => !store.user?.user?.permissions?.dogs,
        exact: true,
    },
    volunteers: {
        route: "/manage/volunteers",
        name: "Manage Volunteers",
        component: () => <Volunteers />,
        hideInNav: (store: Store) => !store.user?.user?.permissions?.admin,
        exact: true,
    },
};
