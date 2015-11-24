(function() {
  'use strict';

  angular.module('mytodo')
    .factory('ItemService', function() {
      var _currentList = 0;
      var service = {
        getItem: getItem,
        setItem: setItem
      };
      return service;
    });

  function getItem() {
    service.get('/api/items')
    .success(function(data) {
      vm.title = "My List of Items";
      vm.items = data;
      return vm.items;
    })
  }

  function setItem() {
    _currentItem = item;
    return this.getItem();
  }
})();




