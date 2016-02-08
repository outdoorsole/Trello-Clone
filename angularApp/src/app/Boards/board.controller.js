(function() {
'use strict';

  angular.module('mytodo')
  .controller('BoardController', BoardController);

  // $inject Property Annotation: an array of service names to inject to the controller.
  BoardController.$inject = ['BoardService', '$routeParams', '$log'];

  function BoardController(BoardService, $routeParams, $log) {
    var vm = this;

    // All of this is happening on load (until methods below)

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the items list from the database
    vm.boards = [];

    // Get the user id from the route params
    vm.userId = $routeParams.user_id;

    // Get the user name
    vm.username = $routeParams.user_name;

    vm.getBoards = getBoards;
    vm.createBoard = createBoard;
    vm.removeBoard = removeBoard;
    vm.updateBoard = updateBoard;

    // when landing on the page, get all boards for a user and display
    function getBoards() {
      BoardService.getBoards(vm.userId)
      .then(function(userBoards) {
        for (var i = 0; i < userBoards.length; i++) {
          vm.boards.push(userBoards[i]);
        }
      })
    }

    // Create a new board
    function createBoard(formData) {
      BoardService.createBoard(vm.userId, formData)
      .then(function (board) {
        vm.boards.push(board);
      })
      .catch(function(err) {
        $log.error('Error creating a board: ', err);
      })
    }

    // Remove a board
    function removeBoard(boardId) {
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

    // Update a board
    function updateBoard(boardId, boardName) {
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
  }
})();
