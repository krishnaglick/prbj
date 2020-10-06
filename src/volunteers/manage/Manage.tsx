import React, { useEffect, useState } from "react";
import { collect, WithStoreProp } from "react-recollect";
import { useHistory } from "react-router";
import { Container, Grid, Menu } from "semantic-ui-react";
import { manageRoutes } from "../../Routes";
import "./Manage.style.scss";

export const Manage = collect(({ store }: WithStoreProp) => {
    const history = useHistory();
    const routes = Object.values(manageRoutes).filter(route => !route.hideInNav?.(store));
    const [activeRoute, setActiveRoute] = useState(
        manageRoutes[history.location.pathname.split("/")[3]?.toLowerCase()] || routes[0] || manageRoutes.cats,
    );
    useEffect(() => history.push(activeRoute.route), [activeRoute, history]);

    return (
        <Container>
            <Grid divided="vertically" celled>
                <Grid.Row columns={2}>
                    <Grid.Column width={4}>
                        <Menu fluid vertical tabular>
                            {routes.map(route => (
                                <Menu.Item
                                    key={route.name}
                                    name={route.name}
                                    active={activeRoute.name === route.name}
                                    onClick={() => setActiveRoute(route)}
                                />
                            ))}
                        </Menu>
                    </Grid.Column>

                    {activeRoute.component?.()}
                </Grid.Row>
            </Grid>
        </Container>
    );
});
