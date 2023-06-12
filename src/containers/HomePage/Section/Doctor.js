import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import doctorImg from "../../../assets/images/drha.jpg";

class Doctor extends Component {
  render() {
    return (
      <div className="doctor-container section-container ">
        <div className="doctor-content section-content">
          <div>
            <h2>Bác sĩ nổi bật</h2>
            <Slider {...this.props.settings}>
              <div className="doctor-body section-body">
                <div className="section-item">
                  <img src={doctorImg} />
                  <p>Bs.Nguyễn Thị Thu Hà</p>
                  <p>Nội khoa</p>
                </div>
              </div>
              <div className="doctor-body section-body">
                <img src={doctorImg} />
                <p>Bs.Nguyễn Thị Thu Hà</p>
                <p>Nội khoa</p>{" "}
              </div>
              <div className="doctor-body section-body">
                <img src={doctorImg} />
                <p>Bs.Nguyễn Thị Thu Hà</p>
                <p>Nội khoa</p>
              </div>
              <div className="doctor-body section-body">
                <img src={doctorImg} />
                <p>Bs.Nguyễn Thị Thu Hà</p>
                <p>Nội khoa</p>
              </div>
              <div className="doctor-body section-body">
                <img src={doctorImg} />
                <p>Bs.Nguyễn Thị Thu Hà</p>
                <p>Nội khoa</p>
              </div>
              <div className="doctor-body section-body">
                <img src={doctorImg} />
                <p>Bs.Nguyễn Thị Thu Hà</p>
                <p>Nội khoa</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
