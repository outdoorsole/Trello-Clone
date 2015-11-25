(function() {
  'use strict';

  angular.module('mytodo')
    .factory('ItemService', ['$http', '$q', function($http, $q) {
      var _currentItem = 0;
      var service = {
        getItems: getItems,
        createItem: createItem
      };

    // Check code: return only the data
    // Set the title and item in the controller
    function getItems (listId) {
      var deferred = $q.defer();
      $http.get('api/items/' + listId)
        .success(function (returnedItems){
          console.log('These are the returnedItems: ', returnedItems);
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
      console.log('This is the listId: ', listId);
      console.log('This is the formData: ', formData)
      $http.post('/api/item/create/' + listId, formData)
        .success(function(createdItem) {
          console.log('This is the createdItem: ', createItem);
          console.log('This is the formData after being created: ', formData);
          deferred.resolve(createdItem.item_name);
        })
        .error(function (data){
          deferred.reject('Error: ', data);
          console.log('Error: ', data);
        });
        return deferred.promise;
    }

    // function removeItem (itemId) {
    //   $http.post('/api/item/delete/' + itemId)
    //     .success(function(data) {
    //       vm.items = data;
    //       $log.log(data);
    //     })
    //     .error(function(data) {
    //       $log.log('Error: ' + data);
    //     });
    // };

    return service;
  }])
})();

