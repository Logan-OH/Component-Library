import parse from "html-react-parser";
import { string, node, oneOfType, arrayOf } from "prop-types";
import classnames from "classnames";
// components
import { Heading, Text } from "../UILib";
// styles
import styles from "./Hero.module.scss";

export default function Hero({ h1, text, className, children }) {
  const HERO_CSS = classnames({
    [styles.hero]: "default",
    [className]: className,
  });

  return (
    <section className={HERO_CSS}>
      <div className="container">
        {h1 ? (
          <Heading type="h1" align="center" color="white">
            {parse(h1)}
          </Heading>
        ) : (
          ""
        )}
        {text ? (
          <Text type="p1" align="center" color="white">
            {parse(text)}
          </Text>
        ) : (
          ""
        )}
        {children}
      </div>
    </section>
  );
}

Hero.propTypes = {
  h1: string,
  text: string,
  className: string,
  children: oneOfType([arrayOf(node), node]),
};
