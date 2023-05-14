import React, {FC, useState} from 'react';
import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { rules } from "../utils/rules";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { Moment }  from "moment";
import {formatDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void;
}

export const EventForm: FC<EventFormProps> = ({ guests, submit}) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        guest: '',
        description: '',
    } as IEvent)

    const { user } = useTypedSelector(state => state.authReducer)

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const submitForm = () => {
        submit({...event, author: user.username})
        console.log(event)
    }

    return (
        <Form
            name="basic"
            onFinish={submitForm}
        >
            <Form.Item
                label="Event title"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    value={event.description}
                onChange={({target : { value }}) => setEvent({...event, description: value})}
                />
            </Form.Item>
            <Form.Item
                label="Event date"
                name="date"
                // rules={[rules.required(), rules.isDateAfter('This date has passed')]}
            >
                <DatePicker
                    // @ts-ignore
                    onChange={date => selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                label="Choose guest"
                name="guest"
                rules={[rules.required()]}
            >
                <Select
                    onChange={(guest: string) => setEvent({...event, guest})}
                >
                    {guests.map(guest =>
                        <Select.Option
                            key={guest.username}
                            value={guest.username}
                        >
                            {guest.username}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Row justify='end'>
                <Form.Item >
                    <Button type="primary" htmlType="submit" >
                        Create
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};
