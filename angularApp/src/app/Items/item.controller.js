(function() {
'use strict';

angular.module('mytodo')
  .controller('ItemController', function ($scope, $routeParams, $http) {

    console.log('This is $scope: ', $scope);
    console.log('This is $routeParams: ', $routeParams);
    console.log('This is $http: ', $http);

    // All of this is happening on load (until methods below)

    // This variable stores the form data coming through the front-end
    $scope.formData = {};

    // This variable stores the items list from the database
    $scope.items = [];

    // Get the list id from the route params
    $scope.listId = $routeParams.list_id;
    console.log('This is listId: ', $scope.listId);


    // get the list name from the route params
    $scope.listName = $routeParams.list_title;
    console.log('This is listName: ', $scope.listName);

    // when landing on the page, get all todos and show them

    $http.get('/api/items')
      .success(function(data) {
        $scope.items = data;
      })

    $scope.createItem = function () {
      $http.post('/api/items/create', $scope.formData)
        .success(function(data) {
          vm.items = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
      });
    };

    $scope.removeTodo = function (itemId) {
      $http.post('/api/items/delete/' + itemId)
        .success(function(data) {
          vm.items = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
        });
    };

    $scope.updateTodo = function (itemId, item_name) {
      $http.post('/api/items/update/' + itemId + '?item_name=' + item_name)
        .success(function(data) {
          vm.items = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
        });
    };
  })
})();
