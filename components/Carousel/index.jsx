import { useEffect, useState } from "react";
// components
import LinkButton from "../LinkButton";
import { Heading, Text } from "../UILib";
// helpers
import { handleArrowClick, handleBtnClick } from "./animations";

export const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(parseInt(1));
  const [waiting, setWaiting] = useState(false); // waiting for the next rotation to tigger on delay

  useEffect(() => {
    // Auto rotate the slides with a delay.
    if (waiting) {
      // if the carousel is already
      // rotating do nothing
      return;
    } else {
      setWaiting(true);
      setTimeout(() => {
        handleArrowClick("next", activeSlide, setActiveSlide);
        setWaiting(false);
      }, 7000);
    }
  }, [waiting]);

  return (
    <section className="carousel">
      <section className="slides">
        {/* slide one */}
        <div
          id="slide1"
          className="slide animate__animated"
          data-slidenumber="1"
        >
          <div className="slide-content">
            <Heading
              type="h2"
              align="center"
              className="slide2-h2"
              color="purple"
            >
              Journey to Recovery
            </Heading>
            <hr className="discover__hr-right" />
          </div>
        </div>

        {/* slide two */}
        <div
          id="slide2"
          className="slide animate__animated animate__fadeOut"
          data-slidenumber="2"
        >
          <div className="discover">
            <hr className="discover__hr-left" />
            <div className="discover__section">
              <p className="discover__cta">
                
              </p>
              <LinkButton href="/" color="purple">
               
              </LinkButton>
            </div>
            <div className="discover__section">
              <p className="discover__cta">
                
              </p>
              <LinkButton href="/" color="purple">
             
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section className="carousel__arrows">
        <button
          type="button"
          className="carousel__arrow-left"
          aria-label="rotate carousel left"
          onClick={() => handleArrowClick("next", activeSlide, setActiveSlide)}
        ></button>
        <button
          type="button"
          aria-label="rotate carousel right"
          className="carousel__arrow-right"
          onClick={() => handleArrowClick("next", activeSlide, setActiveSlide)}
        ></button>
      </section>

      <section className="indicators">
        <div className="indicator-wrapper">
          <button
            type="button"
            className="indicator indicator--active"
            aria-label="Select carousel slide"
            data-target="#slide1"
            data-activeslide="1"
            onClick={(event) => handleBtnClick(event, setActiveSlide)}
          ></button>
          <button
            type="button"
            className="indicator"
            aria-label="Select carousel slide"
            data-target="#slide2"
            data-activeslide="2"
            onClick={(event) => handleBtnClick(event, setActiveSlide)}
          ></button>
        </div>
      </section>
    </section>
  );
};

export const HcpCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [waiting, setWaiting] = useState(false); // waiting for the next rotation to tigger on delay

  useEffect(() => {
    // Auto rotate the slides with a delay.
    if (waiting) {
      // if the carousel is already
      // rotating do nothing
      return;
    } else {
      setWaiting(true);
      setTimeout(() => {
        handleArrowClick("next", activeSlide, setActiveSlide);
        setWaiting(false);
      }, 7000);
    }
  }, [waiting]);

  return (
    <section className="carousel">
      <section className="slides">
        {/* slide one */}
        <div
          id="slide1"
          className="slide animate__animated"
          data-slidenumber="1"
        >
          <div className="slide-content">
            <Heading
              type="h2"
              align="center"
              className="slide2-h2"
              color="purple"
            >
              
            </Heading>
            <hr className="discover__hr-right" />
            <Text
              color="purple"
              align="center"
              className="slide2-text slide2-text__hcp"
            >
        
           
            </Text>
          </div>
        </div>

        {/* slide two */}
        <div
          id="slide2"
          className="slide animate__animated"
          data-slidenumber="2"
        >
          <div className="discover">
            <hr className="discover__hr-left" />
            <div className="discover__section">
              <p className="discover__cta">
               
              </p>
              <LinkButton
                href="/"
                color="purple"
              >
             
              </LinkButton>
            </div>
            <div className="discover__section">
              <p className="discover__cta">
              
              </p>
              <LinkButton
                href="/"
                color="purple"
              >
                
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section className="carousel__arrows">
        <button
          type="button"
          className="carousel__arrow-left"
          aria-label="rotate carousel left"
          onClick={() => handleArrowClick("next", activeSlide, setActiveSlide)}
        ></button>
        <button
          type="button"
          aria-label="rotate carousel right"
          className="carousel__arrow-right"
          onClick={() => handleArrowClick("next", activeSlide, setActiveSlide)}
        ></button>
      </section>

      <section className="indicators">
        <div className="indicator-wrapper">
          <button
            type="button"
            className="indicator indicator--active"
            aria-label="Select carousel slide"
            data-target="#slide1"
            data-activeslide="1"
            onClick={(event) => handleBtnClick(event, setActiveSlide)}
          ></button>
          <button
            type="button"
            className="indicator"
            aria-label="Select carousel slide"
            data-target="#slide2"
            data-activeslide="2"
            onClick={(event) =>
              handleBtnClick(event, setActiveSlide, moving, setMoving)
            }
          ></button>
        </div>
      </section>
    </section>
  );
};
