import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./ManagePatient.scss";
import DatePicker from '../../../components/Input/DatePicker';
class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        };
    }

    componentDidUpdate = async (prevProps, prevState) => {


    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className='container mt-5 managePatient'>
                <div className='title mt-2'> QUẢN LÝ BỆNH NHÂN KHÁM BỆNH</div>
                <div className='form-group col-2'>
                    <label>Chọn ngày khám: </label>
                    <DatePicker className="form-control"
                        onChange={this.handleOnchangeDatePicker}
                        value={this.state.currentDate}

                    />
                </div>
                <table class="table table-bordered mt-3 bg-white">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                    </tbody>
                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);