import { values } from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      passWord: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        passWord: "password",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phonenumber: user.phonenumber,
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
    this.setState({
      ...copystate,
    });
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
                disabled
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
                disabled
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
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.handleEditUser();
            }}
          >
            Save change
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
