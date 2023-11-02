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
import { getDetailInforDoctor } from '../../../services/userService';

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
            listDoctor: [],
            hasOldData: false,
            action: '',

            listPrice: [],
            listProvince: [],
            listPayment: [],
            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            nameClicnic: '',
            addressclicnic: '',
            note: '',
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getRquiredDoctorInfor();
    }

    buildInputSelect = (data, type) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            if (type === "USERS") {
                data.map((item, index) => {
                    let object = {};
                    let labelEn = `${item.lastName} ${item.firstName}`;
                    let labelVi = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === "PRICE") {
                data.map((item, index) => {
                    let object = {};
                    console.log(item.valueVi)
                    let labelEn = `${item.valueEn}`;
                    let labelVi = `${item.valueVi}`;
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === "PAYMENT" || type === "PROVINCE") {
                data.map((item, index) => {
                    let object = {};
                    console.log(item.valueVi)
                    let labelEn = `${item.valueEn}`;
                    let labelVi = `${item.valueVi}`;
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
            let dataSelect = this.buildInputSelect(this.props.allDoctorRedux, "USERS");
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelect = this.buildInputSelect(this.props.allDoctorRedux, "USERS");
            let dataSelectPrice = this.buildInputSelect(resPrice, "PRICE");
            let dataSelectPayment = this.buildInputSelect(resPayment, "PAYMENT");
            let dataSelectProvince = this.buildInputSelect(resProvince, "PROVINCE");
            this.setState({
                listDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
            console.log(resPrice, resPayment, resProvince)
            let dataSelectPrice = this.buildInputSelect(resPrice, "PRICE");
            let dataSelectPayment = this.buildInputSelect(resPayment, "PAYMENT");
            let dataSelectProvince = this.buildInputSelect(resProvince, "PROVINCE");
            console.log(dataSelectPayment, dataSelectProvince, dataSelectPrice);
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
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
        let { hasOldData } = this.state;
        this.props.saveInforDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            discription: this.state.discription,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedPayment.value,
            selectedPayment: this.state.selectedProvince.value,
            nameClicnic: this.state.nameClicnic,
            addressclicnic: this.state.addressclicnic,
            note: this.state.note,
        })
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.ContentMarkdown,
                discription: markdown.description,
                hasOldData: true
            })
        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                discription: '',
                hasOldData: false
            })
        }
    };

    handleChangeSelectDoctorInfor = async (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedDoctor;
        this.setState(stateCopy);
    }
    handleOnchangeDescription = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    render() {
        console.log(this.state)
        return (
            < React.Fragment >
                <div className='container manage-doctor ' >
                    <h3 className='text-center text-primary pt-5 pb-3 fw-bold'><FormattedMessage id="admin.manage-doctor.title" /></h3>
                    <div className='more-infor'>
                        <div className='control-left form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.select-doctor" />  </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                            />
                        </div>
                        <div className='control-right form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                            <textarea className='form-control'
                                onChange={(event) => this.handleOnchangeDescription(event, "discription")}
                                value={this.state.discription} rows={4}
                            >
                            </textarea>
                        </div>

                    </div>
                    <div className='more-infor-extra my-3'>
                        <div className='row'>
                            <div className='col-4 form-group  '>
                                <label><FormattedMessage id="admin.manage-doctor.choose-price" /></label>
                                <Select
                                    options={this.state.listPrice}
                                    value={this.state.selectedPrice}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.choose-price" />}
                                    name="selectedPrice"
                                />
                            </div>
                            <div className='col-4 form-group   '>
                                <label><FormattedMessage id="admin.manage-doctor.choose-payment" /></label>
                                <Select
                                    options={this.state.listPayment}
                                    value={this.state.selectedPayment}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.choose-payment" />}
                                    name="selectedPayment"
                                />
                            </div>
                            <div className='col-4 form-group   '>
                                <label><FormattedMessage id="admin.manage-doctor.choose-province" /></label>
                                <Select
                                    options={this.state.listProvince}
                                    value={this.state.selectedProvince}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.choose-province" />}
                                    name="selectedProvince"
                                />
                            </div>
                            <div className='col-4  form-group '>
                                <label><FormattedMessage id="admin.manage-doctor.name-clinic" /> </label>
                                <input className='form-control'
                                    onChange={(event) => this.handleOnchangeDescription(event, "nameClicnic")}
                                    value={this.state.nameClicnic}
                                />
                            </div>
                            <div className='col-4  form-group '>
                                <label><FormattedMessage id="admin.manage-doctor.address-clinic" /></label>
                                <input className='form-control'
                                    onChange={(event) => this.handleOnchangeDescription(event, "addressclicnic")}
                                    value={this.state.addressclicnic} />
                            </div>
                            <div className='col-4  form-group '>
                                <label>Note</label>
                                <input className='form-control'
                                    onChange={(event) => this.handleOnchangeDescription(event, "note")}
                                    value={this.state.note}
                                    /* onChange={(event) => this.handleOnchangeDescription(event, "")}
                                    value={this.state.selectedProvince} */ />
                            </div>
                        </div>
                    </div>
                    <div className="markdown">
                        <MdEditor
                            style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>

                    <p className='text-center py-3'>
                        <button
                            className={this.state.hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                            onClick={() => this.handleSaveContentMarkdown()}
                        >{this.state.hasOldData === true ? <FormattedMessage id="admin.manage-doctor.add" /> : <FormattedMessage id="admin.manage-doctor.save" />}</button>
                    </p>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctorRedux: state.admin.allDoctor,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRquiredDoctorInfor: () => dispatch(action.getRquiredDoctorInfor()),
        fetchAllDoctor: () => dispatch(action.fetchAllDoctor()),
        saveInforDetailDoctor: (data) => dispatch(action.saveInforDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
