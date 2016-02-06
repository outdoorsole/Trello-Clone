(function() {
  'use strict';

  angular.module('mytodo')
    .factory('UserService', UserService);

  // $inject Property Annotation: an array of service names to inject to the controller.
  UserService.$inject = ['$http', '$q', '$log'];

  function UserService($http, $q, $log) {
    var service = {
      getUsers: getUsers,
      createUser: createUser,
      removeUser: removeUser,
      updateUser: updateUser
    }

    function getUsers() {
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
      $http.post('/api/user/create', formData)
        .success(function(createdUser) {
          deferred.resolve(createdUser);
        })
        .error(function(data) {
          deferred.reject('Error: ', data);
          $log.log('Error: ' + data);
        });
        return deferred.promise;
    }

    function removeUser (userId) {
      var deferred = $q.defer();
      $http.post('/api/user/delete/' + userId)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(data) {
        $log.log('Error: ' + data);
      });
      return deferred.promise;
    }

    function updateUser(userId, userName) {
      var deferred = $q.defer();
      $http.post('/api/user/update/' + userId + '?user_name=' + userName)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(data) {
        $log.log('Error: ' + data);
      });
      return deferred.promise;
    }

    return service;
  }
})();
