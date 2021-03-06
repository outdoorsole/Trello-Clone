(function() {
  'use strict';

  angular.module('mytodo')
  .factory('ItemService', ItemService);

  // $inject Property Annotation: an array of service names to inject to the controller.
  ItemService.$inject = ['$http', '$q', '$log'];

  function ItemService($http, $q, $log) {
      var service = {
        getItems: getItems,
        createItem: createItem,
        removeItem: removeItem,
        updateItem: updateItem
      };

    function getItems (listId) {
      var deferred = $q.defer();
      $http.get('api/items/' + listId)
        .success(function (returnedItems){
          deferred.resolve(returnedItems);
        })
        .error(function (data){
          deferred.reject('Error: ', data);
          $log.log('Error: ', data);
        });
        return deferred.promise;
    }

    function createItem(listId, formData) {
      var deferred = $q.defer();
      $http.post('/api/item/create/' + listId, formData)
        .success(function(createdItem) {
          deferred.resolve(createdItem);
        })
        .error(function (data){
          deferred.reject('Error: ', data);
          $log.log('Error: ', data);
        });
        return deferred.promise;
    }

    function removeItem (itemId) {
      var deferred = $q.defer();
      $http.post('/api/item/delete/' + itemId)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
        });
        return deferred.promise;
    }

    function updateItem (itemId, itemName) {
      var deferred = $q.defer();
      $http.post('/api/item/update/' + itemId + '?item_name=' + itemName)
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

