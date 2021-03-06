import React from "react";
import Slider from "react-slick";

import styles from "./styles.scss";
import { ReactComponent as Arrow } from "../../../static/icons/rightArrow.svg";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <Arrow
      className={className}
      style={{ width: "48px", height: "48px", transform: "translate(0, 0)" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <Arrow
      className={className}
      style={{ width: "48px", height: "48px", transform: "rotate(180deg)" }}
      onClick={onClick}
    />
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1356,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const Swiper = ({ children }) => {
  return (
    <Slider {...settings} className={styles}>
      {children}
    </Slider>
  );
};
