import Link from "next/link";
// components
import { Text, LinkCustom } from "../UILib";
// styles
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <section className="container">
        <div className={styles.footer__content}>
          <nav className={styles.footer__nav}>
            <section className={styles.footer__navSec}>
              <LinkCustom color="blue" href="/"></LinkCustom>

              <LinkCustom color="blue" href="/"></LinkCustom>

              <LinkCustom color="blue" href="/"></LinkCustom>

              <LinkCustom color="blue" href="/"></LinkCustom>
            </section>

            <section className={styles.footer__navSec}>
              <LinkCustom color="blue" href="/"></LinkCustom>

              <LinkCustom color="blue" href="/" target="_blank"></LinkCustom>

              <LinkCustom color="blue" href="/" target="_blank"></LinkCustom>

              <Link href="/" rel="nofollow" target="_blank">
                <img
                  className={styles.footer__social}
                  src="/"
                  alt="LinkedIn Logo"
                />
              </Link>
            </section>
          </nav>

          <section className={styles.footer__sec}>
            <Link href="/" rel="noreferrer" target="_blank">
              <img className={styles.footer__logo} src="/" alt="ALK Logo" />
            </Link>

            <nav className={styles.footer__alkLinks}>
              <LinkCustom
                color="grey"
                href="/"
                rel="noreferrer"
                target="_blank"
              ></LinkCustom>

              <LinkCustom
                color="grey"
                href="/"
                rel="noreferrer"
                target="_blank"
              ></LinkCustom>

              <LinkCustom
                color="grey"
                href="/"
                rel="noreferrer"
                target="_blank"
              ></LinkCustom>
            </nav>

            <Text type="p1" className={styles.footer__trademark}>
              <br />

              <br />
            </Text>
          </section>
        </div>
      </section>
    </footer>
  );
}


