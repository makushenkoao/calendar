import React, { FC, useState } from 'react';
import { Button, Form, Input } from "antd";
import { rules } from "../utils/rules";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const  LoginForm: FC = () => {
    const { error, isLoading } = useTypedSelector(state => state.authReducer);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useActions()

    const submit = () => {
        login(username, password)
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={submit}
            disabled={isLoading}
        >
            {error && <div style={{color: 'red', textAlign: 'center'}}>{error}</div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Please input your username!')]}
            >
                <Input
                    value={username}
                    onChange={({target : { value }}) => setUsername(value)}
                />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please input your password!')]}
            >
                <Input.Password
                    value={password}
                    onChange={({target : { value }}) => setPassword(value)}
                />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
