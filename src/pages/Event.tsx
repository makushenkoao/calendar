import React, { FC, useEffect, useState } from 'react';
import {Button, Layout, Modal, Row} from "antd";
import { EventCalendar } from "../components/EventCalendar";
import { EventForm } from "../components/EventForm";
import { useActions } from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";

export const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const { fetchGuests, createEvent, fetchEvent } = useActions()
    const { guests, events } = useTypedSelector(state => state.eventReducer)
    const { user } = useTypedSelector(state => state.authReducer)

    useEffect(() => {
        fetchGuests()
        fetchEvent(user.username);
    }, []);

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false)
        createEvent(event)
    }

    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify='center'>
                <Button
                    onClick={() => setModalVisible(true)}
                >Add Event</Button>
            </Row>
            <Modal
                title='Add Event'
                open={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}

            >
                <EventForm
                    guests={guests}
                    submit={addNewEvent}
                />
            </Modal>
        </Layout>
    );
};
