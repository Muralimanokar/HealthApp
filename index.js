const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
var job = require('./schedule')
const cron=require("node-cron")
const shell=require("shelljs")
const folder=require('file-system')
const vm=require('vm')

const userController = require('./controllers/UserController.js')
const db = require('./models')
const app = express()

app.use(cors({origin: 'http://localhost:8080'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Running healthy....')
})

app.use('/user', userController)

db.sequelize.sync()

//job.test()
cron.schedule("* * * * * *",function(){
    
   
   /* var data = folder.readFileSync('./schedule.js');
    const script = new vm.Script(data);
    script.runInThisContext();*/

    console.log('cron running')
     job.test()

})

app.listen(8080, () => {
    console.log('server started')
})