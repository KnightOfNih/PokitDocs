(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('physicianService', ['$http', '$q', physicianService]);

    function physicianService($http, $q) {

        var base = 'physician';

        function path(x) {
            return (x || x == 0) ? (base + '/' + x) : base;
        }

        function action(x, id){
            var deferred = $q.defer();
            x(path(id))
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function read(id){
            return action($http.get, id);
        }

        return {
          read: read
        };
    }

})();
