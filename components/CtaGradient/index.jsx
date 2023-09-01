import { string } from "prop-types";
import parse from "html-react-parser";
// comps
import { Text } from "../UILib";
import LinkButton from "../LinkButton";
// css
import styles from "./CtaGradient.module.scss";

export default function VerticalGradient({ p1, p2, href, btnText, color }) {
  return (
    <section className={styles.vert}>
      {/* span is used for gradient */}
      <span />

      <div className="container">
        <Text
          type="p2"
          color="white"
          align="center"
          className={styles.vert__p2}
        >
          {parse(p2)}
        </Text>

        <Text
          type="p1"
          color="white"
          align="center"
          className={styles.vert__p1}
        >
          {parse(p1)}
        </Text>

        <LinkButton type="btn1" href={href} color={color} text={btnText}>
          {parse(btnText)}
        </LinkButton>
      </div>
    </section>
  );
}

VerticalGradient.propTypes = {
  p1: string,
  p2: string,
  href: string,
  btnText: string,
  color: string,
};
