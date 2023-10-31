import doctorSevice from "../services/doctorService"

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let doctors = await doctorSevice.getTopDoctorHome(+limit);
        return res.status(200).json(doctors);
    }
    catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server!"
        })
    }
}

let getAllDoctor = async (req, res) => {
    try {
        let doctors = await doctorSevice.getAllDoctor();
        return res.status(200).json(doctors);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}
let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorSevice.saveInforDoctor(req.body);
        return res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    postInforDoctor: postInforDoctor
}