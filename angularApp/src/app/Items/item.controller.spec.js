(function() {
  'use strict';

  describe('ItemController', function() {
    var scope, ItemController;

    // Configure module that contains the controller being tested
    beforeEach(module('mytodo'));

    // Setup the scope and controller to be tested
    beforeEach(inject(function($rootScope, $controller) {
     scope = $rootScope.$new();
     ItemController = $controller('ItemController', {
      $scope: scope
     });
    }));

    // Define Tests
    it('initializes default item_list', function() {
     expect(scope.items).toEqual([]);
    });

    it('add an item to the todo list', function() {
     scope.items = 'Item 1';
     scope.createItem();
     expect(scope.items).toEqual('Item 1');
    });

    it('should remove an item', function() {
        scope.removeTodo(1);
        expect(scope.item_list).toEqual([]);
    });
  });
})();
