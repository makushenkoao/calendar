import React, { Component, FC } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes, RouteNames } from "../routes";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const AppRouter: FC = () => {
    const { isAuth } = useTypedSelector(state => state.authReducer)
    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(({ path, component: Component }) => (
                    <Route
                        path={path}
                        element={<Component />}
                        key={path} />
                ))}
                <Route path="*" element={<Navigate to={RouteNames.EVENT} replace />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(({ path, component: Component }) => (
                    <Route
                        path={path}
                        element={<Component />}
                        key={path} />
                ))}
                <Route path="*" element={<Navigate to={RouteNames.LOGIN} replace />} />
            </Routes>
    );
};
