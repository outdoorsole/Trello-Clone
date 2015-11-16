(function() {
'use strict';

angular.module('mytodo')
  .controller('ItemController', function ($routeParams, $http, $log) {

    var vm = this;
    console.log('This is vm: ', vm);
    console.log('This is $routeParams: ', $routeParams);
    console.log('This is $http: ', $http);

    // All of this is happening on load (until methods below)

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the items list from the database
    vm.items = [];

    // Get the list id from the route params
    vm.listId = $routeParams.list_id;
    console.log('This is listId: ', vm.listId);


    // get the list name from the route params
    vm.listName = $routeParams.list_title;
    console.log('This is listName: ', vm.listName);

    // when landing on the page, get all todos and show them

    $http.get('/api/items')
      .success(function(data) {
        vm.title = "List of Items";
        vm.items = data;
      })

    vm.createItem = function () {
      $http.post('/api/items/create', vm.formData)
        .success(function(data) {
          vm.items.push(data);
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
      });
    };

    vm.removeTodo = function (itemId) {
      $http.post('/api/items/delete/' + itemId)
        .success(function(data) {
          vm.items = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
        });
    };

    vm.updateTodo = function (itemId, item_name) {
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
