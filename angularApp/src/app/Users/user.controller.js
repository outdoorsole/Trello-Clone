(function() {
'use strict';

angular.module('mytodo')
  .controller('UserController', ['$log', 'UserService', '$routeParams', function ($log, UserService, $routeParams) {
    var vm = this;

    // All of this is happening on load (until methods below)

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the users list from the database
    vm.users = [];

    // This will capture the information from a list
    // $scope.listId = $routeParams.list_id;
    // $scope.list_name = $routeParams.list_name;

    // when landing on the page, get all the usernames and display them
    UserService.getUsers()
    .then(function(allUsers) {
      vm.title = "Registered Users";
      for (var i = 0; i < allUsers.length; i++) {
        vm.users.push(allUsers[i]);
      }
      $log.log('This is data for vm.users: ', vm.users);
    })


    // Create a new user
    vm.createUser = function (formData) {
      UserService.createUser(formData)
      .then(function (user) {
        vm.boards.push(user);
      })
      .catch(function(err) {
        $log.error('Error creating a user: ', err);
      })
    }

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
  }])
})();
