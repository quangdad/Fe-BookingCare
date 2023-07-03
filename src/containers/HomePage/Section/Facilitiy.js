import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import facilityImg from "../../../assets/images/bvtylongbien.jpg";

class Facilitiy extends Component {
  render() {
    return (
      <div className="facility-container section-container ">
        <div className="facility-content section-content">
          <div className="doctor-title section-title">
            <h2>Cơ sở thú y phổ biến</h2>
            <span className="doctor-more section-more">
              <a>Xem thêm</a>
            </span>
            <Slider {...this.props.settings}>
              <div className="facility-body section-body">
                <img src={facilityImg} />
                <p>Bệnh viện thú cảnh Long Biên</p>
              </div>
              <div className="facility-body section-body">
                <img src={facilityImg} />
                <p>Bệnh viện thú cảnh Long Biên</p>
              </div>
              <div className="facility-body section-body">
                <img src={facilityImg} />
                <p>Bệnh viện thú cảnh Long Biên</p>
              </div>
              <div className="facility-body section-body">
                <img src={facilityImg} />
                <p>Bệnh viện thú cảnh Long Biên</p>
              </div>
              <div className="facility-body section-body">
                <img src={facilityImg} />
                <p>Bệnh viện thú cảnh Long Biên</p>
              </div>
              <div className="facility-body section-body">
                <img src={facilityImg} />
                <p>Bệnh viện thú cảnh Long Biên</p>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Facilitiy);
