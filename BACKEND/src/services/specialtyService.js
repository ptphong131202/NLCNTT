import db from '../models/index';

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data)
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                return reject({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            }
            else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,

                })

                resolve({
                    errCode: 0,
                    errMessage: "Create a new Specialty successfully!"
                })
            }


        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createSpecialty: createSpecialty
}