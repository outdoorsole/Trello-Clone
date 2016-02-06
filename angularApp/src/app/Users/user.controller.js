(function() {
'use strict';

  var UserController = function ($log, UserService) {
    // All of this is happening on load (until methods below)
    var vm = this;

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the users list from the database
    vm.users = [];

    vm.getUsers = getUsers;
    vm.createUser = createUser;
    vm.removeUser = removeUser;
    vm.updateUser = updateUser;

    // when landing on the page, get all the usernames and display them
    function getUsers() {
    UserService.getUsers()
    .then(function(allUsers) {
      vm.title = "Registered Users";
      for (var i = 0; i < allUsers.length; i++) {
        vm.users.push(allUsers[i]);
      }
    })
  }

    // Create a new user
    function createUser(formData) {
      UserService.createUser(formData)
      .then(function (user) {
        vm.users.push(user);
      })
      .catch(function(err) {
        $log.error('Error creating a user: ', err);
      })
    }

    function removeUser(userId) {
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

    function updateUser(userId, userName) {
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
  }

  // $inject Property Annotation: an array of service names to inject to the controller.
  UserController.$inject = ['$log', 'UserService'];

  angular.module('mytodo')
  .controller('UserController', UserController);
})();
