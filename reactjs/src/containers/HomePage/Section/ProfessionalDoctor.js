import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "./ProfessionalDoctor.scss";
import * as actions from "../../../store/actions";
import ImageProfessionalDoctor from "../../../assets/113208-cot-song.jpg"
import { LANGUAGE } from "../../../utils"
class ProfessionalDoctor extends Component {
    constructor(props) {
        super();
        this.state = {
            arrDoctor: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {

            this.setState({
                arrDoctor: this.props.topDoctorRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    render() {
        let arrDoctors = this.state.arrDoctor;
        let { language } = this.props;
        console.log("ckejwu: ", this.state.arrDoctor)
        return (
            <React.Fragment>
                <div className='Section ProfessionalDoctor'>
                    <div className='section-content '>
                        <div className='section-content-header'>
                            <div className='section-header-name'>Bác sĩ chuyên nghiệp nổi bật</div>
                            <div className='section-header-navi'>Tìm kiếm</div>
                        </div>
                        <Slider {...this.props.settings}>

                            {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                let namevi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`
                                let namen = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                return (<div className='section-list-ck' >
                                    <div className='section-list imgProfessionalDoctor'>
                                        <div className='section-list-img'>
                                            <img className='imgProfessionalDoctor' src={imageBase64} />
                                        </div>
                                        <div className='section-list-name imgProfessionalDoctor-name'>
                                            <div> {language === LANGUAGE.VI ? namevi : namen}</div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>);
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
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctorHome())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalDoctor);
