import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import { ContainerCalendar } from "./style";
import { IEventCalendar } from "../domain/EventCalendar";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

type CalendarSchedulerProps = {
  eventsCalendar: IEventCalendar[];
}
const secret = process.env.NEXT_PUBLIC_SECRET!
const auth = process.env.NEXT_PUBLIC_AUTH!;
const dataUrl = process.env.NEXT_PUBLIC_DATAURL!;

const headerConfig = {
  'Content-Type': 'text/html; charset=UTF-8',
  'Authorization': secret
}


export const CalendarScheduler = ({ eventsCalendar }: CalendarSchedulerProps) => {

  function payload(month: string) {
    // var [events, setEvents] = useState<AxiosResponse | null | void>(null);
    axios.post(auth, '', { headers: headerConfig }).then(async res => {
      await axios
        .get(dataUrl + month, { headers: { 'Authorization': `Bearer ${res.data}` } }).then(eventData => {

        })
    }).catch(error => {
      console.log(error);
    })
  }
  payload('3')

  return (
    <ContainerCalendar>
      <FullCalendar
        eventContent={payload}
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale="en-gb"
        weekends={true}
        initialEvents={eventsCalendar}
        longPressDelay={1000}
        eventLongPressDelay={1000}
        selectLongPressDelay={1000}
        selectable={true}
        dayMaxEvents={true}
        allDaySlot={false}
        editable={false}
        height="700px"
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
          list: "List",
        }}
      />
    </ContainerCalendar>
  );
};