
//const lib=require('./node_modules')
const mysql = require('mysql')
//let con=require('./config/config.js')
function testCall(){
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : "health_track",
    port: 3306
 } );

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM emailsendings", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
}

module.exports.test = testCall