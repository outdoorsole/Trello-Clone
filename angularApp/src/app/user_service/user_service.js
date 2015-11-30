(function() {
  'use strict';

  angular.module('mytodo')
    .factory('UserService', ['$http', '$q', '$log', function($http, $q, $log) {
      var service = {
        getUsers: getUsers
      }

      function getBoards (userId) {
        var deferred = $q.defer();
        $http.get('api/boards/' + userId)
          .success(function (returnedBoards) {
            deferred.resolve(returnedBoards);
          })
          .error(function (data) {
            deferred.reject('Error: ', data);
            $log.log('Error: ', data);
          });
          return deferred.promise;
        }

      return service;
    }]);
})();
