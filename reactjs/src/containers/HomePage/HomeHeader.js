import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./HomeHeader.scss";
import { FormattedMessage } from 'react-intl'; // fomat language
import { LANGUAGE } from '../../utils'; // vi or en
import { changeLanguage } from '../../store/actions'; // change language
import { withRouter } from 'react-router';
class HomeHeader extends Component {
    // change language
    changeLanguage = (language) => {
        // fire redux event: action
        this.props.changeLanguageApp(language); // prop bettween redux and react
    }
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    }
    render() {
        let language = this.props.language; // lấy ngôn loai ngôn ngữ từ redux
        return (

            <React.Fragment>
                {/* header */}
                <div className='home-header-container   '>
                    <div className='home-header-content'>
                        <div className='home-header-left'>
                            <div className='bars'><i className='fas fa-bars'></i></div>
                            <div className='logo-img' onClick={() => this.returnToHome()}></div>
                        </div>
                        <div className='home-header-center'>
                            <div className='child-content'>
                                <div className='child-content-name'><FormattedMessage id="homeheader.specialty" /></div>
                                <div className='child-content-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div className='child-content-name'><FormattedMessage id="homeheader.medicalfacilities" /></div>
                                <div className='child-content-title'><FormattedMessage id="homeheader.choosehospital" /></div>
                            </div>
                            <div className='child-content'>
                                <div className='child-content-name'><FormattedMessage id="homeheader.doctor" /></div>
                                <div className='child-content-title'><FormattedMessage id="homeheader.choosegooddoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div className='child-content-name'><FormattedMessage id="homeheader.exampaacket" /></div>
                                <div className='child-content-title'><FormattedMessage id="homeheader.generalexamination" /></div>
                            </div>
                        </div>
                        <div className='home-header-right'>
                            <div className='support'>
                                <i className='fas fa-question-circle'></i> <FormattedMessage id="homeheader.help" />
                            </div>
                            <div className='language'>
                                {/** Chuyển đổi ngôn ngữ */}
                                <div className={language === LANGUAGE.VI ? "language-vi active" : "language-vi"}><span onClick={() => { this.changeLanguage(LANGUAGE.VI) }}>VI</span></div>
                                <div className={language === LANGUAGE.EN ? "language-en active" : "language-en"}><span onClick={() => { this.changeLanguage(LANGUAGE.EN) }}>EN</span></div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* Banner */}
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='banner-container'>
                            <div className='banner-header'>
                                <div className='banner-header-name'><FormattedMessage id="banner.medicalfoundation" /></div>
                                <div className='banner-header-title'><FormattedMessage id="banner.healthcare" /></div>
                            </div>
                            <div className='banner-search'>
                                <div className='banner-search-content'>
                                    <i className='fas fa-search'></i>
                                    <input type='text' placeholder='Nhập để tìm kiếm' name='search' />
                                </div>
                            </div>
                            <div className='banner-footer'>
                                <div className='banner-footer-content'>
                                    <div className='banner-footer-child'>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon1'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.specialist" /></div>
                                    </div>
                                    <div className='banner-footer-child'>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon2'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.telemedicine" /></div>
                                    </div>
                                    <div className='banner-footer-child'>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon3'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.generalsexam" /></div>
                                    </div>
                                    <div className='banner-footer-child'>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon4'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.medicaltest" /></div>
                                    </div>
                                    <div className='banner-footer-child'>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon5'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.mentalhealth" /></div>
                                    </div>
                                    <div className='banner-footer-child'>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon6'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.dentalexam" /></div>
                                    </div>
                                    <div className='banner-footer-child'>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon7'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.surgicalpacket" /></div>
                                    </div>
                                    <div className='banner-footer-child'>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon8'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.healthylivedibet" /></div>
                                    </div>
                                    <div className='banner-footer-child'>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon9'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.healthtest" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}


const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => // fire event redux
{
    return {
        changeLanguageApp: (language) => dispatch(changeLanguage(language)) // truyền action
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader)); // kết nối redux và react
