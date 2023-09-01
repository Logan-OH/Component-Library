import { useState } from "react";
import { string, arrayOf, oneOfType, node } from "prop-types";
import classnames from "classnames";
import parse from "html-react-parser";
// components
import { Heading } from "../UILib";
// styles
import styles from "./Accordion.module.scss";

export default function Accordion({ h2, className, children }) {
  // State to show/hide accordion
  const [show, setShow] = useState(false);

  const ACCORDION_CSS = classnames({
    [styles.accordion]: "default",
    [className]: className,
  });

  const handleClick = (event) => {
    setShow(!show);

    event.target.classList.toggle(styles["accordion--open"]);

    // select the event.target's child <i> and toggle d-none
    const icons = event.target.querySelectorAll("i");
    icons.forEach((icon) => {
      icon.classList.toggle("d-none");
    });
  };

  return (
    <>
      {/* eslint-disable-next-line */}
      <section
        className={ACCORDION_CSS}
        onClick={(event) => handleClick(event)}
      >
        <Heading type="h2" alight="left" className={styles.accordion__h2}>
          {parse(h2)}
          <span className={styles.acc__icons}>
            <i className=" fa fa-plus" />
            <i className="d-none fa fa-minus" />
          </span>
        </Heading>
      </section>

      {/* toggle display of content */}
      {show && <div className={styles.accordion__itemBody}>{children}</div>}
    </>
  );
}

Accordion.defaultProps = {
  h2: "change me",
};

Accordion.propTypes = {
  h2: string,
  className: string,
  children: oneOfType([arrayOf(node), node]),
};
