import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  changLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {
    let menu = [];
    let userInfo = this.props;
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.userInfo.roleId;
      if (role == USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role == USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
      this.setState({
        menuApp: menu,
      });
    }
  }
  render() {
    const { processLogout } = this.props;
    let { language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        {/* nút logout */}
        <div className="btn btn-logout">
          <div id="user-name">
            <FormattedMessage id="home-header.user-name" />
            {userInfo && userInfo ? userInfo.lastName : ""}
          </div>
          <div className="btn-content">
            <div className="flag">
              <span>
                <b>
                  <FormattedMessage id="home-header.language" />
                </b>
              </span>
              <div className="lang-box">
                <div
                  className={
                    language === LANGUAGES.VI
                      ? "language-vi active"
                      : "language-vi"
                  }
                >
                  <span
                    onClick={() => {
                      this.changLanguage(LANGUAGES.VI);
                    }}
                  >
                    <b>VI</b>
                  </span>
                </div>
                <div
                  className={
                    language === LANGUAGES.EN
                      ? "language-en active"
                      : "language-en"
                  }
                >
                  <span
                    onClick={() => {
                      this.changLanguage(LANGUAGES.EN);
                    }}
                  >
                    <b>EN</b>
                  </span>
                </div>
              </div>
            </div>
            <i
              className="fas fa-sign-out-alt"
              onClick={processLogout}
              title="Log out"
            ></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
