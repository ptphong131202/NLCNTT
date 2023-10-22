import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "./ProfessionalDoctor.scss";

import ImageProfessionalDoctor from "../../../assets/113208-cot-song.jpg"

class ProfessionalDoctor extends Component
{

    render ()
    {
        return (
            <React.Fragment>
                <div className='Section ProfessionalDoctor'>
                    <div className='section-content '>
                        <div className='section-content-header'>
                            <div className='section-header-name'>Bác sĩ chuyên nghiệp nổi bật</div>
                            <div className='section-header-navi'>Tìm kiếm</div>
                        </div>
                        <Slider {...this.props.settings}>

                            <div className='section-list-ck' >
                                <div className='section-list imgProfessionalDoctor'>
                                    <div className='section-list-img'>
                                        <img className='imgProfessionalDoctor' src={ImageProfessionalDoctor} />
                                    </div>
                                    <div className='section-list-name imgProfessionalDoctor-name'>Tai mũi họng 9</div>
                                </div>
                            </div>
                            <div className='section-list-ck' style="width: 220px">
                                <div className='section-list imgProfessionalDoctor'>
                                    <div className='section-list-img'>
                                        <img className='imgProfessionalDoctor' src={ImageProfessionalDoctor} />
                                    </div>
                                    <div className='section-list-name imgProfessionalDoctor-name'>Tai mũi họng 9</div>
                                </div>
                            </div>
                            <div className='section-list-ck' style="width: 220px">
                                <div className='section-list imgProfessionalDoctor'>
                                    <div className='section-list-img'>
                                        <img className='imgProfessionalDoctor' src={ImageProfessionalDoctor} />
                                    </div>
                                    <div className='section-list-name imgProfessionalDoctor-name'>Tai mũi họng 9</div>
                                </div>
                            </div>
                            <div className='section-list-ck' style="width: 220px">
                                <div className='section-list imgProfessionalDoctor'>
                                    <div className='section-list-img'>
                                        <img className='imgProfessionalDoctor' src={ImageProfessionalDoctor} />
                                    </div>
                                    <div className='section-list-name imgProfessionalDoctor-name'>Tai mũi họng 9</div>
                                </div>
                            </div>
                            <div className='section-list-ck' style="width: 220px">
                                <div className='section-list imgProfessionalDoctor'>
                                    <div className='section-list-img'>
                                        <img className='imgProfessionalDoctor' src={ImageProfessionalDoctor} />
                                    </div>
                                    <div className='section-list-name imgProfessionalDoctor-name'>Tai mũi họng 9</div>
                                </div>
                            </div>
                            <div className='section-list-ck' style="width: 220px">
                                <div className='section-list imgProfessionalDoctor'>
                                    <div className='section-list-img'>
                                        <img className='imgProfessionalDoctor' src={ImageProfessionalDoctor} />
                                    </div>
                                    <div className='section-list-name imgProfessionalDoctor-name'>Tai mũi họng 9</div>
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

export default connect( mapStateToProps, mapDispatchToProps )( ProfessionalDoctor );
