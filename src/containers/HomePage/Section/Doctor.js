import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import doctorImg from "../../../assets/images/drha.jpg";

class Doctor extends Component {
  render() {
    return (
      <div className="doctor-container section-container ">
        <div className="doctor-content section-content">
          <div className="doctor-title section-title">
            <h2>Bác sĩ nổi bật</h2>
            <span className="doctor-more section-more">
              <a>Xem thêm</a>
            </span>
          </div>
          <Slider {...this.props.settings}>
            <div className="doctor-body section-body">
              <div className="section-item">
                <img src={doctorImg} />
                <h3>Bs.Nguyễn Thị Thu Hà</h3>
                <h4>Nội khoa</h4>
              </div>
            </div>
            <div className="doctor-body section-body">
              <img src={doctorImg} />
              <h3>Bs.Nguyễn Thị Thu Hà</h3>
              <h4>Nội khoa</h4>
            </div>
            <div className="doctor-body section-body">
              <img src={doctorImg} />
              <h3>Bs.Nguyễn Thị Thu Hà</h3>
              <h4>Nội khoa</h4>
            </div>
            <div className="doctor-body section-body">
              <img src={doctorImg} />
              <h3>Bs.Nguyễn Thị Thu Hà</h3>
              <h4>Nội khoa</h4>
            </div>
            <div className="doctor-body section-body">
              <img src={doctorImg} />
              <h3>Bs.Nguyễn Thị Thu Hà</h3>
              <h4>Nội khoa</h4>
            </div>
            <div className="doctor-body section-body">
              <img src={doctorImg} />
              <h3>Bs.Nguyễn Thị Thu Hà</h3>
              <h4>Nội khoa</h4>
            </div>
          </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
