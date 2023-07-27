import React, { Component } from "react";
import { connect } from "react-redux";
import HomeFooter from "../../HomePage/HomeFooter";
import HomeHeader from "../../HomePage/HomeHeader";
import { Fragment } from "react";
import "./DetailDoctor.scss";
import { getDetailDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }
  async componentDidMount() {
    let res = await getDetailDoctor(this.props.match.params.id);
    if (res.data.err == 0) {
      this.setState({
        detailDoctor: res.data.data,
      });
    }
  }
  render() {
    let { detailDoctor } = this.state;
    let language = this.props.language;
    let nameVi = "";
    let nameEn = "";
    let content = "";
    let description = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.fisrtName}`;
    }
    if (detailDoctor && detailDoctor.Editor) {
      content = `${detailDoctor.Editor.contentMarkdown}`;
      description = `${detailDoctor.Editor.description}`;
    }
    return (
      <Fragment>
        <HomeHeader isShowBanner={false} />
        <div className="detai-doctor-container">
          <div className="detai-doctor-intro">
            <div
              className="content-left"
              style={{ backgroundImage: `url(${detailDoctor.image})` }}
            ></div>
            <div className="content-right">
              <div className="content-up">
                <h1>{language == LANGUAGES.VI ? nameVi : nameEn}</h1>
              </div>
              <div className="content-down">{description}</div>
            </div>
          </div>
          <div className="detai-doctor-schedule"></div>
          <div className="detai-doctor-info">{content}</div>
          <div className="detai-doctor-comment"></div>
        </div>
        <HomeFooter />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
