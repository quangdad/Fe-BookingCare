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
      errMessage: "",
    };
  }

  handleOnchangeUsename = (event) => {
    this.setState({
      usename: event.target.value,
    });
    // console.log(event.target.value);
  };
  handleOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
    // console.log(event.target.value);
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.usename, this.state.password);
      console.log("data", data.data);
      if (data && data.data.err !== 0) {
        this.setState({
          errMessage: data.data.mes,
        });
      }
      if (data && data.data.err === 0) {
        this.props.userLoginSuccess(data.data.user);
        console.log("Login succeed!");
      }
      // userLoginFail;
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.mes,
          });
        }
      }
      console.log("error", error.response);
    }
  };
  handleShowhighPassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleKeyDown = (event) => {
    console.log("enter");
    if (event.key == "Enter") {
      this.handleLogin();
    }
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
                value={this.state.email}
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
                  onKeyDown={(event) => this.handleKeyDown(event)}
                ></input>
                <span
                  onClick={() => {
                    this.handleShowhighPassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fa fa-eye"
                        : "fa fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
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
              <i className="fab fa-google  "></i>
              <i className="fab fa-facebook  "></i>
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
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    // userLoginSuccess: (userInfo) =>
    //   dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
