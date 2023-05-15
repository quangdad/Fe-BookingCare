import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginApi } from "../../services/userService";
// import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usename: "",
      password: "",
      isShowPassword: false,
    };
  }

  handleOnchangeUsename = (event) => {
    this.setState({
      usename: event.target.value,
    });
    console.log(event.target.value);
  };
  handleOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
    console.log(event.target.value);
  };
  handleLogin = async () => {
    console.log(this.state);
    try {
      await handleLoginApi(this.state.usename, this.state.password);
    } catch (e) {
      console.log(e);
    }
  };
  handleShowhighPassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 text-center">Login</div>
            <div className="col-12 form-group">
              <label>Usename</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter usename"
                onChange={(event) => this.handleOnchangeUsename(event)}
              ></input>
            </div>
            <div className="col-12 form-group">
              <label>Password</label>
              <div className="custom-password">
                <input
                  className="form-control"
                  placeholder="Enter password"
                  value={this.state.password}
                  type={this.state.isShowPassword ? "text" : "password"}
                  onChange={(event) => this.handleOnchangePassword(event)}
                ></input>
                <span
                  onClick={() => {
                    this.handleShowhighPassword();
                  }}
                >
                  <i
                    class={
                      this.state.isShowPassword
                        ? "fa fa-eye"
                        : "fa fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12">
              <input
                type="button"
                className="login-button"
                value={"Login"}
                onClick={() => {
                  this.handleLogin();
                }}
              ></input>
            </div>
            <div className="col-12">
              <span>Forgot your password?</span>
            </div>
            <div className="col-12">
              <span>Or sign in with</span>
            </div>
            <div className="col-12 stack-icons">
              <i class="fab fa-google  "></i>
              <i class="fab fa-facebook  "></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
