import { store } from "react-recollect";

export type Permissions = {
    dogs: boolean;
    cats: boolean;
    admin: boolean;
};

export type User = {
    firstName: string;
    lastName: string;
    username: string;
    permissions: Permissions;
};

export type UserState = {
    loggedIn: boolean;
    user: User | null;
};

export const init = () => {
    const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.loggedIn) {
        store.user = user;
    } else {
        store.user = {
            loggedIn: false,
            user: null,
        };
    }
};
