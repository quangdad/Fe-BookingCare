import React, { Component } from "react";
import { connect } from "react-redux";
import HomeFooter from "../../HomePage/HomeFooter";
import HomeHeader from "../../HomePage/HomeHeader";
import { Fragment } from "react";
import "./DetailDoctor.scss";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }
  async componentDidMount() {
    this.props.getDetailDoctor(this.props.match.params.id);
  }
  componentDidUpdate(preProps, preState, snapshot) {
    if (preProps.dataDoctor != this.props.dataDoctor) {
      this.setState({
        detailDoctor: this.props.dataDoctor,
      });
    }
  }
  render() {
    let detailDoctor = this.state.detailDoctor.data;
    let language = this.props.language;
    let nameVi = "";
    let nameEn = "";
    let content = "";
    let description = "";
    let image = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    }
    if (detailDoctor && detailDoctor.Editor) {
      content = `${detailDoctor.Editor.contentMarkdown}`;
      description = `${detailDoctor.Editor.description}`;
    }
    if (detailDoctor && detailDoctor.image) {
      image = `${detailDoctor.image}`;
    }
    return (
      <Fragment>
        <HomeHeader isShowBanner={false} />
        <div className="detai-doctor-container">
          <div className="detai-doctor-intro">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${image})`,
              }}
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
    dataDoctor: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailDoctor: (putData) => dispatch(actions.fetchDetailDoctor(putData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
