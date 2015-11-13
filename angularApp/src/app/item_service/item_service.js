(function() {
  'use strict';

  angular.module('mytodo')
    .factory('ItemService', function() {
      var _currentList = 0;
      var service = {};

      service.getItem = function() {
        return _currentItem;
      }

      service.setItem = function(item) {
        _currentItem = item;
        return this.getItem();
      }

      return service;
    });
})();
