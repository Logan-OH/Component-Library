/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import Modal from "../Modal";
import styles from "./interstatial.module.scss";

function Interstitial() {
  const [showInterstitial, setShowInterstitial] = useState(false);

  useEffect(() => {
    const interstitialCookie = getCookie("interstitial-cookie");
    if (!interstitialCookie) {
      setShowInterstitial(true);
    }
  }, []);

  return (
    <Modal
      show={showInterstitial}
      handleModelClose={() => {
        setShowInterstitial(false);
      }}
    >
      <>
        <div className={styles.title}>
          hi
        </div>
        <p className={styles.text}>
          
        </p>
        <div className={styles.buttons}>
          <div className={`${styles.buttons} ${styles["button-row"]}`}>
            <a
              id="no"
              href="/"
              target="_blank"
              className={`${styles.button} no`}
              rel="noreferrer"
            >
              No
            </a>
            <a
              id="yes"
              onClick={() => {
                setCookie("interstitial-cookie", true);
                setShowInterstitial(false);
              }}
              href="#"
              className={`${styles.button} yes`}
            >
              Yes
            </a>
          </div>
        </div>
      </>
    </Modal>
  );
}

export default Interstitial;
