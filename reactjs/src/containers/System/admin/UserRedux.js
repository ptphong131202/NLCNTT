import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'; // fomat language
import { LANGUAGE } from '../../../utils'; // vi or en
import { changeLanguage } from '../../../store/actions'; // change language
import { getAllcodeService } from '../../../services/userService';

import { connect } from 'react-redux';
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
            genderArr: []
        };
    }

    async componentDidMount ()
    {
        try
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
        }
    }


    render ()
    {
        let genders = this.state.genderArr;
        let language = this.props.language;
        return (
            <div className="user-redux-container">
                <div className="title" >User Redux</div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='col-8 mx-auto'>
                            <h3><FormattedMessage id="manage-user.adduser" /></h3>
                            <form className='py-3 px-5 row'>
                                <div className="form-group pt-2 col-6">
                                    <label for="email">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Email" />
                                </div>
                                <div className="form-group pt-2 col-6">
                                    <label for="password"><FormattedMessage id="manage-user.password" /></label>
                                    <input type="password" className="form-control" id="password" placeholder="Password" />
                                </div>

                                <div className="form-group pt-2 col-6">
                                    <label for="firstname"><FormattedMessage id="manage-user.firstname" /></label>
                                    <input type="text" className="form-control" id="firstname" placeholder="Họ tên đệm" />
                                </div>
                                <div className="form-group pt-2 col-6">
                                    <label for="lastname"><FormattedMessage id="manage-user.lastname" /></label>
                                    <input type="text" className="form-control" id="lastname" placeholder="Tên" />
                                </div>
                                <div className="form-group pt-2 col-3">
                                    <label for="phonenumber"><FormattedMessage id="manage-user.phonenumber" /></label>
                                    <input type="text" className="form-control" id="phonenumber" placeholder="Tên" />
                                </div>
                                <div className="form-group pt-2 col-9">
                                    <label for="address"><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text" className="form-control" id="address" placeholder="Tên" />
                                </div>

                                <div className="form-group pt-2 col-3">
                                    <label for="inputState"><FormattedMessage id="manage-user.gender-name" /></label>
                                    <select id="inputState" className="form-control">
                                        {genders && genders.length > 0 && genders.map( ( item, index ) =>
                                        {
                                            return (
                                                <option key={index}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        } )}
                                    </select>
                                </div>
                                <div className="form-group pt-2 col-3">
                                    <label for="inputState"><FormattedMessage id="manage-user.position" /></label>
                                    <select id="inputState" className="form-control">
                                        <option selected>Choose...</option>
                                        <option>male</option>
                                        <option>Female</option>
                                        <option>other</option>
                                    </select>
                                </div>
                                <div className="form-group pt-2 col-3">
                                    <label for="Gender">RoleID</label>
                                    <select id="Gender" className="form-control">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div className="form-group pt-2 col-3">
                                    <label for="Gender"><FormattedMessage id="manage-user.image" /></label>
                                    <input type="file" className="form-control" id="address" placeholder="Tên" />
                                </div>

                                <p className='text-center pt-3'><button type="submit" className="btn btn-primary"><FormattedMessage id="manage-user.add" /></button></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        changeLanguageApp: ( language ) => dispatch( changeLanguage( language ) ) // truyền action
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( UserRedux );
