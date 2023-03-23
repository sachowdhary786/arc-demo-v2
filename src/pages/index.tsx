import { Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { CalendarScheduler } from "../components/calendarScheduler";
// import { mapArrayEventCalendar } from "../domain/EventCalendar";
import { getAllCalendarEvents } from "../services/eventCalendarApi";
import { ContainerMain } from "../styles/Home";

interface IHomeProps {
  listAllEventsCalendar: any;
}

const Home = ({ listAllEventsCalendar }: IHomeProps) => {
  const [listEventsCalendar, setListEventsCalendar] = useState<any[]>(listAllEventsCalendar);
  
  return (
    <>
      <Head>
        <title>ARC Calendar Demo</title>
        <meta name="description" content="ARC Calendar Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ContainerMain>
        <Typography variant="h2"> ARC Calendar Demo </Typography>
        <CalendarScheduler eventsCalendar={listEventsCalendar} />
      </ContainerMain>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const eventsCalendar = await getAllCalendarEvents();
  // const listAllEventsCalendar = mapArrayEventCalendar(eventsCalendar)

  return {
    props: {
      // listAllEventsCalendar: listAllEventsCalendar ?? [],
    },
  };
};

export default Home;