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

    // it('add an item to the todo list', function() {
    //  scope.item = 'Item 4';
    //  scope.createItem();
    //  expect(scope.item_list).toEqual(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
    // });

    // it ('should remove an item', function() {
    //     scope.removeTodo(1);
    //     expect(scope.item_list).toEqual(['Item 1', 'Item 3']);
    // });
  });
})();
