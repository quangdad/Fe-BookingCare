import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "react-toastify/dist/ReactToastify.css";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      allDoctorArr: [],
      doctorId: "",
      action: "",
      hasOldData: "",
    };
  }
  componentDidMount() {
    this.props.loadAllDoctor();
  }
  buildDataSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelEn = `${item.lastName} ${item.firstName}`;
        let labelVi = `${item.firstName} ${item.lastName}`;
        object.label = language == LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveManageDoctor = async () => {
    let hasOldData = this.state.hasOldData;
    this.props.saveDetailDoctorService({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData == "" ? CRUD_ACTIONS.CREATE : CRUD_ACTIONS.EDIT,
    });
    if (this.state.contentMarkdown != "") {
      this.setState({
        hasOldData: true,
      });
    }
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({
      selectedOption,
    });
    let res = await this.props.getDetailDoctor(selectedOption.value);
    let dataDoctor = this.props.dataDoctor;
    if (
      dataDoctor &&
      dataDoctor.err == 0 &&
      dataDoctor.data &&
      dataDoctor.data.Editor
    ) {
      let dataDoctor2 = dataDoctor.data.Editor;
      this.setState({
        description: dataDoctor2.description,
        contentHTML: dataDoctor2.contentHTML,
        contentMarkdown: dataDoctor2.contentMarkdown,
        hasOldData: true,
      });
    } else {
      this.setState({
        description: "",
        contentHTML: "",
        contentMarkdown: "",
        hasOldData: false,
      });
    }
  };
  handleOnchangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  componentDidUpdate(preProps, preState) {
    if (preProps.allDoctor !== this.props.allDoctor) {
      let arrAllDoctor = this.buildDataSelect(this.props.allDoctor.data);
      this.setState({
        allDoctorArr: arrAllDoctor,
      });
    }
    if (preProps.language !== this.props.language) {
      let arrAllDoctor = this.buildDataSelect(this.props.allDoctor.data);
      this.setState({
        allDoctorArr: arrAllDoctor,
        selectedOption: this.state.selectedOption,
      });
    }
  }
  render() {
    let selectedOption = this.state.selectedOption;
    let description = this.state.description;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="menu.admin.manage-doctor.title" />
        </div>
        <div className="content-up">
          <div className="content-left">
            <label className="form-label">
              <FormattedMessage id="menu.admin.manage-doctor.select" />
            </label>
            <Select
              value={selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.allDoctorArr}
            />
          </div>
          <div className="content-right">
            <label className="form-label">
              <FormattedMessage id="menu.admin.manage-doctor.description" />
            </label>
            <textarea
              className="form-control"
              value={description}
              onChange={(event) => this.handleOnchangeDesc(event)}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor"></div>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
          value={this.state.contentMarkdown}
        />
        <button
          className="markdown-button btn btn-primary"
          type="button"
          onClick={() => this.handleSaveManageDoctor(this.state)}
        >
          <FormattedMessage id="menu.admin.manage-doctor.markdown-button" />
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctor: state.admin.allDoctor,
    dataDoctor: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveDetailDoctorService: (data) =>
      dispatch(actions.saveDetailDoctorService(data)),
    getDetailDoctor: (putData) => dispatch(actions.fetchDetailDoctor(putData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
