import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
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

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required paramiter!"
                })
            }
            else {
                let schedule = data.arrSchedule;
                console.log("data.date", data.date)
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                console.log("schedule:", schedule)
                /*  await db.Schedule.bulkCreate(schedule); */

                let existing = await db.Schedule.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date: data.date
                    },
                    attributes: ["timeType", "date", "doctorId", "maxNumber"],
                    raw: true,
                })
                console.log("existing 1", existing)
                if (existing && existing.length > 0) {
                    existing = existing.map(item => {
                        if (!isNaN(Date.parse(item.date))) {
                            item.date = new Date(item.date).getTime();
                        }
                        return item;
                    })
                }
                console.log("existing :", existing)
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date;
                });
                console.log("toCreate", toCreate)
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }
                resolve({
                    errCode: 0,
                    errMessage: "Bulk create schedule success!"
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

let getScheduleDoctorDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required paramiter!"
                })
            }

            else {
                console.log("doctorId: ", doctorId, date)
                let data = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    }
                })

                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
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
    getDetialDoctorbyid: getDetialDoctorbyid,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorDate: getScheduleDoctorDate

}