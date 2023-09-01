import { string } from "prop-types";
import parse from "html-react-parser";
// comps
import LinkButton from "../LinkButton";
import { Text } from "../UILib";
// css
import styles from "./CtaNextPage.module.scss";

export default function CtaNextPage({ text, href, btnText, target }) {
  return (
    <section className={styles.next}>
      <div className="container">
        <Text type="p1" color="white" align="center">
          {parse(text)}
        </Text>

        <LinkButton
          type="btn2"
          href={href}
          text={btnText}
          color="blue"
          target={target}
          isNextPage={true} // eslint-disable-line
        />
      </div>
    </section>
  );
}

CtaNextPage.propTypes = {
  text: string,
  href: string,
  btnText: string,
  target: string,
};
