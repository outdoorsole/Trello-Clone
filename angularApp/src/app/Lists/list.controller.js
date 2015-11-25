(function() {
'use strict';

angular.module('mytodo')
  .controller('ListController', ['$log', 'ListService', '$routeParams', function ($log, ListService, $routeParams) {
    var vm = this;

    // All of this is happening on load (until methods below)

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the items list from the database
    vm.lists = [];

    // Get the board id from the route params
    vm.boardId = $routeParams.board_id;
    $log.log('This is boardId: ', vm.boardId);

    // Get the board name from the route params
    vm.boardName = $routeParams.board_name;
    $log.log('This is boardName: ', vm.boardName);


    // when landing on the page, get all lists and show them

    // ** Fix so that it's just one board; board id and board name**
    ListService.getLists(vm.boardId)
    .then(function(boardLists) {
      vm.title = vm.boardName;
      for (var i = 0; i < boardLists.length; i++) {
        vm.lists.push(boardLists[i]);
      }
    })

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

    vm.removeList = function (listId) {
      ListService.removeList(boardId)
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

    //   $http.post('/api/lists/delete/' + listId)
    //     .success(function(data) {
    //       vm.lists = data;
    //       $log.log(data);
    //     })
    //     .error(function(data) {
    //       $log.log('Error: ' + data);
    //     });
    // };

    vm.updateList = function (listId, list_name) {
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

    //   $http.post('/api/lists/update/' + listId, {list_name: list_name})
    //     .success(function(data) {
    //       vm.lists = data;
    //       $log.log(data);
    //     })
    //     .error(function(data) {
    //       $log.log('Error: ' + data);
    //     });
    // };
  }])
})();
