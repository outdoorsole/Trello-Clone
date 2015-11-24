(function() {
  'use strict';

  angular.module('mytodo')
    .factory('ItemService', ['$http', '$q', function($http, $q) {
      var _currentItem = 0;
      var service = {
        getItems: getItems
      };

    // Check code: return only the data
    // Set the title and item in the controller
    function getItems (listId) {
      // $http.get('/api/items/' + listId)
      // .success(function(response) {
      //   console.log('This is the response: ', response);
      //   return response;
      // })
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

    // service.setItem = function () {
    //   _currentItem = item;
    //   return this.getItem();
    // }

    return service;
  }])
})();

