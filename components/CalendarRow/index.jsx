import React, { useState } from "react";
import parse from "html-react-parser";
import { string } from "prop-types";
import styles from "./calendarrow.module.scss";
import { Heading } from "../UILib";
import TextDetails from "../TextDetails";

export default function CalendarRow({
  day,
  month,
  date,
  year,
  eventName,
  location,
  time,
  details,
  key,
}) {
  const [active, setActive] = useState(false);
  return (
    <div
      key={key}
      className={`${styles.calendar__row} ${active ? styles.active : ""}`}
    >
      <div className={styles.calendar__info}>
        <div className={styles.date__container}>
          <Heading className={styles.date__month} color="grey" type="h6">
            {month}
          </Heading>
          <div className={styles.separator} />
          <Heading className={styles.date__day} color="grey" type="h6">
            {date}
          </Heading>
        </div>
        <div className={styles.text__container}>
          <div className={styles.event__details}>
            <Heading className={styles.event__name} color="grey" type="h4">
              {eventName}
            </Heading>
            <Heading className={styles.date__text} color="grey" type="h6">
              {day}, {month} {date}, {year}
            </Heading>
            <div className={styles.event__location}>
              <Heading className={styles.location} color="grey" type="h6">
                {location}
              </Heading>
              <Heading color="grey" type="h6">
                {time}
              </Heading>
            </div>
          </div>
          <div className={styles.leran__more__container}>
            <div className={styles.learn__more}>
              <button
                onClick={() => {
                  setActive(!active);
                }}
                type="button"
              >
                <span>learn more</span>
                <img alt="expand" src="/images/expand-button.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.calendar__details}>
        <hr className={styles.details__separator} />
        <TextDetails>{parse(details)}</TextDetails>
      </div>
    </div>
  );
}

CalendarRow.propTypes = {
  day: string,
  month: string,
  date: string,
  year: string,
  eventName: string,
  location: string,
  time: string,
  details: string,
  key: string,
};
