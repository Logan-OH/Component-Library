import { useState } from "react";
import Link from "next/link";
// components
import NavMobile from "../NavMobile";
// data
import { nav, navFrench } from "../../data/navmap";
// js
import mobileNavToggle from "../../util/nav";
// styles
import styles from "./Nav.module.scss";
import LanguageSelect from "../LanguageSelect";

export default function Nav() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav>
      <NavMobile navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />

      <section className={styles.nav__container}>
        <div className={styles.nav__wrapper}>
          <div className={styles.nav__content}>
            <div>
              <Link href="/">
                <img src="/" alt="Logo" />
              </Link>
            </div>

            <div className={styles.nav__links}>
              {/* Loop over the list of nav links and add them to the dom */}

              {/* eslint-disable-next-line */}
              {nav.map((link) => {
                if (link.showDesktop) {
                  return (
                    <Link
                      key={link.key}
                      href={link.href}
                      className={styles.nav__a}
                      onClick={() => mobileNavToggle(setNavbarOpen)}
                    >
                      {link.text}
                    </Link>
                  );
                }
              })}
            </div>

            <div className={styles.nav__language}>
              <div>
                <LanguageSelect />
              </div>
              <div>
                <Link
                  href="/"
                  onClick={() => mobileNavToggle(setNavbarOpen)}
                  target="_blank"
                >
                  <img
                    src="/"
                    alt="Logo"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </nav>
  );
}

