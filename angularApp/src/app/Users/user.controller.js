(function() {
'use strict';

angular.module('mytodo')
  .controller('UserController', function ($routeParams, $http, $log) {
    var vm = this;

    // All of this is happening on load (until methods below)

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the items list from the database
    vm.users = [];

    // This will capture the information from a list
    // $scope.listId = $routeParams.list_id;
    // $scope.list_name = $routeParams.list_name;

    // when landing on the page, get all todos and show them

    $http.get('/api/users/')
    .success(function(data) {
      vm.title = "Users";
      vm.users = data;
      $log.log('This is data for show users: ', data);
    })


    vm.createUser = function () {
      $http.post('/api/user/create', vm.formData)
        .success(function(data) {
          $log.log('This is data[0]:', data[0]);
          vm.users.push(data[0]);
          $log.log('This is vm.users:', vm.users);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
      });
    };

    vm.removeUser = function (userId) {
      $http.post('/api/user/delete/' + userId)
        .success(function(data) {
          vm.users = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
        });
    };

    vm.updateUser = function (userId, user_name) {
      $http.post('/api/user/update/' + userId, {user_name: user_name})
        .success(function(data) {
          vm.users = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
        });
    };
  })
})();
