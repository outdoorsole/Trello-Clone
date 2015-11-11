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
        $scope.title = "My List of Items";
        console.log('I got the data I requested');
        console.log('--------------------------');
        console.log('This is $scope.items: ', $scope.items);
        $scope.items = data;
        console.log('--------------------------');
        console.log('This is $scope.items: ', $scope.items);
      })

    $scope.createItem = function () {
      console.log('This is inside of createItem: ');
      console.log('This is formData: ', $scope.formData);
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
      console.log('This is inside of removeTodo: ');
      console.log('This is formData: ', $scope.formData);
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
      console.log('This is inside of updateTodo: ');
      console.log('This is the item_name: ', item_name);
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
