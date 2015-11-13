(function() {
  'use strict';

  angular.module('mytodo')
    .factory('ListService', ['$http', '$q', function($http, $q) {
      var _currentList = 0;
      var service = {};
      var formData = {};

      service.getList = function(listId) {
        var deferred = $q.defer();
        $http.get('/api/lists/')
        .success(function(data) {
          vm.title = "My List of Items";
          vm.lists = data;
          deferred.resolve[{lists: data}];
        })
        .error(function(data) {
          deferred.reject('Error:' + data);
          console.log('Error:' + data);
        })
        return deferred.promise;
      }

      service.setList = function(list) {
        _currentList = list;
        return this.getList();
      }

      return service;
    }]);
})();
