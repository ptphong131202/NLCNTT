import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import "./DetailDoctor.scss";
import { LANGUAGE } from "../../../utils"
import { getDetailInforDoctor } from '../../../services/userService';
class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let response = await getDetailInforDoctor(id);
            if (response && response.errCode === 0) {
                this.setState({
                    detailDoctor: response.data
                })
            }
            console.log("check response", response);
        }
    }
    render() {
        let { detailDoctor } = this.state;
        let { language } = this.props;
        let namevi = "";
        let namen = "";
        if (detailDoctor && detailDoctor.positionData) {

            namevi = `${detailDoctor.positionData.valueVi},  ${detailDoctor.firstName} ${detailDoctor.lastName}`
            namen = `${detailDoctor.positionData.valueEn},  ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='container doctor-detail'>
                    <div className='doctor-detail-container'>
                        <div className='intro-doctor'>
                            <div className='content-left'>
                                <img src={detailDoctor && detailDoctor.image ? detailDoctor.image : ""} alt='avatar' />
                            </div>
                            <div className='content-right'>
                                <div className='up'>
                                    {language === LANGUAGE.VI ? namevi : namen} </div>
                                <div className='down'>
                                    {detailDoctor.Markdown && detailDoctor.Markdown.description
                                        && <span> {detailDoctor.Markdown.description}
                                        </span>}
                                </div>
                            </div>
                        </div>
                        <div className='schedule'></div>
                        <hr />
                        <div className='detail-infor'>
                            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                                <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>
                                </div>}
                        </div>
                        <hr />
                        <div className='commet-doctor'></div>
                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);