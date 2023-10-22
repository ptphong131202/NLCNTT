import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HandBook.scss";
import ImageHandBook from "../../../assets/163557-dat-lich-cham-soc-wecare247.png";
class HandBook extends Component
{

    render ()
    {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
        };
        return (
            <React.Fragment>
                <div className='Section HandBook'>
                    <div className='section-content '>
                        <div className='section-content-header'>
                            <div className='section-header-name'>Cơ sở y tế nổi bật</div>
                            <div className='section-header-navi'>Tìm kiếm</div>
                        </div>
                        <Slider {...settings}>

                            <div className='section-list-ck section-list-handbook' >
                                <div className='section-list handbook'>
                                    <div className='section-list-img section-list-img-handbook'>
                                        <img className='' src={ImageHandBook} />
                                    </div>
                                    <div className='section-list-name section-list-name-handbook'>Đặt lịch chăm sóc sức khỏe tại nhà, tại viện cho người cao tuổi, người bệnh</div>
                                </div>
                            </div>
                            <div className='section-list-ck' style="width: 220px">
                                <div className='section-list handbook'>
                                    <div className='section-list-img section-list-img-handbook'>
                                        <img className='' src={ImageHandBook} />
                                    </div>
                                    <div className='section-list-name section-list-name-handbook'>Đặt lịch chăm sóc sức khỏe tại nhà, tại viện cho người cao tuổi, người bệnh</div>
                                </div>
                            </div>
                            <div className='section-list-ck' style="width: 220px">
                                <div className='section-list handbook'>
                                    <div className='section-list-img section-list-img-handbook'>
                                        <img className='' src={ImageHandBook} />
                                    </div>
                                    <div className='section-list-name section-list-name-handbook'>Đặt lịch chăm sóc sức khỏe tại nhà, tại viện cho người cao tuổi, người bệnh</div>
                                </div>
                            </div>
                            <div className='section-list-ck' style="width: 220px">
                                <div className='section-list handbook'>
                                    <div className='section-list-img section-list-img-handbook'>
                                        <img className='' src={ImageHandBook} />
                                    </div>
                                    <div className='section-list-name section-list-name-handbook'>Đặt lịch chăm sóc sức khỏe tại nhà, tại viện cho người cao tuổi, người bệnh</div>
                                </div>
                            </div>
                            <div className='section-list-ck' style="width: 220px">
                                <div className='section-list handbook'>
                                    <div className='section-list-img section-list-img-handbook'>
                                        <img className='' src={ImageHandBook} />
                                    </div>
                                    <div className='section-list-name section-list-name-handbook'>Đặt lịch chăm sóc sức khỏe tại nhà, tại viện cho người cao tuổi, người bệnh</div>
                                </div>
                            </div>
                            <div className='section-list-ck' style="width: 220px">
                                <div className='section-list handbook'>
                                    <div className='section-list-img section-list-img-handbook'>
                                        <img className='' src={ImageHandBook} />
                                    </div>
                                    <div className='section-list-name section-list-name-handbook'>Đặt lịch chăm sóc sức khỏe tại nhà, tại viện cho người cao tuổi, người bệnh</div>
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

export default connect( mapStateToProps, mapDispatchToProps )( HandBook );
