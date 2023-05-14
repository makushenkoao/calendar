import { IUser } from "../../../models/IUser";
import { EventActionEnum, SetEventsAction, SetGuestAction } from "./types";
import { IEvent } from "../../../models/IEvent";
import { AppDispatch } from "../../index";
import { UserService } from "../../../api/UserService";

export const EventActionCreators = {
    setGuests: (payload: IUser[]): SetGuestAction => ({
        type: EventActionEnum.SET_GUEST,
        payload
    }),

    setEvents: (payload: IEvent[]): SetEventsAction => ({
        type: EventActionEnum.SET_EVENTS,
        payload
    }),

    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const guests = await UserService.getUsers();
            dispatch(EventActionCreators.setGuests(guests.data))
        } catch (e) {
            console.log(e)
        }
    },

    createEvent: (event: IEvent) =>  async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events") || '[]'
            const json = JSON.parse(events) as IEvent[];
            json.push(event);
            dispatch(EventActionCreators.setEvents(json));
            localStorage.setItem('events', JSON.stringify(json));
        } catch (e) {
            console.log(e)
        }
    },

    fetchEvent: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events") || '[]'
            const json = JSON.parse(events) as IEvent[];
            const currentUserEvents = json.filter(_ => _.author === username || _.guest === username);
            dispatch(EventActionCreators.setEvents(currentUserEvents));
        } catch (e) {

        }
    }
}