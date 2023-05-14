import React, { FC } from 'react';
import { Calendar } from "antd";
import { IEvent } from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[]
}

export const EventCalendar: FC<EventCalendarProps> = ( {events} ) => {

    const dateCellRender = (value: Moment) => {
        const date = formatDate(value.toDate());
        const currentDayEvent = events.filter(_ => _.date === date)
        return (
            <div>
                {currentDayEvent.map((ev, index) =>
                    <div key={index}>{ev.description}</div>
                )}
            </div>
        );
    };

    return (
        <Calendar
            // @ts-ignore
            dateCellRender={dateCellRender}
        />
     );
};
