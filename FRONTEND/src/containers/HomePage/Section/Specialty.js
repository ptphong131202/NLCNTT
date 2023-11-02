import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";


import ImageSpecialty from "../../../assets/112617-tai-mui-hong.jpg"

class Specialty extends Component
{

    render ()
    {
       
        return (
            <React.Fragment>
                <div className='Section specialty'>
                    <div className='section-content '>
                        <div className='section-content-header'>
                            <div className='section-header-name'>Chuyên khoa nổi bật</div>
                            <div className='section-header-navi'>Xem thêm</div>
                        </div>
                        <Slider {...this.props.settings}>

                            <div className='section-list-ck' >
                                <div className='section-list'>
                                    <div className='section-list-img'>
                                        <img className='' src={ImageSpecialty} />
                                    </div>
                                    <div className='section-list-name'>Tai mũi họng 9</div>
                                </div>
                            </div>
                            <div className='section-list-ck' style="width: 220px">
                                <div className='section-list'>
                                    <div className='section-list-img'>
                                        <img className='' src={ImageSpecialty} />
                                    </div>
                                    <div className='section-list-name'>Tai mũi họng 9</div>
                                </div>
                            </div>
                            <div className='section-list-ck' style="width: 220px">
                                <div className='section-list'>
                                    <div className='section-list-img'>
                                        <img className='' src={ImageSpecialty} />
                                    </div>
                                    <div className='section-list-name'>Tai mũi họng 9</div>
                                </div>
                            </div>
                            <div className='section-list-ck' style="width: 220px">
                                <div className='section-list'>
                                    <div className='section-list-img'>
                                        <img className='' src={ImageSpecialty} />
                                    </div>
                                    <div className='section-list-name'>Tai mũi họng 9</div>
                                </div>
                            </div>
                            <div className='section-list-ck' style="width: 220px">
                                <div className='section-list'>
                                    <div className='section-list-img'>
                                        <img className='' src={ImageSpecialty} />
                                    </div>
                                    <div className='section-list-name'>Tai mũi họng 9</div>
                                </div>
                            </div>
                            <div className='section-list-ck' style="width: 220px">
                                <div className='section-list'>
                                    <div className='section-list-img'>
                                        <img className='' src={ImageSpecialty} />
                                    </div>
                                    <div className='section-list-name'>Tai mũi họng 9</div>
                                </div>
                            </div>

                        </Slider>
                    </div>
                </div >
            </React.Fragment >
        );
    }

}

const mapStateToProps = state =>
{
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Specialty );
