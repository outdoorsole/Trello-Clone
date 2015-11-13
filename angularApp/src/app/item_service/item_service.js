(function() {
  'use strict';

  angular.module('mytodo')
    .factory('ItemService', function() {
      var _currentList = 0;
      var service = {};

      service.getItem = function() {
        service.get('/api/items')
        .success(function(data) {
          vm.title = "My List of Items";
          vm.items = data;
          return vm.items;
        })
      }

      service.setItem = function(item) {
        _currentItem = item;
        return this.getItem();
      }

      return service;
    });
})();
