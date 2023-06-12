import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import specialtImg from "../../../assets/images/cat-tia.jpg";

class Specialty extends Component {
  render() {
    return (
      <div className="section-container ">
        <div className="specialty-content section-content">
          <div>
            <h2>Chuyên khoa phổ biến</h2>
            <Slider {...this.props.settings}>
              <div className="specialty-body section-body">
                <img src={specialtImg} />
                <p>Tỉa lông thú cưng</p>
              </div>
              <div className="specialty-body section-body">
                <img src={specialtImg} />
                <p>Tỉa lông thú cưng</p>
              </div>
              <div className="specialty-body section-body">
                <img src={specialtImg} />
                <p>Tỉa lông thú cưng</p>
              </div>
              <div className="specialty-body section-body">
                <img src={specialtImg} />
                <p>Tỉa lông thú cưng</p>
              </div>
              <div className="specialty-body section-body">
                <img src={specialtImg} />
                <p>Tỉa lông thú cưng</p>
              </div>
              <div className="specialty-body section-body">
                <img src={specialtImg} />
                <p>Tỉa lông thú cưng</p>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
