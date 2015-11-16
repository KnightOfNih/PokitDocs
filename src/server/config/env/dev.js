'use strict';

var port            = '3000',
    domain          = 'http://localhost';

module.exports = {

    getPort : function(){
        return port;
    },
    getDomain : function(){
        return domain + ":" + port;
    }
};