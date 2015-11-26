(function() {
'use strict';

angular.module('mytodo')
  .controller('BoardController', ['$log', 'BoardService', '$routeParams', function ($log, BoardService, $routeParams) {
    var vm = this;

    // All of this is happening on load (until methods below)

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the items list from the database
    vm.boards = [];

    // Get the user id from the route params
    vm.userId = $routeParams.user_id;
    $log.log('This is userId: ', vm.userId);

    // Get the user name
    vm.username = $routeParams.user_name;
    $log.log('This is the username: ', vm.username);

    // when landing on the page, get all boards and show them

    BoardService.getBoards(vm.userId)
    .then(function(userBoards) {
      vm.title = 'My Boards: ' + vm.username;
      for (var i = 0; i < userBoards.length; i++) {
        vm.boards.push(userBoards[i]);
      }
      $log.log('This is the vm.boards: ', vm.boards);
    })

    // Create a new board
    vm.createBoard = function (formData) {
      BoardService.createBoard(vm.userId, formData)
      .then(function (board) {
        vm.boards.push(board);
      })
      .catch(function(err) {
        $log.error('Error fetching items: ', err);
      })
    }

    vm.removeBoard = function (boardId) {
      BoardService.removeBoard(boardId)
      .then(function(deletedBoard) {
        for (var i = 0; i < vm.boards.length; i++) {
          if (vm.boards[i]._id === deletedBoard._id) {
            vm.boards.splice(i, 1);
          }
        }
      })
      .catch(function(err) {
        $log.error('Error fetching items: ', err);
      })
    }

    vm.updateBoard = function (boardId, boardName) {
      BoardService.updateBoard(boardId, boardName)
      .then(function(data) {
        for (var i = 0; i < vm.boards.length; i++) {
          if (vm.boards[i].id === boardId) {
            vm.boards[i] = data;
          }
        }
      })
      .catch(function(data) {
        $log.log('Error: ', + data);
      })
    }
  }])
})();
