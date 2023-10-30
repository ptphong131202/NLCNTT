import db from '../models/index';

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        console.log(limitInput)
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                order: [["createdAt", "DESC"]],
                attribute: {
                    exclude: ['password', 'image']
                },
                where: { roleId: "R2" }
            })
            console.log(users)
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