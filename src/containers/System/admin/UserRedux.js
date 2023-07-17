import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import TableUserAdmin from "./TableUserAdmin";
import "react-toastify/dist/ReactToastify.css";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      editUserData: [],
      genderArr: [],
      positionArr: [],
      roleArr: [],
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      previewImgURL: "",
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getRoleStart();
    this.props.getPositionStart();
  }

  componentDidUpdate(preProps, preState, snapshot) {}

  checkValideInput = () => {
    let isValid = true;
    let checkArr = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
      "gender",
      "role",
      "positionID",
    ];
    for (let i = 0; i < checkArr.length; i++) {
      if (this.state[checkArr[i]] === "") {
        isValid = false;
        alert("Missing parameter: " + checkArr[i]);
        break;
      }
    }
    return isValid;
  };

  onchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      }
      // () => {
      //   console.log("checkState: ", this.state);
      // }
    );
  };

  handleOnChangeImage = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: file,
      });
    }
  };

  handleAddNewUser() {
    this.setState({
      isOpenModalUser: true,
    });
  }
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
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
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      role,
      position,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">
          <FormattedMessage id="manage-user.add" />
        </div>
        <button
          className="btn btn-primary px-2"
          onClick={() => this.handleAddNewUser()}
        >
          <i className="fas fa-plus"></i>Add new user
        </button>
        <div className="col-12">
          {isGetGenders === true ? "Loading gender" : ""}
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              {/* <form className="row g-3 needs-validation" noValidate>
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
                    type="password"
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
                    value={firstName}
                    onChange={(event) => {
                      this.onchangeInput(event, "firstName");
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
                    value={lastName}
                    onChange={(event) => {
                      this.onchangeInput(event, "lastName");
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
                    value={phoneNumber}
                    onChange={(event) => {
                      this.onchangeInput(event, "phoneNumber");
                    }}
                  />
                </div>
                <div className=" col-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    className="form-select"
                    value={gender}
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
                    // value={avatar}
                    onChange={(event) => {
                      this.handleOnChangeImage(event);
                    }}
                  />
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => this.handleSave()}
                  >
                    <FormattedMessage id="manage-user.save" />
                  </button>
                </div>
              </form> */}
            </div>
          </div>
        </div>
        <TableUserAdmin />
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
    createNewUser: (user) => dispatch(actions.createNewUser(user)),
    fetchAllUsers: () => dispatch(actions.fetchAllUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
