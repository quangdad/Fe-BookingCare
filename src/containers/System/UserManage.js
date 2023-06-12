import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  editUserService,
  deleteUserService,
  createNewUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      editUserData: {},
    };
  }

  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.err === 0) {
      this.setState({
        arrUsers: response.user,
      });
    }
  }
  handleAddNewUser() {
    this.setState({
      isOpenModalUser: true,
    });
  }
  handleEditUser(user) {
    this.setState({
      isOpenModalEditUser: true,
      editUserData: user,
    });
    // console.log("check edit user", editUserData);
  }
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.err !== 0) {
        alert(response.mes);
      } else {
        let response = await getAllUsers("ALL");
        this.setState({
          isOpenModalUser: false,
          arrUsers: response.user,
        });
        emitter.emit("EVENT_CLEAR_MODAL_INPUT");
      }
    } catch (e) {
      console.log(e);
    }
  };
  deleteUser = async (user) => {
    try {
      let response = await deleteUserService(user.id);
      if (response && response.err === 0) {
        let getUser = await getAllUsers("ALL");
        this.setState({
          arrUsers: getUser.user,
        });
      } else {
        alert(response.mes);
      }
    } catch (e) {
      console.log(e);
    }
  };
  editUser = async (putData) => {
    let response = await editUserService(putData);
    if (response && response.err !== 0) {
      alert(response.mes);
    } else {
      let response = await getAllUsers("ALL");
      this.setState({
        isOpenModalUser: false,
        arrUsers: response.user,
      });
    }
  };
  render() {
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleUserFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleUserFromParent={this.toggleEditUserModal}
            currentUser={this.state.editUserData}
            editUser={this.editUser}
          />
        )}
        <div className="title">Manage users </div>
        <div className="mx-2">
          <button
            className="btn btn-primary px-2"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i>Add new user
          </button>
        </div>
        <div className="user-table mt-4 mx-2">
          <table>
            <tbody>
              <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Phone number</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
              {this.state.arrUsers &&
                this.state.arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.gender}</td>
                      <td>{item.roleID}</td>
                      <td className="td-btn">
                        <button className="btn-edit">
                          <i
                            className="fas fa-pencil-alt fa-lg"
                            onClick={() => {
                              this.handleEditUser(item);
                            }}
                          ></i>{" "}
                        </button>
                        <button className="btn-delete fa-lg">
                          <i
                            className="fas fa-trash"
                            onClick={() => {
                              this.deleteUser(item);
                            }}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
