import React from "react";
import "./style.css";
import TodayBible from "views/TodayBible";
import BannerSlider from "layouts/BannerSlider";

export default function Main() {
  return (
    <div className="main-wrapper">
      {/* <TodayBible /> */}
      <div className="top-container">
        <div className="top-image"></div>
        <div className="top-box">
          <div className="top-title">대학4부</div>
          <div className="top-sub-title">dreamee</div>
          <div className="top-sns-button">
            <button>유튜브</button>
            <button>인스타그램</button>
          </div>
        </div>
      </div>
      <div className="middle-container">
        <BannerSlider />
      </div>
    </div>
  );
}
