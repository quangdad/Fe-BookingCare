import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
import "./HomeHeader.scss";
import Specialty from "./Section/Specialty";
import Facilitiy from "./Section/Facilitiy";
import Doctor from "./Section/Doctor";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: " rgb(96, 159, 231)" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: " rgb(96, 159, 231)" }}
      onClick={onClick}
    />
  );
}

class HomePage extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div>
        <HomeHeader />
        <Specialty settings={settings} />
        <Facilitiy settings={settings} />
        <Doctor settings={settings} />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
