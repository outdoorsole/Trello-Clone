(function() {
'use strict';

angular.module('mytodo')
  .controller('UserController', ['$log', 'UserService', function ($log, UserService) {
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
        vm.users.push(user);
      })
      .catch(function(err) {
        $log.error('Error creating a user: ', err);
      })
    }

    vm.removeUser = function (userId) {
      UserService.removeUser(userId)
      .then(function(deletedUser) {
        for (var i = 0; i < vm.users.length; i++) {
          if (vm.users[i]._id === deletedUser._id) {
            vm.users.splice(i, 1);
          }
        }
      })
      .catch(function(err) {
        $log.error('Error fetching items: ', err);
      })
    }

    vm.updateUser = function (userId, userName) {
      UserService.updateUser(userId, userName)
      .then(function(data) {
        for (var i = 0; i < vm.users.length; i++) {
          if (vm.users[i].id === userId) {
            vm.users[i] = data;
          }
        }
      })
      .catch(function(data) {
        $log.log('Error: ', + data);
      })
    }
  }])
})();
