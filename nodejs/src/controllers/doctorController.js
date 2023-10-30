import doctorSevice from "../services/doctorService"

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    console.log("Limit: ", limit)
    try {
        let doctors = await doctorSevice.getTopDoctorHome(+limit);
        return res.status(200).json(doctors);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server!"
        })
    }
}


module.exports = {
    getTopDoctorHome: getTopDoctorHome,
}