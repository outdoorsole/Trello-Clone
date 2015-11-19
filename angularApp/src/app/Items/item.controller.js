(function() {
'use strict';

angular.module('mytodo')
  .controller('ItemController', function ($routeParams, $http, $log) {

    var vm = this;
    $log.log('This is vm: ', vm);
    $log.log('This is $routeParams: ', $routeParams);
    $log.log('This is $http: ', $http);

    // All of this is happening on load (until methods below)

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the items list from the database
    vm.items = [];

    // Get the list id from the route params
    vm.listId = $routeParams.list_id;
    $log.log('This is listId: ', vm.listId);


    // get the list name from the route params
    vm.listName = $routeParams.list_title;
    $log.log('This is listName: ', vm.listName);

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

    vm.removeItem = function (itemId) {
      $http.post('/api/items/delete/' + itemId)
        .success(function(data) {
          vm.items = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
        });
    };

    vm.updateItem = function (itemId, item_name) {
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
