import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';
let postPatientBookingOppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required paramiter!"
                })
            }
            else {
                let use = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R3"
                    }
                });
                resolve(use);
            }
        }
        catch (e) {
            reject(e);
        }
    })
};


module.exports = {
    postPatientBookingOppointment: postPatientBookingOppointment
}