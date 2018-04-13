'use strict';

module.exports = function(Document) {


/*
  Document.observe('before save', function setAutoData(context, next) {
        if (context.instance) {
                context.instance.userId = context.options.accessToken.userId;
        }
        next();
    });
*/

  Document.remoteMethod('analyse',{
      accepts:{
      arg:"link",
      type:"object",
      default:{
        "url":"string"
      },
      http:{
        source:"body"
      },
      description:"picture url",
      required:"true"},
      description:"OCR",
      http:{path:"/analyse/",verb:"post"},
      returns:{arg:"response",type:"object"}
    });

    Document.analyse  = function(url,callback){
      console.time("analyse")
      var Tesseract = require('tesseract.js')
      var request = require('request')
      var sharp = require('sharp')
      sharp.cache(false)
      var fs = require('fs')
      var filename = 'pic.png'
      request(url).pipe(fs.createWriteStream(filename)).on('close', function() {
        console.log(url, 'saved to', filename)
        console.log("improving image quality...")
        sharp(filename)
          .resize(1024)
      //    .blur()
          .threshold()
          .sharpen()
          .toBuffer()
          .then( data => {
           console.log("resize , scale , toBuffer ...");
           console.time("tesseract")
           Tesseract.recognize(data,{lang:"fra"})
            .progress(function  (p) { console.log('progress', p)  })
            .catch(err => console.error(err))
            .then(function (result) {
              var response = result.text
              console.log(result.text)
              callback(null,response)
              console.timeEnd("tesseract")
              console.timeEnd("analyse")
          })
          .catch( err => {} )
          })
      })
    }
};
