import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidMount() {
    this.props.loadTopDoctor();
  }
  componentDidUpdate(preProps, preState, snapshot) {
    if (preProps.dataDoctor !== this.props.dataDoctor) {
      this.setState({
        arrDoctors: this.props.dataDoctor,
      });
    }
  }
  handleDoctorDetail = (data) => {
    this.props.history.push(`/detail-doctor/${data.id}`);
  };
  render() {
    let arrDoctors = this.state.arrDoctors.data;
    let { language } = this.props;
    return (
      <div className="doctor-container section-container">
        <div className="doctor-content section-content">
          <div className="doctor-title section-title">
            <h2>
              <FormattedMessage id="homepage.title" />
            </h2>
            <span className="doctor-more section-more">
              <a>
                <FormattedMessage id="homepage.more" />
              </a>
            </span>
          </div>
          <Slider {...this.props.settings}>
            {arrDoctors &&
              arrDoctors.length > 0 &&
              arrDoctors.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                return (
                  <div className="doctor-body section-body" key={index}>
                    <div
                      className="section-item"
                      onClick={() => this.handleDoctorDetail(item)}
                    >
                      <img src={imageBase64} />
                      <h3>{language === LANGUAGES.VI ? nameVi : nameEn}</h3>
                      <h4>Nội khoa</h4>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    dataDoctor: state.admin.dataDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
