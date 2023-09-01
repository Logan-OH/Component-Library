import { ComparisonSlider } from "react-comparison-slider";
import { Text, Heading } from "../UILib";

// styles
import styles from "./Slider.module.scss";

function SliderIcon() {
  return (
    <img
      src="/images/pages/understanding/Slider.svg"
      size={24}
      alt="icon"
      className={styles.sliderIcon}
    />
  );
}

export default function Slider() {
  return (
    <section>
      <ComparisonSlider
        handleBefore={<div className={styles.sliderBar} />}
        /*eslint-disable*/
        handle={() => {
          return <SliderIcon />;
        }}
        /* eslint-enable */

        defaultValue={5}
        itemOne={
          <section className={`${styles.slide} ${styles.slide__yellow}`}>
            <Heading color="white" align="center" className="m-bottom-0">
          
            </Heading>

            <div className={styles.slide__pill}>
              <img
                src="/"
                alt=""
              />

              <img
                src="/images/pages/understanding/GreenArrow.png"
                alt="arrow"
              />

              <div className={styles.pill__sec}>
                <img
                  src="/"
                  alt=""
                />

                <Text
                  align="center"
                  type="p3"
                  className={styles.slider__iconTextOne}
                >
               
                </Text>
              </div>

              <img
                src="/images/pages/understanding/GreenArrow.png"
                alt="arrow"
              />

              <div className={styles.pill__sec}>
                <img
                  src="/"
                  alt=""
                />

                <Text
                  align="center"
                  type="p3"
                  color="red"
                  className="m-bottom-0"
                >
                  
                </Text>
              </div>
            </div>
          </section>
        }
        itemTwo={
          <section className={styles.slide}>
            <Heading color="blue" align="center" className="m-bottom-0">
            
            </Heading>

            <div className={styles.slide__pillTwo}>
              <img
                src="/"
                alt=""
              />

              <img src="/" alt="arrow" />

              <div className={styles.pill__sec}>
                <img
                  src="/"
                  alt=""
                />
                <Text
                  align="center"
                  type="p3"
                  className={`${styles.slider__iconTextTwo} m-bottom-0`}
                >
                  
                </Text>
              </div>

              <img src="/images/pages/understanding/Arrow.png" alt="arrow" />

              <div className={styles.pill__sec}>
                <img
                  src="/"
                  alt=""
                />

                <Text
                  align="center"
                  type="p3"
                  color="red"
                  className="m-bottom-0"
                >
                
                </Text>
              </div>
            </div>
          </section>
        }
        aspectRatio={3 / 1}
      />
    </section>
  );
}
