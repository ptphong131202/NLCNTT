import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as action from "../../../store/actions";
import { LANGUAGE, CRUD_ACTION, CommonUtils } from '../../../utils'; // vi or en
import { changeLanguage } from '../../../store/actions'; // change language

import Select from 'react-select';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import "./ManageDoctor.scss"

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageDoctor extends Component {
    // constructor
    constructor(props) {
        super();
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            discription: '',
            listDoctor: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
    }

    buildInputSelect = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelEn = `${item.lastName} ${item.firstName}`;
                let labelVi = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
            let dataSelect = this.buildInputSelect(this.props.allDoctorRedux);
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildInputSelect(this.props.allDoctorRedux);
            this.setState({
                listDoctor: dataSelect
            })
        }
    }


    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        console.log("Check selectDoctor Id: ", this.state.selectedDoctor.value)
        this.props.saveInforDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            discription: this.state.discription,
            doctorId: this.state.selectedDoctor.value
        })
        console.log("check state content Markdown: ", this.state);
    }
    handleChange = (selectedDoctor) => {
        this.setState({
            selectedDoctor
        },
            () =>
                console.log(`Option selected:`, this.state.selectedDoctor)
        );
    };
    handleOnchangeDescription = (event) => {
        this.setState({
            discription: event.target.value
        })
    }

    render() {
        console.log("this.state.listDoctor: ", this.state.listDoctor)
        return (
            < React.Fragment >
                <div className='container manage-doctor ' >
                    <h3 className='text-center text-primary pt-5 pb-3 fw-bold'>Thêm Thông tin bác sĩ</h3>
                    <div className='more-infor'>
                        <div className='control-left form-group'>
                            <label>Chọn bác sĩ:  </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className='control-right form-group'>
                            <label>Thông tin giới thiệu: </label>
                            <textarea className='form-control'
                                onChange={(event) => this.handleOnchangeDescription(event)}
                                value={this.state.discription}
                                rows={4} cols={4}>
                            </textarea>
                        </div>

                    </div>
                    <div className="markdown">
                        <MdEditor
                            style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange} />
                    </div>
                    <p className='text-center py-3'>
                        <button
                            className='save-content-doctor'
                            onClick={() => this.handleSaveContentMarkdown()}
                        >Lưu thông tin</button>
                    </p>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctorRedux: state.admin.allDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(action.fetchAllDoctor()),
        saveInforDetailDoctor: (data) => dispatch(action.saveInforDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
