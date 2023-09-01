// how this works:
// When you want to use a tooltip, wrap the term in the <Term> component.
// The <Term> component has a required prop `termId` which will get the
// term from the dictionary and dynamilcally populate it.
// Ex: <Term termId="term1">Some Deffinition</Term>

import { useState, useEffect } from "react";
import { string, arrayOf, oneOfType, node, func, bool } from "prop-types";
import parse from "html-react-parser";
// comps
import { Heading, Text } from "../UILib";
// data
import { tooltips } from "../../data/tooltips";
// css
import styles from "./Tooltip.module.scss";

export default function Term({ children, termId, containsImage }) {
  // Wrap a string or element in this component in order to display a tooltip
  // props:
  //  - children (node): The text or element for which we want to dipslay the tooltip
  //  - termId (str): The ID of the term we're going to display
  //  - containsImage (bool): Flag indicating we're wrapping an image and not a string

  const [showTip, setShowTip] = useState(false);

  const handlePointerEnter = () => {
    // Do nothing on mobile
    if (window.innerWidth <= 992) {
      return;
    }
    setShowTip(true);
  };

  const handlePointerLeave = () => {
    // Do nothing on mobile
    if (window.innerWidth <= 992) {
      return;
    }
    setShowTip(false);
  };

  useEffect(() => {
    if (showTip) {
      document.querySelector("body").classList.add("no-scroll");
      return;
    }
    document.querySelector("body").classList.remove("no-scroll");
  }, [showTip]);

  return (
    <div
      className={containsImage ? styles.term__img : styles.term}
      onClick={() => setShowTip(!showTip)}
      onPointerEnter={() => handlePointerEnter()}
      onPointerLeave={() => handlePointerLeave()}
    >
      {children}

      <Tip showTip={showTip} setShowTip={setShowTip} termId={termId} />
    </div>
  );
}

Term.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  termId: string.isRequired,
  containsImage: bool,
};

export function Tip({ showTip, setShowTip, termId }) {
  // Creates the tooltip definition
  // props:
  //  - termId (str): The ID of the term we're going to display
  //  - showTip (bool): Whether or not we're displaying the tip
  //  - setShowTip(func): Setter method for toggling display

  // get the term from the dictionary
  const term = tooltips[termId];
  // unpack the term
  const { h3, p1 } = term;

  return (
    <div className={showTip ? styles.tt : `${styles.tt} d-none`}>
      <div
        className={styles.tt__container}
        onPointerLeave={() => setShowTip(false)}
      >
        <div className={styles.tt__content}>
          <button
            className={styles.tt__btnClose}
            type="button"
            onPointerDown={() => setShowTip(false)}
          >
            <img src="/images/icons/close-x-blue.svg" alt="close" />
          </button>

          <div>
            <Heading type="h3" className={styles.tt__h3}>
              {h3}
            </Heading>
          </div>

          <Text type="p1" className={`${styles.tt__p1} m-bottom-0`}>
            {parse(p1)}
          </Text>
        </div>
      </div>
    </div>
  );
}

Tip.propTypes = {
  termId: string.isRequired,
  showTip: bool.isRequired,
  setShowTip: func.isRequired,
};
