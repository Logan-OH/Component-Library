import { string } from "prop-types";
// components
import ButtonLink from "../ButtonLink";
// styles
import styles from "./Card.module.scss";

export default function Card({ href, text, target, backgroundImageSrc }) {
  return (
    <section className={styles.card}>
      <div
        style={{
          backgroundImage: `url(${backgroundImageSrc})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <ButtonLink
          href={href}
          target={target}
          text={text}
          className={styles.card__btn}
        />
      </div>
    </section>
  );
}

Card.propTypes = {
  href: string,
  text: string,
  target: string,
  backgroundImageSrc: string,
};
