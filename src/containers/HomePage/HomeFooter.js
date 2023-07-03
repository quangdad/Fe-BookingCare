import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";
import logo from "../../assets/images/images.png";
import dkkd from "../../assets/images/bo-cong-thuong.svg";

class HomeFooter extends Component {
  render() {
    return (
      <footer>
        <div className="main-footer">
          <div className="main-container">
            <div className="col-1">
              <a className="logo" href="/">
                <img src={logo} />
              </a>
              <p>
                <b>Công ty cổ phần y tế PetCare</b>
              </p>
              <p>Số 10 đường Hà Huy Tập, thành phố Vinh, Nghệ An</p>
              <p>ĐKKD số: 27A8019670</p>
              <div>
                <a>
                  <img src={dkkd}></img>
                </a>
              </div>
            </div>
            <div className="col-2">
              <ul className="list-policy">
                <li>
                  <a href="/">Điểu khoản sử dụng</a>
                </li>
                <li>
                  <a href="/">Chính sách bảo mật</a>
                </li>
                <li>
                  <a href="/">Tuyển dụng</a>
                </li>
                <li>
                  <a href="/">Liên hệ hợp tác</a>
                </li>
                <li>
                  <a href="/">Danh bạ y tế</a>
                </li>
                <li>
                  <a href="/">Sức khỏe doanh nghiệp</a>
                </li>
                <li>
                  <a href="/">Câu hỏi thường gặp</a>
                </li>
              </ul>
            </div>
            <div className="col-3">
              <p>
                <b>Trụ sở tại Nghệ An</b>
              </p>
              <p>Số 10 đường Hà Huy Tập, thành phố Vinh, Nghệ An</p>
              <p>Số 82 đường Nguyễn Sỹ Sách, thành phố Vinh, Nghệ An</p>
              <p>
                <b>Hỗ trợ khách hàng</b>
              </p>
              <p>support@petcare.vn (7h - 18h)</p>
              <p>
                <b>Hotline</b>
              </p>
              <p>012-4321-2468 (7h - 18h)</p>
            </div>
          </div>
        </div>
        <div className="home-footer">
          <div className="footer-cr">
            <p>&copy; 2023 Lê Quang Đạt.</p>
          </div>
          <div className="footer-icon">
            <i
              className="fab fa-facebook-square fa-3x"
              style={{ color: "#000095" }}
            ></i>

            <i
              className="fab fa-twitter-square fa-3x"
              style={{ color: "#3399ff" }}
            ></i>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
