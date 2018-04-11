'use strict';

module.exports = function(Profile) {
  Profile.observe('before save', function setAutoData(context, next) {
        if (context.instance) {
                context.instance.userId = context.options.accessToken.userId;
        }
        next();
    });

};
