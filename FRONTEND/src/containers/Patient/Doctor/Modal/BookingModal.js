import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidUpdate = async (prevProps, prevState) => {


    }


    render() {
        let doctorId = '';
        if (this.props.dataScheduleTimeModal && !_.isEmpty(this.props.dataScheduleTimeModal)) {
            doctorId = this.props.dataScheduleTimeModal.doctorId;
        }
        console.log("check doctor id: ", doctorId);
        return (
            <div className='container bookingModal'>
                <Modal isOpen={this.props.isOpenModal}
                    className={'booking-modal-content'}
                    size='lg'
                    centered
                >
                    <div className='modal-content-booking'>
                        <div className='booking-madal-header'>
                            <span className='left'>
                                <FormattedMessage id="admin.manage-schedule.infor-schedules">
                                </FormattedMessage>
                            </span>
                            <span className='right'
                                onClick={this.props.closeBookingModal}><i className='fas fa-times'></i></span>
                        </div>
                        <div className='booking-madal-body'>
                            <div className='doctor-infor'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isOpenProfileDoctor={false}
                                    time={this.props.dataScheduleTimeModal} />
                            </div>
                            <div className='doctor-price'></div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label><FormattedMessage id="admin.manage-schedule.name">
                                    </FormattedMessage> </label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <label><FormattedMessage id="admin.manage-schedule.phone">
                                    </FormattedMessage> </label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <label>Email </label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <label><FormattedMessage id="admin.manage-schedule.address">
                                    </FormattedMessage> </label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <label><FormattedMessage id="admin.manage-schedule.gender">
                                    </FormattedMessage></label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <label><FormattedMessage id="admin.manage-schedule.who">
                                    </FormattedMessage> </label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-12'>
                                    <label><FormattedMessage id="admin.manage-schedule.reason">
                                    </FormattedMessage></label>
                                    <input className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className='booking-madal-footer'>
                            <button className='btn-booking-confirm'><FormattedMessage id="admin.manage-schedule.confirm">
                            </FormattedMessage></button>
                            <button className='btn-booking-cancel' onClick={this.props.closeBookingModal}><FormattedMessage id="admin.manage-schedule.cancel">
                            </FormattedMessage></button>
                        </div>
                    </div>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);