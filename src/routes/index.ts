import { ComponentType } from "react";
import { Login } from "../pages/Login";
import { Event } from "../pages/Event";

export interface IRoutes {
    path: string;
    component: ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/'
}

export const publicRoutes: IRoutes[] = [
    {path: RouteNames.LOGIN, exact: true, component: Login}
]

export const privateRoutes: IRoutes[] = [
    {path: RouteNames.EVENT, exact: true, component: Event}
]