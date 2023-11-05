import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidUpdate = async (prevProps, prevState) => {


    }


    render() {
        console.log(this.props.dataScheduleTimeModal)
        return (
            <div className='container bookingModal'>
                <Modal isOpen={this.props.isOpenModal}
                    className={'booking-modal-content'}
                    size='lg'
                    centered
                >
                    <div className='booking-madal-header'>
                        <span className='left'>Thông tin đặt lịch khám bệnh</span>
                        <span className='right'
                            onClick={this.props.closeBookingModal}><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-madal-body'>
                        <div className='doctor-infor'>
                            <ProfileDoctor />
                        </div>
                        <div className='doctor-price'></div>
                        <div className='row'>
                            <div className='col-6'>
                                <label>Họ Tên </label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>Số điện thoại </label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>Email </label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>Địa chỉ liên hệ </label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>Giới tính</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6'>
                                <label>Đặt cho ai </label>
                                <input className='form-control' />
                            </div>
                            <div className='col-12'>
                                <label>Lý do khám</label>
                                <input className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className='booking-madal-footer'>
                        <button className='btn-booking-confirm'>Xác nhận</button>
                        <button className='btn-booking-cancel'>cancel</button>
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