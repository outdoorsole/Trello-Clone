(function() {
  'use strict';

  angular.module('mytodo')
  .factory('BoardService', BoardService);

  // $inject Property Annotation: an array of service names to inject to the controller.
  BoardService.$inject = ['$http', '$q', '$log'];

  function BoardService($http, $q, $log) {
    var service = {
      getBoards: getBoards,
      createBoard: createBoard,
      removeBoard: removeBoard,
      updateBoard: updateBoard
    }

    function getBoards (userId) {
      var deferred = $q.defer();
      $http.get('api/boards/' + userId)
        .success(function (returnedBoards) {
          deferred.resolve(returnedBoards);
        })
        .error(function (data) {
          deferred.reject('Error: ', data);
          $log.log('Error: ', data);
        });
        return deferred.promise;
      }

    function createBoard(userId, formData) {
      var deferred = $q.defer();
      $http.post('/api/boards/create/' + userId, formData)
        .success(function(createdBoard) {
          deferred.resolve(createdBoard);
        })
        .error(function(data) {
          deferred.reject('Error: ', data);
          $log.log('Error: ' + data);
        });
        return deferred.promise;
    }

    function removeBoard (boardId) {
      var deferred = $q.defer();
      $http.post('/api/boards/delete/' + boardId)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(data) {
        $log.log('Error: ' + data);
      });
      return deferred.promise;
    }

    function updateBoard(boardId, boardName) {
      var deferred = $q.defer();
      $http.post('/api/boards/update/' + boardId + '?board_name=' + boardName)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(data) {
        $log.log('Error: ' + data);
      });
      return deferred.promise;
    }

    return service;
  }
})();
