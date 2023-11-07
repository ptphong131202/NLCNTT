import specialtyService from "../services/specialtyService";
let createNewSpecialty = async (req, res) => {
    try {
        let doctors = await specialtyService.createSpecialty(req.body);
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

module.exports = {
    createNewSpecialty: createNewSpecialty
}