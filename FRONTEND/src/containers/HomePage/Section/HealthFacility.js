import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "./HealthFacility.scss"
import { getAllClinic } from "../../../services/userService"
import { withRouter } from 'react-router';

class HealthFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        }
    }

    async componentDidMount() {
        let clinic = await getAllClinic();
        if (clinic && clinic.errCode === 0) {
            this.setState({
                dataClinic: clinic.data
            })
        }
    }
    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`);
        }
    }
    render() {
        let { dataClinic } = this.state;
        console.log("dataClinic: ", dataClinic)
        return (
            <React.Fragment>
                <div className='Section HealthFacility'>
                    <div className='section-content '>
                        <div className='section-content-header'>
                            <div className='section-header-name'>Cơ sở y tế nổi bật</div>
                            <div className='section-header-navi'>Tìm kiếm</div>
                        </div>
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.map((item, index) => {
                                return (
                                    <div className='section-list-ck HealthFacility-section-list-ck' key={index} onClick={() => this.handleViewDetailClinic(item)}>
                                        <div className='section-list'>
                                            <div className='section-list-img '>
                                                <img className='HealthFacility-section-list-img' src={item.image}
                                                    width="80px" height="80px" />
                                            </div>
                                            <div className='section-list-name'>{item.name}</div>
                                        </div>
                                    </div>
                                )
                            })}

                        </Slider>
                    </div>
                </div >
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HealthFacility));
