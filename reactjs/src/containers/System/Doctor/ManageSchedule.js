import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from 'react-intl'; // fomat language
import * as action from "../../../store/actions";
import { LANGUAGE, dateFormat } from '../../../utils'; // vi or en
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { Toast, toast } from 'react-toastify';
import _, { times } from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService'
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: {},
            listDoctor: [],
            currentDate: '',
            rangeTime: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleHour();
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

        /* let res = await getDetailInforDoctor(selectedDoctor.value);
        console.log(res.data.Markdown);
        if (res && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            console.log("mark: ", markdown.description);
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
        } */
        /* console.log("check ress: ", res); */
    };
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
        /* if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildInputSelect(this.props.allDoctorRedux);
            this.setState({
                listDoctor: dataSelect
            })
        } */

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isselected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleButtonTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isselected = !item.isselected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let result = [];
        let { rangeTime, selectedDoctor, currentDate } = this.state;

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected Doctor!")
            return;
        }
        if (!currentDate) {
            toast.error("Invalid date!")
            return;
        }
        let formatedDate = new Date(currentDate).getTime();
        console.log("check current date: ", formatedDate)
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isselected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = item.keyMap;
                    result.push(object)
                })
            } else {
                toast.error("Invalid selected time!")
                return;
            }
        }

        let response = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatedDate
        });
        toast.success("Create schedule success!")



    }

    render() {
        let { rangeTime } = this.state;
        console.log("check time: ", this.state.rangeTime)
        let { language } = this.props;
        return (
            <React.Fragment>
                <div className='container manage-schedule'>
                    <div className='manage-schedule-content mx-auto'>
                        <div className='manage-schedule-title title my-5'>
                            <FormattedMessage id="manage-schedule.title" />
                        </div>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-6 form-group choose'>
                                    <label> <FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                    <Select
                                        value={this.state.selectedDoctor}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.listDoctor}
                                    />
                                </div>
                                <div className='col-2 form-group'>
                                    <label> <FormattedMessage id="manage-schedule.choose-date" /></label>
                                    <DatePicker className="form-control date"
                                        onChange={this.handleOnchangeDatePicker}
                                        /* value={this.state.currentDate} */
                                        selected={this.state.currentDate}
                                        minDate={new Date()}
                                    />
                                </div>
                                <div className='col-12 hour-container mt-2'>
                                    <div className='hour-container-content'>
                                        {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                            return (
                                                <button className={item.isselected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                                    onClick={() => this.handleButtonTime(item)}
                                                    key={index}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</button>
                                            )
                                        })}
                                    </div>
                                </div>
                                <p className='col-12 text-center mt-5'>
                                    <button className='btn btn-primary'
                                        onClick={() => this.handleSaveSchedule()}
                                    ><FormattedMessage id="manage-schedule.save" /></button> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctorRedux: state.admin.allDoctor,
        isLoggedIn: state.user.isLoggedIn,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(action.fetchAllDoctor()),
        fetchAllScheduleHour: () => dispatch(action.fetchAllScheduleHour()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
