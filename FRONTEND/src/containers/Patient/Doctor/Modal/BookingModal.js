import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidUpdate = async (prevProps, prevState) => {


    }


    render() {
        return (
            <div className='container bookingModal'>
                <Modal isOpen={true}
                    className={'booking-modal-content'}
                    size='lg'
                    centered
                >
                    <div className='booking-madal-header'>dqwdqw
                    </div>
                    <div className='booking-madal-body'>qwwdqd
                    </div>
                    <div className='booking-madal-footer'>qdqqf
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