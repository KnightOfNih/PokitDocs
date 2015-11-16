'use strict';

var port            = '3000',
    domain          = 'http://localhost';

module.exports = {

    getPort : function(){
        return port;
    },
    getReturnUrl : function(){
        return domain + ":" + port + "/auth/intuit/return";
    },
    getDomain : function(){
        return domain + ":" + port;
    }
};