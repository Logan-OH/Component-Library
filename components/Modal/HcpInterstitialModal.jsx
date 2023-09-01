// components
import Modal from "./index";
import Button from "../Button";
import LinkButton from "../LinkButton";
import { Text } from "../UILib";
// styles
import styles from "./Modal.module.scss";

export default function HcpInterstitialModal() {
  const handleCloseClick = () => {
    document.querySelector("#goto-hcp").classList.add("d-none");
  };

  return (
    <Modal id="goto-hcp">
      <Text type="p5" color="white" align="center">
       
      </Text>

      <Text color="white" align="center">
        hi
      </Text>

      <div className={styles.modal__btnGrp}>
        <Button color="yellow" onClick={() => handleCloseClick()}>
          Yes
        </Button>

        <LinkButton
          href="/"
          color="yellow"
          type="btn1"
          text="No"
        />
      </div>
    </Modal>
  );
}
