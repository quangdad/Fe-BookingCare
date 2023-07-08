import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      isOpen: false,
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phonenumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getRoleStart();
    this.props.getPositionStart();
    // this.props.dispatch(actions.getGenderStart());

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

  componentDidUpdate(preProps, preState, snapshot) {
    if (preProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
    if (preProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: this.props.roleRedux,
      });
    }
    if (preProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        positionArr: this.props.positionRedux,
      });
    }
  }

  handleSave = () => {};

  onchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("checkState: ", this.state);
      }
    );
  };

  handleOnChangeImage = (event) => {
    let data = event.target.files;
    let file = data[0];
    console.log("check file", file);
  };
  render() {
    let genders = this.state.genderArr.data;
    let roles = this.state.roleArr.data;
    let positions = this.state.positionArr.data;
    let language = this.props.language;
    let isGetGenders = this.props;

    let {
      email,
      password,
      firstname,
      lastname,
      address,
      phonenumber,
      gender,
      role,
      position,
      avatar,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">
          <FormattedMessage id="manage-user.add" />
        </div>
        <div className="col-12">
          {isGetGenders === true ? "Loading gender" : ""}
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
                    value={email}
                    onChange={(event) => {
                      this.onchangeInput(event, "email");
                    }}
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
                    value={password}
                    onChange={(event) => {
                      this.onchangeInput(event, "password");
                    }}
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
                    value={firstname}
                    onChange={(event) => {
                      this.onchangeInput(event, "firstname");
                    }}
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
                    value={lastname}
                    onChange={(event) => {
                      this.onchangeInput(event, "lastname");
                    }}
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
                    value={address}
                    onChange={(event) => {
                      this.onchangeInput(event, "address");
                    }}
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
                    value={phonenumber}
                    onChange={(event) => {
                      this.onchangeInput(event, "phonenumber");
                    }}
                  />
                </div>
                <div className=" col-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    className="form-select"
                    onChange={(event) => {
                      this.onchangeInput(event, "gender");
                    }}
                  >
                    {genders && genders.length > 0
                      ? genders.map((item, index) => {
                          return (
                            <option key={index} value={item.key}>
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
                  <select
                    name="position"
                    className="form-select"
                    value={position}
                    onChange={(event) => {
                      this.onchangeInput(event, "position");
                    }}
                  >
                    {positions && positions.length > 0
                      ? positions.map((item, index) => {
                          return (
                            <option key={index} value={item.key}>
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
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select
                    name="role"
                    className="form-select"
                    value={role}
                    onChange={(event) => {
                      this.onchangeInput(event, "role");
                    }}
                  >
                    {roles && roles.length > 0
                      ? roles.map((item, index) => {
                          return (
                            <option key={index} value={item.key}>
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
                  <label className="form-label " htmlFor="previewImg">
                    <FormattedMessage id="manage-user.avatar" />
                  </label>
                  <input
                    id="previewImg"
                    type="file"
                    className="form-control"
                    placeholder="Avatar"
                    value={avatar}
                    onChange={(event) => {
                      this.handleOnChangeImage(event);
                    }}
                  ></input>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={(this.handleSave = () => {})}
                  >
                    <FormattedMessage id="manage-user.save" />
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
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isloadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
