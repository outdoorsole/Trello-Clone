(function() {
'use strict';

angular.module('mytodo')
  .controller('ItemController', function ($http, $log) {
    var vm = this;
    // All of this is happening on load (until methods below)

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the items list from the database
    vm.items = [];

    // when landing on the page, get all todos and show them

    $http.get('/api/items')
      .success(function(data) {
        vm.title = "My List of Items";
        // console.log('I got the data I requested');
        // console.log('--------------------------');
        // console.log('This is vm.items: ', vm.items);
        vm.items = data;
        // console.log('--------------------------');
        // console.log('This is vm.items: ', vm.items);
      })

    vm.createItem = function () {
      // console.log('This is inside of createItem: ');
      // console.log('This is formData: ', vm.formData);
      $http.post('/api/items/create', vm.formData)
        .success(function(data) {
          vm.items = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
      });
    };

    vm.removeTodo = function (itemId) {
      // console.log('This is inside of removeTodo: ');
      // console.log('This is formData: ', vm.formData);
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
      // console.log('This is inside of updateTodo: ');
      // console.log('This is the item_name: ', item_name);
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
