import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Menu } from "semantic-ui-react";

enum menuItems {
    home = "Home",
    cats = "Cats",
    dogs = "Dogs",
    volunteers = "Volunteers",
}

export const Navigation = () => {
    const [activeItem, setActiveItem] = useState(menuItems.home);
    const history = useHistory();
    useEffect(() => history.push(`/${activeItem}`), [activeItem]);

    return (
        <Menu>
            <Menu.Item header>Pet Rescue By Judy</Menu.Item>
            {Object.values(menuItems).map(item => (
                <Menu.Item key={item} name={item} active={activeItem === item} onClick={() => setActiveItem(item)} />
            ))}
        </Menu>
    );
};
