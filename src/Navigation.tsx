import React, { useCallback, useEffect, useState } from "react";
import { collect } from "react-recollect";
import { useHistory } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import { routes } from "./Routes";
import { logout } from "./stores/user";

/* eslint-disable react-hooks/exhaustive-deps */

export const Navigation = collect(({ store }) => {
    const history = useHistory();
    const [activeRoute, setActiveRoute] = useState(
        routes[history.location.pathname.split("/")[1].toLowerCase()] || routes.home,
    );
    useEffect(() => history.push(activeRoute.route), [activeRoute]);

    const [loading, setLoading] = useState(false);
    const doLogout = useCallback(async () => {
        setLoading(true);
        await logout();
        setLoading(false);
        setActiveRoute(routes.home);
    }, []);

    return (
        <Menu>
            <Menu.Item header>Pet Rescue By Judy</Menu.Item>
            {Object.values(routes).map(route =>
                !route.hide?.(store) ? (
                    <Menu.Item
                        key={route.name}
                        name={route.name}
                        active={activeRoute.name === route.name}
                        onClick={() => setActiveRoute(route)}
                    />
                ) : null,
            )}
            {store.user?.user?.username ? (
                <>
                    <Menu.Item>{store.user.user.username}</Menu.Item>
                    <Menu.Item disabled={loading}>
                        <Button disabled={loading} primary onClick={doLogout}>
                            Logout
                        </Button>
                    </Menu.Item>
                </>
            ) : null}
        </Menu>
    );
});
