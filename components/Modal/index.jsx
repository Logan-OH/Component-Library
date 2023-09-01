import { string, node, arrayOf, oneOfType } from "prop-types";
// styles
import styles from "./Modal.module.scss";

export default function Modal({ id, children }) {
  return (
    <section id={id} className={`${styles.modalmain} interstitial`}>
      <div className="container">
        <div className={styles.modalmain__wrapper}>
          <div className={styles.modalmain__content}>{children}</div>
        </div>
      </div>
    </section>
  );
}

Modal.propTypes = {
  id: string,
  children: oneOfType([arrayOf(node), node]),
};
