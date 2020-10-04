import { store } from "react-recollect";

export type Permissions = {
    dogs?: boolean;
    cats?: boolean;
    admin?: boolean;
};

export type User = {
    firstName: string;
    lastName: string;
    username: string;
    permissions: Permissions;
};

export type UserState = {
    loggedIn: boolean;
    user?: Partial<User>;
};

export const initUserStore = () => {
    const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.loggedIn) {
        store.user = user;
    } else {
        store.user = {
            loggedIn: false,
            user: {},
        };
    }
};

export const login = async (username: string, password: string) => {
    // Do Login
    return await new Promise(res => {
        store.user!.loggedIn = true;
        store.user!.user!.firstName = "Volun";
        store.user!.user!.lastName = "Teer";
        store.user!.user!.permissions = {
            admin: true,
            cats: true,
            dogs: true,
        };
        store.user!.user!.username = username;
        localStorage.setItem("user", JSON.stringify(store.user));
        setTimeout(res, 200);
    });
};

export const logout = async () => {
    // Do logout
    return await new Promise(res => {
        store.user!.loggedIn = false;
        store.user!.user = {};
        localStorage.setItem("user", "{}");
        setTimeout(res, 200);
    });
};
