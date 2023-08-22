import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { Fragment } from "react";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import * as action from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import Select from "react-select";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorArr: [],
      selectedOption: "",
      currentDate: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchScheduleDoctor();
  }
  buildDataSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelEn = `${item.lastName} ${item.firstName}`;
        let labelVi = `${item.firstName} ${item.lastName}`;
        object.label = language == LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(preProps) {
    if (preProps.allDoctor !== this.props.allDoctor) {
      let arrAllDoctor = this.buildDataSelect(this.props.allDoctor.data);
      this.setState({
        doctorArr: arrAllDoctor,
      });
    }
    if (preProps.language !== this.props.language) {
      let arrAllDoctor = this.buildDataSelect(this.props.allDoctor.data);
      this.setState({
        doctorArr: arrAllDoctor,
        selectedOption: this.state.selectedOption,
      });
    }
  }

  handleChangeSelect = async (selectedOption) => {
    this.setState({
      selectedOption,
    });
  };
  handleOnchangeDate = (event) => {
    console.log("value", event.target);
    this.setState({ currentDate: event.target.value });
  };
  handleOnClickBtnTime = async (event) => {
    let value = await event.target.value;
    console.log("value", value);
  };
  handleClickBtnSave = () => {};
  render() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    let today = year + "-" + month + "-" + day;
    let selectedOption = this.state.selectedOption;
    let { currentDate } = this.state;
    let dataTime = this.props.dataTime.data;
    let language = this.props.language;
    return (
      <Fragment>
        <div className="manage-schedule-container">
          <div className="title">
            <FormattedMessage id="menu.doctor.title" />
          </div>
          <div className="form-input">
            <div className="content-up">
              <div className="col-md-5 content-left">
                <label className="form-label">
                  <FormattedMessage id="menu.doctor.select-doctor" />
                </label>
                <Select
                  value={selectedOption}
                  onChange={this.handleChangeSelect}
                  options={this.state.doctorArr}
                />
              </div>
              <div className="col-md-5 content-right">
                <label className="form-label">
                  <FormattedMessage id="menu.doctor.select-date" />
                </label>
                <input
                  type="date"
                  id="start"
                  name="trip-start"
                  value={currentDate}
                  min={today}
                  className="form-control"
                  onChange={(event) => this.handleOnchangeDate(event)}
                />
              </div>
            </div>
            <div className="content-middle">
              {dataTime &&
                dataTime.length > 0 &&
                dataTime.map((item, index) => {
                  return (
                    <button
                      className="btn btn-time"
                      key={index}
                      value={item.keyMap}
                      onClick={(event) => this.handleOnClickBtnTime(event)}
                    >
                      {language == LANGUAGES.VI ? item.valueVI : item.valueEN}
                    </button>
                  );
                })}
            </div>
            <div className="content-down">
              <button
                className="btn btn-save"
                onClick={this.handleClickBtnSave()}
              >
                <FormattedMessage id="menu.doctor.btn-save" />
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctor: state.admin.allDoctor,
    language: state.app.language,
    dataTime: state.admin.dataTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(action.fetchAllDoctor()),
    fetchScheduleDoctor: () => dispatch(action.fetchScheduleDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
