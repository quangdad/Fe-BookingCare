import { values } from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { LANGUAGES, CommonUtils } from "../../../utils";

class ModalEditUserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalEditUser: false,
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
    // this.props.fetchUser(this.state);
    this.setState({
      arrUsers: this.props.users,
      genderArr: this.props.genderRedux,
      roleArr: this.props.roleRedux,
      positionArr: this.props.positionRedux,
    });
    let user = this.props.currentUser;
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
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
        roleId: user.roleID,
        positionId: user.positionId,
        avatar: "",
        previewImgURL: imageBase64,
      });
    }
  }

  toggle = () => {
    this.props.toggleEditUserFromParent();
  };
  handleOnChangeInput = (event, id) => {
    let copystate = { ...this.state };
    copystate[id] = event.target.value;
    this.setState({
      ...copystate,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        avatar: base64,
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
      this.props.editUserToggle();
    }
  };
  render() {
    let roles = this.state.roleArr.data;
    let genders = this.state.genderArr.data;
    let positions = this.state.positionArr.data;
    let language = this.props.language;

    let {
      email,
      passWord,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      roleId,
      positionId,
    } = this.state;
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
        <ModalBody>
          <div className="modal-edit-user-body">
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
                              <option key={index} value={item.keyMap}>
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
                      value={positionId}
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "positionId");
                      }}
                    >
                      {positions && positions.length > 0
                        ? positions.map((item, index) => {
                            return (
                              <option key={index} value={item.keyMap}>
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
                      value={roleId}
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "roleId");
                      }}
                    >
                      {roles && roles.length > 0
                        ? roles.map((item, index) => {
                            return (
                              <option key={index} value={item.keyMap}>
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
        </ModalBody>
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
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isloadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUser: (userId) => dispatch(actions.fetchUser(userId)),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    editUser: (putData) => dispatch(actions.editUser(putData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUserRedux);
