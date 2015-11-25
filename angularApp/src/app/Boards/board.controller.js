(function() {
'use strict';

angular.module('mytodo')
  .controller('BoardController', ['$http', '$log', 'BoardService', '$routeParams', function ($http, $log, BoardService, $routeParams) {
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

    vm.createBoard = function () {
      $http.post('/api/boards/create/' + vm.userId, vm.formData)
        .success(function(data) {
          $log.log('This is data[0]:', data[0]);
          vm.boards.push(data[0]);
          $log.log('This is vm.boards:', vm.boards);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
      });
    };

    vm.removeBoard = function (boardId) {
      $http.post('/api/boards/delete/' + boardId)
        .success(function(data) {
          vm.boards = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
        });
    };

    vm.updateBoard = function (boardId, board_name) {
      $http.post('/api/boards/update/' + boardId, {board_name: board_name})
        .success(function(data) {
          vm.boards = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
        });
    };
  }])
})();
