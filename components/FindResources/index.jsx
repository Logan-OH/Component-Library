import React from "react";
import styles from "./find_resources.module.scss";
import { Heading } from "../UILib";

import TextDetails from "../TextDetails";

//

function FindResources() {
  return (
    <section id="resources" className="container section-container">
      <Heading className={styles.secondaryTitle} color="grey_dark">
       
      </Heading>
      <TextDetails>
       
      </TextDetails>
      <div className={styles.findResourcesFlex__cont}>
        <div className={styles.icon__box}>
          <img src="/images/understand-icon.svg" alt="Rash icon" />
          <ul>
            <li></li>
          </ul>
        </div>
        <div className={styles.icon__box}>
          <img src="/images/recognize-icon.svg" alt="Liver Icon" />
          <ul>
            <li></li>
          </ul>
        </div>
        <div className={styles.icon__box}>
          <img src="/images/optimize-icon.svg" alt="Nausea Icon" />
          <ul className="ul__desk_adj">
            <li></li>
          </ul>
        </div>
      </div>

      <Heading className={styles.secondaryTitle} color="grey_dark">
       
      </Heading>
      <TextDetails>
       
      </TextDetails>
    </section>
  );
}

export default FindResources;
