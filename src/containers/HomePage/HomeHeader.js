import React, { Component } from "react";
import { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";

class HomeHeader extends Component {
  changLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let language = this.props.language;
    return (
      <Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.specialty" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.search-specialty" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.facilities" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.search-facilities" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.search-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.service" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.search-service" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <b>
                  <FormattedMessage id="home-header.support" />
                </b>
              </div>
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
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="content-up">
            <div className="banner-part-1">
              <FormattedMessage id="home-header.banner1" />
            </div>
            <div className="banner-part-2">
              <b>
                <FormattedMessage id="home-header.banner2" />
              </b>
            </div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Tìm kiếm" />
            </div>
          </div>
          <div className="content-down"></div>
        </div>
      </Fragment>
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
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
