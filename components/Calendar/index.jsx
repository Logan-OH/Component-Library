import React from "react";
import CalendarRow from "../CalendarRow";
import { Heading } from "../UILib";
import styles from "./calendar.module.scss";
import calendarDetails from "../../data/calendardetails";

function calendar() {
  return (
    <section id="calendar" className="container section-container">
      <Heading color="grey_dark">EVENTS CALENDAR</Heading>
      <div className={styles.calendar}>
        {calendarDetails.map(
          ({ day, month, date, year, name, location, time, details, id }) => (
            <CalendarRow
              key={id}
              day={day}
              month={month}
              date={date}
              year={year}
              eventName={name}
              location={location}
              time={time}
              details={details}
            />
          )
        )}
      </div>
    </section>
  );
}

export default calendar;
