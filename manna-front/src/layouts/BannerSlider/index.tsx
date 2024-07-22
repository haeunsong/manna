// BannerSlider.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const images = [
    require("../../assets/ad/ad1.jpeg"),
    require("../../assets/ad/ad2.jpeg"),
    require("../../assets/ad/ad3.jpeg"),
    require("../../assets/ad/ad4.jpeg"),
    require("../../assets/ad/ad5.jpeg"),
  ];

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Banner ${index + 1}`}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      ))}
    </Slider>
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
};

export default BannerSlider;
