(function() {
  'use strict';

  angular.module('mytodo')
    .factory('ItemService', ['$http', '$q', function($http, $q) {
      var _currentItem = 0;
      var service = {
        getItems: getItems,
        createItem: createItem,
        removeItem: removeItem
      };

    // Check code: return only the data
    // Set the title and item in the controller
    function getItems (listId) {
      var deferred = $q.defer();
      $http.get('api/items/' + listId)
        .success(function (returnedItems){
          deferred.resolve(returnedItems);
        })
        .error(function (data){
          deferred.reject('Error: ', data);
          console.log('Error: ', data);
        });
        return deferred.promise;
      }

    // function setItem () {
    //   _currentItem = item;
    //   return this.getItem();
    // }

    function createItem(listId, formData) {
      var deferred = $q.defer();
      $http.post('/api/item/create/' + listId, formData)
        .success(function(createdItem) {
          deferred.resolve(createdItem);
        })
        .error(function (data){
          deferred.reject('Error: ', data);
          console.log('Error: ', data);
        });
        return deferred.promise;
    }

    function removeItem (itemId) {
      var deferred = $q.defer();
      console.log('This is itemId in item service: ', itemId);
      $http.post('/api/item/delete/' + itemId)
        .success(function(data) {
          console.log('This is the data in item_service: ', data);
          deferred.resolve(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
        return deferred.promise;
    };

    return service;
  }])
})();

