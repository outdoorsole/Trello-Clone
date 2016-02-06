(function() {
  'use strict';

  angular.module('mytodo')
    .factory('ListService', ListService);

  ListService.$inject = ['$http', '$q', '$log'];

  function ListService($http, $q, $log) {
    var service = {
      getLists: getLists,
      createList: createList,
      removeList: removeList,
      updateList: updateList
    };

    function getLists (boardId) {
      var deferred = $q.defer();
      $http.get('api/lists/' + boardId)
        .success(function (returnedLists){
          deferred.resolve(returnedLists);
        })
        .error(function (data){
          deferred.reject('Error: ', data);
          $log.log('Error: ', data);
        });
        return deferred.promise;
    }

    function createList(boardId, formData) {
      var deferred = $q.defer();
      $http.post('/api/lists/create/' + boardId, formData)
        .success(function(createdList) {
          deferred.resolve(createdList);
        })
        .error(function (data){
          deferred.reject('Error: ', data);
          $log.log('Error: ', data);
        });
        return deferred.promise;
    }

    function removeList (listId) {
      var deferred = $q.defer();
      $http.post('/api/lists/delete/' + listId)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
        });
        return deferred.promise;
    }

    function updateList (listId, listName) {
      var deferred = $q.defer();
      $http.post('/api/lists/update/' + listId + '?list_name=' + listName)
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
