import React, { useCallback, useEffect, useState } from "react";
import { collect, WithStoreProp } from "react-recollect";
import { useHistory } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import { routes } from "./Routes";
import { logout } from "./stores/user";

export const Navigation = collect(({ store }: WithStoreProp) => {
    const history = useHistory();
    const [activeRoute, setActiveRoute] = useState(
        routes[history.location.pathname.split("/")[1].toLowerCase()] || routes.home,
    );
    useEffect(() => history.push(activeRoute.route), [activeRoute, history]);

    const [loading, setLoading] = useState(false);
    const doLogout = useCallback(async () => {
        setLoading(true);
        await logout();
        setLoading(false);
        setActiveRoute(routes.home);
    }, [history]);

    return (
        <Menu>
            <Menu.Item header>Pet Rescue By Judy</Menu.Item>
            {Object.values(routes).map(route =>
                !route.hideInNav?.(store) ? (
                    <Menu.Item
                        key={route.name}
                        name={route.name}
                        active={activeRoute.name === route.name}
                        onClick={() => setActiveRoute(route)}
                    />
                ) : null,
            )}
            {store.user?.user?.username ? (
                <Menu.Menu position="right">
                    <Menu.Item>{store.user.user.username}</Menu.Item>
                    <Menu.Item disabled={loading}>
                        <Button disabled={loading} primary onClick={doLogout}>
                            Logout
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            ) : null}
        </Menu>
    );
});
