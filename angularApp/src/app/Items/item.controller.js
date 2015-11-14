(function() {
'use strict';

angular.module('mytodo')
  .controller('ItemController', function ($scope, $http) {

    // All of this is happening on load (until methods below)

    // This variable stores the form data coming through the front-end
    $scope.formData = {};

    // This variable stores the items list from the database
    $scope.items = [];

    // when landing on the page, get all todos and show them

    $http.get('/api/items')
      .success(function(data) {
        $scope.items = data;
      })

    $scope.createItem = function () {
      $http.post('/api/items/create', $scope.formData)
        .success(function(data) {
          $scope.items = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
      });
    };

    $scope.removeTodo = function (itemId) {
      $http.post('/api/items/delete/' + itemId)
        .success(function(data) {
          $scope.items = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.updateTodo = function (itemId, item_name) {
      $http.post('/api/items/update/' + itemId + '?item_name=' + item_name)
        .success(function(data) {
          $scope.items = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
  })
})();
