import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableUserAdmin.scss";
import {
  getAllUsers,
  editUserService,
  deleteUserService,
  createNewUserService,
} from "../../../services/userService";
import ModelUserRedux from "./ModelUserRedux";
import ModalEditUserRedux from "./ModalEditUserRedux";
import { emitter } from "../../../utils/emitter";
import * as actions from "../../../store/actions";

class TableUserAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      editUserData: [],
    };
  }

  async componentDidMount() {
    this.props.fetchAllUsers();
  }
  handleAddNewUser() {
    this.setState({
      isOpenModalUser: true,
    });
  }
  handleEditUser(data) {
    console.log("data", data);
    this.setState({
      isOpenModalEditUser: true,
      editUserData: data,
    });
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
  deleteUser = async (user) => {
    try {
      let response = await deleteUserService(user.id);
      if (response && response.data.err === 0) {
        let getUser = await getAllUsers("ALL");
        this.setState({
          arrUsers: getUser.data.user,
        });
      } else {
        alert(response.data.mes);
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidUpdate(preProps, preState, snapshot) {
    if (preProps.users !== this.props.users) {
      this.setState({
        arrUsers: this.props.users,
      });
    }
  }

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModelUserRedux
          isOpen={this.state.isOpenModalUser}
          toggleUserFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUserRedux
            isOpen={this.state.isOpenModalEditUser}
            toggleEditUserFromParent={this.toggleEditUserModal}
            currentUser={this.state.editUserData}
            editUser={this.editUser}
          />
        )}
        <div className="mx-2"></div>
        <div className="user-table mt-4 mx-2">
          <table>
            <tbody>
              <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Phone number</th>
                <th>Action</th>
              </tr>
              {arrUsers && arrUsers.length > 0 ? (
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>{item.phonenumber}</td>
                      <td className="td-btn">
                        <button className="btn-edit">
                          <i
                            className="fas fa-pencil-alt fa-lg"
                            onClick={() => {
                              this.handleEditUser(item);
                            }}
                          ></i>
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
                })
              ) : (
                <tr>
                  <td colSpan="8">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(actions.fetchAllUsers()),
    editUser: () => dispatch(actions.editUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserAdmin);
