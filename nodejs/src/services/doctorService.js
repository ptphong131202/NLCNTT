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

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
}