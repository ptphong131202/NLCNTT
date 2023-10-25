import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'; // fomat language
import { LANGUAGE } from '../../../utils'; // vi or en
import * as action from "../../../store/actions";
import { changeLanguage } from '../../../store/actions'; // change language
import { connect } from 'react-redux';
import down from "../../../assets/down.png";
import "./UserRedux.scss"

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class UserRedux extends Component
{
    // change language
    changeLanguage = ( language ) =>
    {
        // fire redux event: action
        this.props.changeLanguageApp( language ); // prop bettween redux and react
    }

    constructor ( props )
    {
        super( props );
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImg: "",
            isOpen: false

        };
    }

    componentDidUpdate ( prevProps, prevState, snapshot ) // so sanh prop hiện tại và prop trước đó
    {
        // gender
        if ( prevProps.genderRedux !== this.props.genderRedux )
        {
            this.setState( {
                genderArr: this.props.genderRedux
            } )
        }

        // position 
        if ( prevProps.positionRedux !== this.props.positionRedux )
        {
            this.setState( {
                positionArr: this.props.positionRedux
            } )
        }

        //role
        if ( prevProps.roleRedux !== this.props.roleRedux )
        {
            this.setState( {
                roleArr: this.props.roleRedux
            } )
        }
    }

    async componentDidMount ()
    {

        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        /* try
        {
            let res = await getAllcodeService( 'gender' );
            if ( res && res.errCode === 0 )
            {
                this.setState( {
                    genderArr: res.data
                } )
            }
        }
        catch ( err )
        {
            console.log( err );
        } */
    }

    // event in img for input file 
    handleOnchangeImg = ( event ) =>
    {
        let file = event.target.files[ 0 ];
        console.log( file );
        if ( file )
        {
            let objectUrl = URL.createObjectURL( file );
            this.setState( {
                previewImg: objectUrl
            } )
        }
    }

    openPreviewImage = () =>
    {
        if ( !this.state.previewImg ) return;
        this.setState( {
            isOpen: true
        } )
    }

    render ()
    {
        let genders = this.state.genderArr;
        let position = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        return (
            <div className="user-redux-container">
                <div className="title" >User Redux</div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='col-8 mx-auto'>
                            <h3><FormattedMessage id="manage-user.adduser" /></h3>
                            <div>{isLoadingGender === true ? "Loading Gender" : ""}</div>
                            <form className='py-3 px-5 row'>
                                <div className="form-group pt-2 col-6">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Email" />
                                </div>
                                <div className="form-group pt-2 col-6">
                                    <label htmlFor="password"><FormattedMessage id="manage-user.password" /></label>
                                    <input type="password" className="form-control" id="password" placeholder="Password" />
                                </div>

                                <div className="form-group pt-2 col-6">
                                    <label htmlFor="firstname"><FormattedMessage id="manage-user.firstname" /></label>
                                    <input type="text" className="form-control" id="firstname" placeholder="Họ tên đệm" />
                                </div>
                                <div className="form-group pt-2 col-6">
                                    <label htmlFor="lastname"><FormattedMessage id="manage-user.lastname" /></label>
                                    <input type="text" className="form-control" id="lastname" placeholder="Tên" />
                                </div>
                                <div className="form-group pt-2 col-3">
                                    <label htmlFor="phonenumber"><FormattedMessage id="manage-user.phonenumber" /></label>
                                    <input type="text" className="form-control" id="phonenumber" placeholder="Tên" />
                                </div>
                                <div className="form-group pt-2 col-9">
                                    <label htmlFor="address"><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text" className="form-control" id="address" placeholder="Tên" />
                                </div>

                                <div className="form-group pt-2 col-3 down-main">
                                    <label ><FormattedMessage id="manage-user.gender-name" /></label>
                                    <img src={down} />
                                    <select id="inputState" className="form-control">
                                        {genders && genders.length > 0 && genders.map( ( item, index ) =>
                                        {
                                            return (
                                                <option key={index}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        } )}
                                    </select>
                                </div>
                                <div className="form-group pt-2 col-3 down-main">
                                    <label ><FormattedMessage id="manage-user.position" /></label>
                                    <img src={down} />
                                    <select id="inputState" className="form-control">
                                        {position && position.length > 0 && position.map( ( item, index ) =>
                                        {
                                            return (
                                                <option key={index}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        } )}
                                    </select>
                                </div>
                                <div className="form-group pt-2 col-3 down-main">
                                    <label >RoleID</label>
                                    <img src={down} />
                                    <select id="inputState" className="form-control">
                                        {roles && roles.length > 0 && roles.map( ( item, index ) =>
                                        {
                                            return (
                                                <option key={index}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        } )}
                                    </select>
                                </div>
                                <div className="form-group pt-2 col-3">
                                    <label ><FormattedMessage id="manage-user.image" /></label>
                                    <div className='preview-img-container'>
                                        <input type="file" className="form-control" id="reviewImg" hidden
                                            onChange={( event ) => this.handleOnchangeImg( event )} />
                                        <label className='label_upload-img' htmlFor='reviewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                        <div className='reviewImage'
                                            style={{ backgroundImage: `url(${ this.state.previewImg })` }}
                                            onClick={() => this.openPreviewImage()}></div>
                                    </div>
                                </div>

                                <p className='text-center pt-3'><button type="submit" className="btn btn-primary"><FormattedMessage id="manage-user.add" /></button></p>
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && <Lightbox
                    mainSrc={this.state.previewImg}
                    onCloseRequest={() => this.setState( { isOpen: false } )}
                />}

            </div>
        )
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.position,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isloadingGender
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        getGenderStart: () => dispatch( action.fetchGenderStart() ),
        getPositionStart: () => dispatch( action.fetchPositionStart() ),
        getRoleStart: () => dispatch( action.fetchRoleStart() ),
        /* processLogout: () => dispatch( actions.processLogout() ),*/
        changeLanguageApp: ( language ) => dispatch( action.changeLanguage( language ) ) // truyền action 
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( UserRedux );
