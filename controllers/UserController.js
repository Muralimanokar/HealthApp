const express = require('express')
const userService = require('../services/UserService')
const jwt=require("jsonwebtoken")
const cron=require("node-cron")
const { response } = require('express')
const config=require('../config/config')
const router = express.Router()

router.post('/create',verifyToken, async function (req, res) {
    
    if(req.body.name == undefined || req.body.password == undefined || req.body.type == undefined){
        return res.status(400).send({error_msg:'input missing'});
    }

    var response = await userService.create(req.body)
    if(response == null){
        return res.status(400).send({error_msg:'User exist'});
    }
    res.send(response)
})

router.post('/login', async function (req, res) {
    
    if(req.body.name == undefined || req.body.password == undefined){
        return res.status(400).send({error_msg:'input missing'});
    }

    var response = await userService.login(req.body)
    jwt.sign({response}, 'secretkey', { expiresIn: '300000' }, (err, token) => {
        res.json({
          token
        });
      });
    if(response == null){
        return res.status(400).send({error_msg:'login failed'});
    }
    //res.send(response)
})

router.post('/:id/create_record',verifyToken, async function (req, res) {
    
    if(req.body.section == undefined || req.body.time_stamp == undefined || req.body.desc == undefined){
        return res.status(400).send({error_msg:'input missing'});
    }

    var response = await userService.createRecord(req.params.id,req.body)
    if(response == null){
        return res.status(400).send({error_msg:'Record creation failed'});
    }
    res.send(response)
})

router.post('/create_patient',verifyToken, async function (req, res) {
    
    if(req.body.name == undefined || req.body.gender == undefined || req.body.dob == undefined){
        return res.status(400).send({error_msg:'input missing'});
    }

    var response = await userService.createpatient(req.body)
    if(response == null){
        return res.status(400).send({error_msg:'patient creation failed'});
    }
    res.send(response)
})
router.post('/:userid/:patientid/create_usermapping',verifyToken, async function (req, res) {
    if(req.params.userid == undefined || req.params.patientid == undefined ){
        return res.status(400).send({error_msg:'input missing'});
    }
   

    var response = await userService.usermapping(req.params.userid,req.params.patientid)
    //console.log(response)
    if(response == null){
        return res.status(400).send({error_msg:'usermapping creation failed'});
    }
    res.send(response)
})
router.get('/:id/get_records',verifyToken, async function (req, res) {
    var response = await userService.getAllRecords(req.params.id)
    res.send(response)
})

router.get('/doctor_search',verifyToken, async function (req, res) {
    if(req.query.q == undefined){
        return res.status(400).send({error_msg:'input missing'});
    }

    var response = await userService.searchDoctor(req.query.q)
    res.send(response)
})


router.post('/attach_records/:id',verifyToken, async function (req, res) {
    
    if(req.params.id == undefined || req.body.records == undefined){
        return res.status(400).send({error_msg:'input missing'});
    }

    var response = await userService.attachToDoctor(req.params.id,req.body.records)
    if(response == null){
        return res.status(400).send({error_msg:'Record attach failed'});
    }
    res.send(response)
})


router.get('/get_shared_records/:id',verifyToken, async function (req, res) {
    var response = null
    if (req.params.id != undefined) {
        response = await userService.getSharedRecords(req.params.id)
    }
    res.send(response)
})


router.get('/get-all',verifyToken,async function(req,res){
    var tmp =await userService.getAll()
    res.send(tmp)
    console.log(tmp)
})
  

router.post('/email/:from/:to/:subject/:text/:time_stamp',async function(req,res){

    if(req.params.from == undefined || req.params.to == undefined || 
                    req.params.subject ==undefined|| req.params.text==undefined||
                                                req.params.time_stamp==undefined){
        return res.status(400).send({error_msg:'input missing'});
    }
    var response=await  userService.email(req.params.from,req.params.to,
                                                        req.params.subject,req.params.text,
                                                                            req.params.time_stamp)
        res.send(response)
})
router.post('/createtableemail/:from/:to/:subject/:text/:time_stamp',async function(req,res){

    if(req.params.from == undefined || req.params.to == undefined || 
                    req.params.subject ==undefined|| req.params.text==undefined||
                                                req.params.time_stamp==undefined){
        return res.status(400).send({error_msg:'input missing'});
    }
    var response=await  userService.createtableemail(req.params.from,req.params.to,
                                                        req.params.subject,req.params.text,
                                                                            req.params.time_stamp)
        res.send(response)
})
router.post('/createemailtext',async function (req, res) {
    
    if(req.body.text == undefined){
        return res.status(400).send({error_msg:'input missing'});
    }

    var response = await userService.textcreate(req.body)
   res.send(response)
})


async function verifyToken (req,res,next){
    var bearerHeader = req.headers['authorization'];
    var token;
    console.log(bearerHeader);
    req.authenticated = false;
    if (bearerHeader){
        console.log("11111");
        var bearer = bearerHeader.split(" ");
        token = bearer[1];
        console.log("tokenvisible",token)
        jwt.verify(token, 'secretkey', function (err, decoded){
            console.log("22222");
            if (err){
                console.log(err);
                req.authenticated = false;
                req.decoded = null;
            } else {
                console.log("33333");
                req.decoded = decoded;
                req.authenticated = true;
                next();
            }
           
        });
    }
    
}
module.exports = router