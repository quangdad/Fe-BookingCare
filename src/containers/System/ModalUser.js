import { values } from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passWord: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: 0,
      role: 3,
    };
    this.listenToEmitter();
  }
  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_INPUT", () => {
      this.setState({
        email: "",
        passWord: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: 0,
        role: 3,
      });
    });
  };
  componentDidMount() {}

  toggle = () => {
    this.props.toggleUserFromParent();
  };
  handleOnChangeInput = (event, id) => {
    // this.state[id] = event.target.value;
    let copystate = { ...this.state };
    copystate[id] = event.target.value;
    this.setState(
      {
        ...copystate,
      }
      // ,
      // () => {
      //   console.log("check state: ", copystate);
      // }
    );
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
      "gender",
      "role",
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
  handleAddnewUser = () => {
    let isValid = this.checkValideInput();
    if (isValid == true) {
      this.props.createNewUser(this.state);
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
          Create User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                placeholder="Email"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <label htmlFor="inputPassword4">Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "passWord");
                }}
                value={this.state.passWord}
              />
            </div>
            <div className="input-container">
              <label htmlFor="inputPassword4">First name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "firstName");
                }}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label htmlFor="inputPassword4">Last name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "lastName");
                }}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container">
              <label htmlFor="inputPassword4">Address</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
            <div className="input-container">
              <label htmlFor="inputPassword4">Phone number</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "phoneNumber");
                }}
                value={this.state.phoneNumber}
              />
            </div>
            <div className="input-container">
              <label htmlFor="inputPassword4">Sex</label>
              <select
                name="gender"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "gender");
                }}
              >
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="inputPassword4">Role ID</label>
              <select
                name="roleID"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "role");
                }}
              >
                <option value="1">Admin</option>
                <option value="2">Doctor</option>
                <option value="3">Patient</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.handleAddnewUser();
            }}
          >
            Add new
          </Button>{" "}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
