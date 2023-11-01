import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import "./DoctorSchedule.scss";
import { LANGUAGE } from "../../../utils"
import { getDetailInforDoctor } from '../../../services/userService';
import Select from 'react-select';
import localization from 'moment/locale/vi'
import { getScheduleDoctorById } from '../../../services/userService';
import moment from 'moment';
import { locale } from 'moment';
class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: []
        };
    }

    async componentDidMount() {
        let { language } = this.props;
        console.log(moment(new Date()).format('dddd - DD/MM'));
        console.log(moment(new Date()).locale('en').format('ddd - DD/MM'));
        this.setArrDay(language);


    }

    setArrDay = (language) => {
        const arrDay = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            const currentDate = moment().add(i, 'days');
            if (language === LANGUAGE.VI) {
                object.label = currentDate.format('dddd - DD/MM');
            } else if (language === LANGUAGE.EN) {
                object.label = currentDate.locale('en').format('ddd - DD/MM');
            }
            object.value = currentDate.startOf('day').valueOf();
            arrDay.push(object);
        }
        this.setState({
            allDays: arrDay
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            this.setArrDay(this.props.language)
        }
    }

    handleOnchangeSelect = async (event) => {
        if (this.props.detailDoctor && this.props.detailDoctor !== -1) {
            let id = this.props.detailDoctor;
            let date = event.target.value
            console.log(id, date)
            let res = await getScheduleDoctorById(id, date);
            console.log("check resk: ", res)
        }
    }
    render() {
        console.log(this.state.allDays)
        return (
            <div className='container doctor-schedule'>
                <div className='doctor-schedule-content'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {this.state.allDays && this.state.allDays.length > 0 && this.state.allDays.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='all-available-time'></div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);