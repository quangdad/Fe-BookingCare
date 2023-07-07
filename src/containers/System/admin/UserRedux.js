import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import actions from "../../../store/actions";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    this.props.getGenderStart;
    // let res = await getAllCodeService("gender");
    // if (res && res.err === 0) {
    //   this.setState({
    //     genderArr: res.data,
    //     roleArr: res.dataRole,
    //     positionArr: res.dataPosition,
    //   });
    // }
    // console.log("data: ", res);
  }

  render() {
    console.log("check state: ", this.state.genderArr);
    let genders = this.state.genderArr;
    console.log("gender: ", genders);
    let language = this.props.language;
    return (
      <div className="user-redux-container">
        <div className="title">
          <FormattedMessage id="manage-user.add" />
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <form className="row g-3 needs-validation" noValidate>
                <div className=" col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className=" col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className=" col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                  />
                </div>
                <div className=" col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                  />
                </div>
                <div className=" col-12">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                  />
                </div>
                <div className=" col-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.phone" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone number"
                  />
                </div>
                <div className=" col-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select className="form-select">
                    {genders && genders.length > 0
                      ? genders.map((item, index) => {
                          return (
                            <option key={index}>
                              {language === LANGUAGES.VI
                                ? item.valueVI
                                : item.valueEN}
                            </option>
                          );
                        })
                      : ""}
                  </select>
                </div>
                <div className=" col-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select name="position" className="form-select">
                    <option value="1">Admin</option>
                    <option value="2">Doctor</option>
                    <option value="3">Patient</option>
                  </select>
                </div>
                <div className=" col-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select name="role" className="form-select">
                    <option value="1">Admin</option>
                    <option value="2">Doctor</option>
                    <option value="3">Patient</option>
                  </select>
                </div>
                <div className=" col-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.avatar" />
                  </label>
                  <input className="form-control" placeholder="avatar"></input>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary" type="submit">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.getGenderStart()),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
