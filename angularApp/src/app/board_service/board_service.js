(function() {
  'use strict';

  angular.module('mytodo')
    .factory('BoardService', ['$http', '$q', '$log', function($http, $q, $log) {
      var service = {
        getBoards: getBoards
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
