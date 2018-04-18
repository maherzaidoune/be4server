'use strict';

var config = require('../../server/config.json');
var path = require('path');
var app = require('../../server/server');



module.exports = function(User) {

  // add an existing doctor to user
    User.addDoctor  = function(doctorId,options,callback){
          const token = options && options.accessToken;
          const userId = token && token.userId;
          User.findOne({where:{id : userId}},function(err,user){
          app.models.Doctor.findOne({where: { id: doctorId}}, function(err, doctor) {
              if(err){
                console.log(err);
                throw err
              }
              console.log(user);
              console.log(doctor);
              user.doctors.create(doctor)
              callback(doctor);
             });
          })
}

// add an existing Healthstruct to user
  User.addHealthStruct  = function(healthStructId,options,callback){
        const token = options && options.accessToken;
        const userId = token && token.userId;
        User.findOne({where:{id : userId}},function(err,user){
        app.models.healthStruct.findOne({where: { id: healthStructId}}, function(err, h) {
            if(err){
              console.log(err);
              throw err
            }
            console.log(user);
            console.log(h);
            user.healthStructs.create(h)


            callback(h);
           });
        })
}

// remote hook for adding doctor  created via user to doctor  database

 User.observe('*.__post__healthStructs__', function(ctx, inst, next) {
    console.log("remote methode called");
    next()
  });


}
