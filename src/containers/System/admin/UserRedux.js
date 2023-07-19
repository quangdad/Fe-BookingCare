import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import ModelUserRedux from "./ModelUserRedux";
import ModalEditUserRedux from "./ModalEditUserRedux";
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
      positionId: "",
      roleId: "",
      avatar: "",
      previewImgURL: "",
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
    try {
      this.setState({
        isOpenModalEditUser: true,
        editUserData: data,
      });
    } catch (e) {
      console.log(e);
    }
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
  handelDeleteUser = async (user) => {
    this.props.deleteUser(user.id);
  };

  componentDidUpdate(preProps, preState, snapshot) {
    if (preProps.users !== this.props.users) {
      this.setState({
        arrUsers: this.props.users,
      });
    }
  }
  createUserToggle = () => {
    this.setState({
      isOpenModalUser: false,
    });
  };
  editUserToggle = () => {
    this.setState({
      isOpenModalEditUser: false,
    });
  };
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModelUserRedux
          isOpen={this.state.isOpenModalUser}
          toggleUserFromParent={this.toggleUserModal}
          createUserToggle={this.createUserToggle}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUserRedux
            isOpen={this.state.isOpenModalEditUser}
            toggleEditUserFromParent={this.toggleEditUserModal}
            currentUser={this.state.editUserData}
            editUserToggle={this.editUserToggle}
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
                <th>Position</th>
                <th>Role</th>
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
                      <td>{item.gender}</td>
                      <td>{item.positionId}</td>
                      <td>{item.roleID}</td>
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
                              this.handelDeleteUser(item);
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
    deleteUser: (userId) => dispatch(actions.deleteUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
