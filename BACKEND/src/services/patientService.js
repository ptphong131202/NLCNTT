import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';
import emailservice from './EmailService';
let postPatientBookingOppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email ||
                !data.doctorId ||
                !data.date ||
                !data.timeType ||
                !data.fullName ||
                !data.timeString ||
                !data.doctorName) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required paramiter!"
                })
            }
            else {


                await emailservice.sendSimpleEmail({
                    recieverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: "https://bookingcare.vn/",
                })

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R3"
                    }
                });
                resolve({
                    errCode: 0,
                    errMessage: "Save infor doctor successfully!"
                });
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientID: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            patientID: user[0].id,
                            doctorId: data.doctorId,
                            date: data.date,
                            timeType: data.timeType,
                        }

                    })
                }
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