import React, { FC } from 'react';
import { Layout, Menu, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../routes";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

export const Navbar: FC = () => {
    const navigate = useNavigate()
    const { isAuth, user } = useTypedSelector(state => state.authReducer)
    const { logout } = useActions()
    return (
        <Layout.Header>
            <Row justify={isAuth ? 'space-between' : 'end'}>
                {isAuth
                    ?
                    <>
                        <div style={{color: 'white'}}>{user.username}</div>
                        <Menu theme='dark' mode='horizontal' selectable={false}>
                            <Menu.Item onClick={logout } key={1}>Log out</Menu.Item>
                        </Menu>
                    </>
                    :
                    <Menu theme='dark' mode='horizontal' selectable={false}>
                        <Menu.Item onClick={() => navigate(RouteNames.LOGIN)} key={1}>Log in</Menu.Item>
                    </Menu>

                }
            </Row>
        </Layout.Header>
    );
};
