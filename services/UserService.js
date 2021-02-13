const db = require('../models')

const user = db.user
const record = db.record
const sharedRecord = db.sharedRecord
const patient=db.patient
const user_role_mapping=db.user_role_mapping
const emailsending=db.emailsending
const emailtext=db.emailtext

const Sequelize = require('sequelize');
const jwt=require('jsonwebtoken')
const nodemailer=require("nodemailer")
const { response } = require('express')
const Op = Sequelize.Op;

exports.create = async (data) => {
    var usertmp = {
        name: data.name,
        password: data.password,
        type: data.type
    }

    try {
        usertmp = await user.create(usertmp);
        delete usertmp.dataValues.password
        //console.log(usertmp)
    } catch (e) {
        console.log(e)
        usertmp = null
    }

    //this should be gracefully handled using queue
    return usertmp
}

exports.login = async (data) => {
    var userTmp = await user.findOne({
        where: {
            name: data.name,
            password: data.password
        },
        attributes: { exclude: ['password'] }
    })

    //console.log(userTmp)
    /*if (userTmp) {
        const token = jwt.sign({ sub: userTmp.id, type: user.type }, config.secret);
        //const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
            
        };
    }*/
    return userTmp
}

exports.createRecord = async (userId, data) => {
    var recordTmp = {
        user_id: userId,
        section: data.section,
        time_stamp: data.time_stamp,
        desc: data.desc
    }

    try {
        recordTmp = await record.create(recordTmp);
        //console.log(usertmp)
    } catch (e) {
        console.log(e)
        recordTmp = null
    }
    return recordTmp
}
exports.createpatient = async (data) => {
    var patientTmp = {
        name: data.name,
        gender: data.gender,
        dob: data.dob
    }

    try {
        patientTmp = await patient.create(patientTmp);
        //console.log(usertmp)
    } catch (e) {
        console.log(e)
        recordTmp = null
    }
    return patientTmp
}
exports.usermapping = async (userId, patientId) => {
    var mappingTmp = {
        user_id: userId,
       patient_id:patientId
    }
//console.log(mappingTmp)
    try {
        mappingTmp = await user_role_mapping.create(mappingTmp);
        //console.log(usertmp)
    } catch (e) {
        console.log(e)
        mappingTmp = null
    }
    return mappingTmp
}

exports.getAllRecords = async (userId) => {
    var records = await record.findAll({
        where: {
            user_id: userId,
        }
    })
    //console.log(userTmp)
    return records
}


exports.searchDoctor = async (name) => {
    var records = await user.findAll({
        where: {
            name: {
                [Op.like]: '%' + name + '%'
            },
            type: 'doc'
        },
        attributes: { exclude: ['password'] }
    })
    //console.log(userTmp)
    return records
}

exports.attachToDoctor = async (id, records) => {
    var userTmp = await user.findOne({
        where: {
            id: id,
            type: 'doc'
        },
        attributes: { exclude: ['password'] }
    })

    var count = 0;
    if (userTmp != null) {
        for (var pos in records) {
            //console.log(records[pos])
            try {
                await sharedRecord.create({ user_id: id, record_id: records[pos].id })
                count++
            } catch (e) {
                console.log(e)
            }
        }
    }
    //console.log(userTmp)
    return { 'record_attached_count': count }
}

exports.getSharedRecords = async (id) => {
    var tSharedRecords = await sharedRecord.findAll({
        where: {
            user_id: id
        }
    })

    var output = []

    for (var pos in tSharedRecords) {
        var item = tSharedRecords[pos]

        var tRecord = await record.findOne({
            where: {
                id: item.record_id,
            }
        })

        if (tRecord != null) {
            var sPos = findRecordPosition(output, tRecord.user_id)
            if (sPos == -1) {

                var tUser = await user.findOne({
                    where: {
                        id: tRecord.user_id,
                    },
                    attributes: { exclude: ['password'] }
                })
                output.push({ 'user': tUser })

                sPos = output.length - 1
                output[sPos]['records'] = []
            }

            output[sPos]['records'].push(tRecord)
        }
    }

    return output
}


function findRecordPosition(output, userId) {
    var pos = -1

    for (var i in output) {
        var item = output[i]
        if (item['user']['id'] == userId) {
            pos = i
            break;
        }
    }

    return pos
}




exports.getAll = async  () => {
    

        return user.findAll()
  
}
exports.email = async (from, to,subject,text,time_stamp) => {
    var transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:"587",
        service: 'gmail',
        auth: {
          user: 'muralimano.raj@gmail.com',
          pass: 'Murali15091998',
        }
      });
      
      
      
      var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text,
        time_stamp:time_stamp
      };
      
     mailOptions= await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
   return mailOptions   
}

exports.createtableemail = async (from, to,subject,text,time_stamp) => {
    {
        var emailTmp = {
            from: from,
            to: to,
            subject: subject,
            emailtext_text:text,
            time_stamp:time_stamp
        }
    
        try {
            emailTmp = await emailsending.create(emailTmp);
            //console.log(usertmp)
        } catch (e) {
            console.log(e)
            emailTmp = null
        }
        return emailTmp
    }

}
exports.textcreate = async (data) => {
    var emailTmp = {
        text: data.text,
       
    }
//console.log(mappingTmp)
    try {
        emailTmp = await emailtext.create(emailTmp);
        //console.log(usertmp)
    } catch (e) {
        console.log(e)
        emailTmp = null
    }
    return emailTmp
}
