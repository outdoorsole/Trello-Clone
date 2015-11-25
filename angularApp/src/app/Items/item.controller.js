(function() {
'use strict';

angular.module('mytodo')
  .controller('ItemController', ['$log', 'ItemService', '$routeParams', function ($log, ItemService, $routeParams) {
    // All of this is happening on load (until methods below)
    var vm = this;

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the items list from the database
    vm.items = [];

    // Get the list id from the route params
    vm.listId = $routeParams.list_id;

    // get the list name from the route params
    vm.listName = $routeParams.list_name;

    // when landing on the page, get all todos and show them
    ItemService.getItems(vm.listId)
    .then(function(listItems) {
      vm.title = vm.listName;
      for (var i = 0; i < listItems.length; i++) {
        vm.items.push(listItems[i]);
      }
    })
    .catch(function(err) {
      $log.error('Error fetching items: ', err);
    });

    // create a new item
    vm.createItem = function(formData) {
      ItemService.createItem(vm.listId, formData)
        .then(function(item) {
          vm.items.push(item);
        })
        .catch(function(err) {
          $log.error('Error fetching items: ', err);
        });
    }

    vm.removeItem = function (itemId) {
      ItemService.removeItem(itemId)
        .then(function(deletedItem) {
          for (var i = 0; i < vm.items.length; i++) {
            if (vm.items[i]._id === deletedItem._id) {
              vm.items.splice(i, 1);
            }
          }
        })
        .catch(function(err) {
          $log.error('Error fetching items: ', err);
        });
    }

    vm.updateItem = function (itemId, itemName) {
      ItemService.updateItem(itemId, itemName)
        .then(function(data) {
          for (var i = 0; i < vm.items.length; i++) {
            if (vm.items[i].id === itemId) {
              vm.items[i] = data;
            }
          }
        })
        .catch(function(data) {
          $log.log('Error: ' + data);
        });
    };
  }])
})();
