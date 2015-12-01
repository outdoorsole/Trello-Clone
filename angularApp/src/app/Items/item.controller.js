(function() {
'use strict';

angular.module('mytodo')
  .controller('ItemController', ['$log', 'ItemService', function ($log, ItemService) {
    // All of this is happening on load (until methods below)
    var vm = this;

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the items list from the database
    vm.items = [];

    vm.getItems = function(listId) {
      ItemService.getItems(listId)
      .then(function(listItems) {
        for (var i = 0; i < listItems.length; i++) {
          vm.items.push(listItems[i]);
        }
      })
      .catch(function(err) {
        $log.error('Error fetching items: ', err);
      });
    }

    // create a new item
    vm.createItem = function(listId, formData) {
      ItemService.createItem(listId, formData)
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
