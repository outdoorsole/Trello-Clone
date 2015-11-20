(function() {
'use strict';

angular.module('mytodo')
  .controller('BoardController', function ($routeParams, $http, $log) {
    var vm = this;

    // All of this is happening on load (until methods below)

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the items list from the database
    vm.boards = [];

    // This will capture the information from a list
    // $scope.listId = $routeParams.list_id;
    // $scope.list_name = $routeParams.list_name;

    // when landing on the page, get all todos and show them

    $http.get('/api/boards/')
    .success(function(data) {
      vm.title = "Board";
      vm.boards = data;
      $log.log('This is data for show boards: ', data);
    })


    vm.createBoard = function () {
      $http.post('/api/boards/create', vm.formData)
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
  })
})();
