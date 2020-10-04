import type { UserState } from "./user";

declare module "react-recollect" {
    interface Store {
        user?: UserState;
    }
}
