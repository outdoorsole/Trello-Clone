(function() {
'use strict';

angular.module('mytodo')
  .controller('ItemController', ['ItemService', function (ItemService, $log) {
    var vm = this;
    // All of this is happening on load (until methods below)

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the items list from the database
    vm.items = [];

    // when landing on the page, get all todos and show them

    ItemService.get('/api/items')
      .success(function(data) {
        vm.title = "My List of Items";
        vm.items = data;
      })

    vm.createItem = function () {
      ItemService.post('/api/items/create', vm.formData)
        .success(function(data) {
          vm.items = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
      });
    };

    vm.removeTodo = function (itemId) {
      ItemService.post('/api/items/delete/' + itemId)
        .success(function(data) {
          vm.items = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
        });
    };

    vm.updateTodo = function (itemId, item_name) {
      ItemService.post('/api/items/update/' + itemId + '?item_name=' + item_name)
        .success(function(data) {
          vm.items = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
        });
    };
  }])
})();
