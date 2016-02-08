(function() {
'use strict';

  var ListController = function (ListService, $routeParams, $log) {
    var vm = this;

    // All of this is happening on load (until methods below)

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the items list from the database
    vm.lists = [];

    // Get the board id from the route params
    vm.boardId = $routeParams.board_id;

    // Get the board name from the route params
    vm.boardName = $routeParams.board_name;

    // when landing on the page, get all lists and show them
    vm.getLists = function() {
      ListService.getLists(vm.boardId)
      .then(function(boardLists) {
        vm.title = vm.boardName;
        for (var i = 0; i < boardLists.length; i++) {
          vm.lists.push(boardLists[i]);
        }
      })
    }

    // Create a new List
    vm.createList = function (formData) {
      ListService.createList(vm.boardId, formData)
      .then(function (list) {
        vm.lists.push(list);
      })
      .catch(function(err) {
        $log.error('Error fetching items: ', err);
      })
    }

    vm.updateList = function (listId, listName) {
      ListService.updateList(listId, listName)
      .then(function(data) {
        for (var i = 0; i < vm.lists.length; i++) {
          if (vm.lists[i].id === listId) {
            vm.lists[i] = data;
          }
        }
      })
      .catch(function(data) {
        $log.log('Error: ' + data);
      })
    }

    vm.removeList = function (listId) {
      ListService.removeList(listId)
      .then(function(deletedList) {
        for (var i = 0; i < vm.lists.length; i++) {
          if (vm.lists[i]._id === deletedList._id) {
            vm.lists.splice(i, 1);
          }
        }
      })
      .catch(function(err) {
        $log.error('Error fetching items: ', err);
      })
    }
  }

  // $inject Property Annotation: an array of service names to inject to the controller.
  ListController.$inject = ['ListService', '$routeParams', '$log'];

  angular.module('mytodo')
  .controller('ListController', ListController);
})();
