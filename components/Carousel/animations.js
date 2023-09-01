export const handleArrowClick = (direction, activeSlide, setActiveSlide) => {
  // rotate slides when an arrow is clicked
  // args:
  //      - direction (str): the direction we're rotating
  //      - activeSlide (int): the nubmer of the current activeSlide
  //      - setActiveSlide (method): used to set the current active slide

  const slides = document.querySelectorAll(".slide");
  const numSlides = slides.length;

  if (direction === "next") {
    let nextSlide = activeSlide + 1;

    // If outside the range go back to beginning
    if (nextSlide > numSlides) {
      nextSlide = 1;
    }

    // Reset animations
    document
      .querySelector(`[data-slidenumber="${activeSlide}"]`)
      .classList.remove(
        "animate__fadeIn",
        "animate__fadeOut",
        "animate__slideInRight",
        "animate__slideOutLeft",
        "d-none"
      );
    document
      .querySelector(`[data-slidenumber="${nextSlide}"]`)
      .classList.remove(
        "animate__fadeIn",
        "animate__fadeOut",
        "animate__slideInRight",
        "animate__slideOutLeft",
        "d-none"
      );

    // hide old active slide
    document
      .querySelector(`[data-slidenumber="${activeSlide}"]`)
      .classList.add("animate__slideOutLeft", "animate__fadeOut");

    // show new active slide
    document
      .querySelector(`[data-slidenumber="${nextSlide}"]`)
      .classList.add("animate__slideInRight");

    // remove active state from all buttons
    const buttons = document.querySelectorAll(".indicator");
    buttons.forEach((btn) => {
      btn.classList.remove("indicator--active");
    });

    // add active state to correct indicator
    document
      .querySelector(`[data-activeslide="${nextSlide}"]`)
      .classList.add("indicator--active");

    // update the active slide
    setActiveSlide(nextSlide);
  }
};

export const handleBtnClick = (event, setActiveSlide) => {
  // activate the slide that corresponds with the button clicked
  // args:
  //    - event (str): event object that triggered the function
  //    - setActiveSlide (method): used to set the current active slide

  // disable all slides
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => {
    slide.classList.add("d-none");
    slide.classList.remove(
      "animate__fadeIn",
      "animate__fadeOut",
      "animate__slideInRight",
      "animate__slideOutLeft"
    );
  });

  // remove active state from all buttons
  const buttons = document.querySelectorAll(".indicator");
  buttons.forEach((btn) => {
    btn.classList.remove("indicator--active");
  });

  // activate the button for the active slide
  event.target.classList.add("indicator--active");

  // display the slide
  const activeSlide = document.querySelector(event.target.dataset.target);
  activeSlide.classList.remove("d-none");
  activeSlide.classList.add("animate__fadeIn");

  // set the active slide
  // we need to do this for the arrows to work
  const newActive = parseInt(event.target.dataset.activeslide);
  setActiveSlide(newActive);
};
