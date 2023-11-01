import db from '../models/index';

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                order: [["createdAt", "DESC"]],
                where: { roleId: "R2" },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
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
                attributes: {
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
            if (!dataInput.doctorId || !dataInput.contentHTML || !dataInput.contentMarkdown || !dataInput.action) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing paramiter!"
                })
            }
            else {
                if (dataInput.action === 'CREATE') {
                    await db.Markdowns.create({
                        contentHTML: dataInput.contentHTML,
                        ContentMarkdown: dataInput.contentMarkdown,
                        description: dataInput.discription,
                        doctorId: dataInput.doctorId,
                    })
                }
                if (dataInput.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdowns.findOne({
                        where: {
                            doctorId: dataInput.doctorId
                        },
                        raw: false,
                    })

                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = dataInput.contentHTML;
                        doctorMarkdown.ContentMarkdown = dataInput.contentMarkdown;
                        doctorMarkdown.description = dataInput.discription;
                        await doctorMarkdown.save();
                    }
                }
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

let getDetialDoctorbyid = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required paramiter!"
                });
            } else {
                let user = await db.User.findOne({
                    where: { id: inputId },
                    attributes: {
                        exclude: ['password',]
                    },
                    include: [
                        { model: db.Markdowns, attributes: ['description', "contentHTML", "ContentMarkdown"] },
                        { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: false,
                    nest: true
                })
                if (user && user.image) {
                    user.image = new Buffer(user.image, 'base64').toString('binary');
                }

                resolve({
                    errCode: 0,
                    data: user
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
    saveInforDoctor: saveInforDoctor,
    getDetialDoctorbyid: getDetialDoctorbyid
}