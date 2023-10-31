import db from '../models/index';

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                order: [["createdAt", "DESC"]],
                where: { roleId: "R2" },
                attribute: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attribute: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attribute: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })
            console.log("check user 222: ", users)
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: "R2" },
                attribute: {
                    exclude: ["password", "image"]
                }
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        }
        catch (e) {
            reject(e);
        }
    })
}

let saveInforDoctor = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataInput.doctorId || !dataInput.contentHTML || !dataInput.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing paramiter!"
                })
            }
            else {
                await db.Markdowns.create({
                    contentHTML: dataInput.contentHTML,
                    ContentMarkdown: dataInput.contentMarkdown,
                    description: dataInput.description,
                    doctorId: dataInput.doctorId,
                })
                resolve({
                    errCode: 0,
                    errMessage: "Save information doctor success!"
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    saveInforDoctor: saveInforDoctor
}