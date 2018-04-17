'use strict';

var config = require('../../server/config.json');
var path = require('path');



module.exports = function(User) {
  /*
  User.remoteMethod('addDoctor',{
      accepts:[
      {
      arg:"doctorId",
      type:"object",
      default:{
        "id":"number"
      },
      http:{
        source:"body"
      },
      description:"doctor id",
      required:"true"},{"arg": "options", "type": "object", "http": "optionsFromRequest"}],
      description:"add doctor  to user database",
      http:{path:"/addDoctor/",verb:"post"},
      returns:{arg:"put",type:"object"}
    });
    */
    User.addDoctor  = function(doctorId,options,callback){
      var app = require('../../server/server');
            //var db = app.dataSources.db;
          //  var  doctor = db.connector.collection('Doctor').find({where: {'_id': id}});
          //  db.connector.collection('User').update(
          //  { userId: "5acf5a49b14afa24f4f4227c" },
          //  { $push: { doctors : id }
          const token = options && options.accessToken;
          const userId = token && token.userId;
          User.findOne({where:{id : userId}},function(err,user){
          //  console.log(userId);
            app.models.Doctor.find({where: { id: doctorId}}, function(err, doctor) {
              if(err){
                console.log(err);
                throw err
              }
              //console.log(user.doctors());
              //console.log(doctor);

              /*User.updateAll(user,user.doctors.add(doctor),function(err,info){

              });
              */
              user.doctors().push(user.doctors())
              console.log(user);
              //user.doctors.add({"fullName":"maher"});

              callback(user.doctors(),doctorId);
            //  console.log(doctor);

             });
          })

}

}
