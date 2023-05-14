import { EventAction, EventState, EventActionEnum } from "./types";

const initialState: EventState = {
    events: [],
    guests: [],
}

export const eventReducer = (state = initialState, action: EventAction): EventState => {
    switch (action.type) {
        case EventActionEnum.SET_GUEST:
            return {
                ...state,
                guests: action.payload
            }
        case EventActionEnum.SET_EVENTS:
            return {
                ...state,
                events: action.payload
            }
        default:
            return state
    }
}