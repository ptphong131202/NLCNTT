import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
/* import "./ProfileDoctor.scss"; */
import { LANGUAGE } from "../../../utils"
class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidUpdate = async (prevProps, prevState) => {


    }


    render() {
        return (<div>
            helbjhjhwfjhwf
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);