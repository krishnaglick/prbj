import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { Button, Container, Form } from "semantic-ui-react";
import { login } from "../stores/user";
import { routes } from "../Routes";

export const Login = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [loginForm, updateLoginForm] = useState({ username: "", password: "" });

    const doLogin = useCallback(async () => {
        setLoading(true);
        await login(loginForm.username, loginForm.password);
        setLoading(false);
        history.push(routes.manage.route);
    }, [loginForm.username, loginForm.password, history]);
    return (
        <Container text>
            <h1>Login</h1>
            <Form loading={loading}>
                <Form.Input
                    required
                    id="form-input-control-username"
                    label="Username"
                    placeholder="Username"
                    onChange={v => updateLoginForm({ ...loginForm, username: v.target.value })}
                />
                <Form.Input
                    required
                    id="form-input-control-password"
                    onChange={v => updateLoginForm({ ...loginForm, password: v.target.value })}
                    type="password"
                    label="Password"
                    placeholder="Password"
                />
                <Button primary id="form-button-login" onClick={doLogin} content="Login" />
            </Form>
        </Container>
    );
};
