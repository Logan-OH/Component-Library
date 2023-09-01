import { bool, func } from "prop-types";
import Link from "next/link";
import { MdClear } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
// components
import LanguageSelect from "../LanguageSelect";
// js
import mobileNavToggle from "../../util/nav";
// data
import { nav} from "../../data/navmap";
// styles
import styles from "./NavMobile.module.scss";

export default function NavMobile({ navbarOpen, setNavbarOpen }) {
  return (
    <>
      <section className={styles.navm}>
        <div className={styles.navm__wrapper}>
          <div className={styles.navm__content}>
            <div>
              <Link href="/">
                <img
                  src="/"
                  alt="Logo"
                />
              </Link>
            </div>

            <div>
              <LanguageSelect />
            </div>

            <div>
              {/* eslint-disable-next-line */}
              <div onClick={() => mobileNavToggle(setNavbarOpen)}>
                {navbarOpen ? (
                  <MdClear
                    style={{ color: "#193B69", width: "40px", height: "40px" }}
                  />
                ) : (
                  <FiMenu
                    style={{ color: "#193B69", width: "40px", height: "40px" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="mobileNavCont" className={styles.navm__links}>
        <div className={styles.navm__linkwrapper}>
          {/* Loop over the list of nav links and add them to the dom */}
          {nav.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={styles.navm__a}
              onClick={() => mobileNavToggle(setNavbarOpen)}
            >
              {link.text}
            </Link>
          ))}
        </div>

        <div className={styles.navm__social}>
          <Link
            href="/"
            onClick={() => mobileNavToggle(setNavbarOpen)}
            target="_blank"
          >
            <img
              src="/"
              alt="Linked In Logo"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

NavMobile.propTypes = {
  navbarOpen: bool,
  setNavbarOpen: func,
};

