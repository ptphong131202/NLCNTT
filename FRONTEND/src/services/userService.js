import axios from '../axios'

// function handle login
const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password }); // request len server
}

const getAllUser = (id) => {
    return axios.get(`api/get-all-users?id=${id}`); // request len server
}

const createNewUserService = (data) => {
    return axios.post(`api/create-new-user`, data);
}

const deleteUserService = (userid) => {
    return axios.delete(`api/delete-user`,
        {
            data: { id: userid },
        });
}

const editUserService = (inputData) => {
    return axios.put(`api/edit-user`, inputData);
}
const getAllcodeService = (inputData) => {
    return axios.get(`/api/allcode?type=${inputData}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/get-top-doctor-home?limit=${limit}`);

}

const getAllDoctor = () => {
    return axios.get(`/api/getAllDoctor`);
}
const saveDetailDoctor = (data) => {
    return axios.post(`api/save-infor-doctor`, data);
}

const getDetailInforDoctor = (id) => {
    return axios.get(`api/get-detial-doctor-by-id?id=${id}`);
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`api/bulk-create-schedule`, data);
}

const getScheduleDoctorById = (inputId, date) => {
    return axios.get(`api/get-schedule-doctor-by-id?doctorId=${inputId}&date=${date}`);
}
const getExtraInforDoctorById = (id) => {
    return axios.get(`api/get-extra-infor-doctor-by-id?doctorId=${id}`);
}

const getProfileDoctorById = (id) => {
    return axios.get(`api/get-profile-doctor-by-id?doctorId=${id}`);
}
export {
    handleLoginApi,
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllcodeService,
    getTopDoctorHomeService,
    getAllDoctor,
    saveDetailDoctor,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorById,
    getExtraInforDoctorById,
    getProfileDoctorById
};