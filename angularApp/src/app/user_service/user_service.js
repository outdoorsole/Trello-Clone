(function() {
  'use strict';

  angular.module('mytodo')
    .factory('UserService', ['$http', '$q', '$log', function($http, $q, $log) {
      var service = {
        getUsers: getUsers,
        createUsers: createUsers
      }

      function getUser(userId) {
        var deferred = $q.defer();
        $http.get('api/users')
          .success(function (returnedUsers) {
            deferred.resolve(returnedUsers);
          })
          .error(function (data) {
            deferred.reject('Error: ', data);
            $log.log('Error: ', data);
          });
          return deferred.promise;
        }

      function createUser(formData) {
        var deferred = $q.defer();
        $http.post('/api/user/create/', formData)
          .success(function(createdUser) {
            deferred.resolve(createdUser);
          })
          .error(function(data) {
            deferred.reject('Error: ', data);
            $log.log('Error: ' + data);
          });
          return deferred.promise;
      }

      return service;
    }]);
})();
