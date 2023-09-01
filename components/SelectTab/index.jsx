import React, { useState } from "react";
// components
// styles
import styles from "./SelectTab.module.scss";
import TabDetails from "../TabDetails";

export default function SelectTab() {
  const [visibleState, setVisibleState] = useState({
    general: true,
    connectWithParents: false,
    connectWithProviders: false,
  });

  return (
    <>
      <section className={styles.dosing__optionBtns}>
        <div className={styles.select__tab__container}>
          <div className={styles.dosing__btnGrp}>
            <button
              onClick={() =>
                setVisibleState({
                  general: true,
                  connectWithParents: false,
                  connectWithProviders: false,
                })
              }
              className={`
                ${
                  visibleState.general
                    ? styles.dosing__btnActive
                    : `${styles.dosing__btnActive} ${styles.dosing__Inactivebtn}`
                } ${styles.dosing__btn}`}
              type="button"
            >
              GENERAL
              {visibleState.general && <span />}
              <img
                className={styles.expanded__icon}
                alt="expanded-arrow"
                src="/images/yellow-close-arrow.svg"
              />
              <img
                className={styles.closed__icon}
                alt="closed-arrow"
                src="/images/right-arrow.svg"
              />
            </button>
            <TabDetails
              visbleFor="GENERAL"
              currentVisibleState={visibleState}
              tabDetailsFor="MOBILE"
            />

            <button
              onClick={() =>
                setVisibleState({
                  general: false,
                  connectWithParents: true,
                  connectWithProviders: false,
                })
              }
              className={`
                ${
                  visibleState.connectWithParents
                    ? styles.dosing__btnActive
                    : `${styles.dosing__btnActive} ${styles.dosing__Inactivebtn}`
                } ${styles.dosing__btn}`}
              type="button"
            >
              Connect
              {visibleState.connectWithParents && <span />}
              <img
                className={styles.expanded__icon}
                alt="expanded-arrow"
                src="/images/yellow-close-arrow.svg"
              />
              <img
                className={styles.closed__icon}
                alt="closed-arrow"
                src="/images/right-arrow.svg"
              />
            </button>
            <TabDetails
              visbleFor="CONNECTWITHPARENTS"
              currentVisibleState={visibleState}
              tabDetailsFor="MOBILE"
            />
            <button
              onClick={() =>
                setVisibleState({
                  general: false,
                  connectWithParents: false,
                  connectWithProviders: true,
                })
              } // Add this button for AfternoonDose
              className={`
                ${
                  visibleState.connectWithProviders
                    ? styles.dosing__btnActive
                    : `${styles.dosing__btnActive} ${styles.dosing__Inactivebtn}`
                } ${styles.dosing__btn}`}
              type="button"
            >
              Connect
              {visibleState.connectWithProviders && <span />}
              <img
                className={styles.expanded__icon}
                alt="expanded-arrow"
                src="/images/yellow-close-arrow.svg"
              />
              <img
                className={styles.closed__icon}
                alt="closed-arrow"
                src="/images/right-arrow.svg"
              />
            </button>
            <TabDetails
              visbleFor="CONNECTWITHPROVIDERS"
              currentVisibleState={visibleState}
              tabDetailsFor="MOBILE"
            />
          </div>
        </div>
      </section>
      <TabDetails currentVisibleState={visibleState} tabDetailsFor="DESKTOP" />
      
    </>
  );
}
