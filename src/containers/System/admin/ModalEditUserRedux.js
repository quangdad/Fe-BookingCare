import { values } from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import * as actions from "../../../store/actions";

class ModalEditUserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      email: "",
      passWord: "",
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
      gender: "",
      roleId: "",
      positionId: "",
      previewImgURL: "",
      avatar: "",
    };
  }

  componentDidMount() {
    this.props.getGenderStart();
    this.props.getRoleStart();
    this.props.getPositionStart();
    this.props.fetchUser(this.state);
    let user = this.props.oneuser;
    console.log("get", user);
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        passWord: "password",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phonenumber: user.phonenumber,
        gender: user.gender,
        roleId: user.roleId,
        positionId: user.positionId,
      });
    }
  }

  componentDidUpdate(preProps, preState, snapshot) {
    if (preProps.users !== this.props.users) {
      this.setState({
        arrUsers: this.props.users,
      });
    }
  }
  toggle = () => {
    this.props.toggleEditUserFromParent();
  };
  handleOnChangeInput = (event, id) => {
    // this.state[id] = event.target.value;
    let copystate = { ...this.state };
    copystate[id] = event.target.value;
    this.setState(
      {
        ...copystate,
      }
      //   ,
      //   () => {
      //     console.log("check state: ", copystate);
      //   }
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
  checkValideInput = () => {
    let isValid = true;
    let arrUsers = [
      "email",
      "passWord",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
    ];
    for (let i = 0; i < arrUsers.length; i++) {
      if (this.state[arrUsers[i]] === "") {
        isValid = false;
        alert("Missing parameter: " + arrUsers[i]);
        break;
      }
    }
    return isValid;
  };

  handleEditUser = () => {
    let isValid = this.checkValideInput();
    if (isValid == true) {
      this.props.editUser(this.state);
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        className={"modal-user-container"}
        size="lg"
        // centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit User
        </ModalHeader>
        {/* <ModalBody>
          <div className="modal-user-body">
            <div className="container">
              <div className="row">
                <form className="row g-3 needs-validation" noValidate>
                  <div className="col-md-3 ">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "email");
                      }}
                      value={this.state.email}
                    />
                  </div>
                  <div className="col-md-3 ">
                    <label className="form-label">Password</label>
                    <input
                      type="passWord"
                      className="form-control"
                      placeholder="passWord"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "passWord");
                      }}
                      value={this.state.passWord}
                    />
                  </div>
                  <div className="col-md-3 ">
                    <label className="form-label">First name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "firstName");
                      }}
                      value={this.state.firstName}
                    />
                  </div>
                  <div className="col-md-3 ">
                    <label className="form-label">Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "lastName");
                      }}
                      value={this.state.lastName}
                    />
                  </div>
                  <div className="col-md-12 ">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "address");
                      }}
                      value={this.state.address}
                    />
                  </div>
                  <div className="col-md-3 ">
                    <label className="form-label">Phone number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone number"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "phonenumber");
                      }}
                      value={this.state.phonenumber}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      value={gender}
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "gender");
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
                  <div className="col-md-3">
                    <label className="form-label">Position</label>
                    <select
                      className="form-select"
                      value={position}
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "position");
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
                  <div className="col-md-3">
                    <label className="form-label">Role ID</label>
                    <select
                      name="role"
                      className="form-select"
                      value={role}
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "role");
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
                  <div className=" col-md-3">
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
                </form>
              </div>
            </div>
          </div>
        </ModalBody> */}
        <ModalFooter>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => this.handleEditUser()}
          >
            <FormattedMessage id="manage-user.save" />
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.toggle}
          >
            <FormattedMessage id="manage-user.cancel" />
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    oneuser: state.admin.oneuser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(actions.fetchUser(userId)),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUserRedux);
