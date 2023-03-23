import api from "./api";

import {
    GET_ALL_EVENTS_CALENDAR
} from './eventCalendarRoute';

export const getAllCalendarEvents = async() => {
    try {
        const response = await api.get(GET_ALL_EVENTS_CALENDAR)
        return response.data;
    } catch (err) {
        return err;
    }
}