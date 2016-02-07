(function() {
'use strict';

  angular.module('mytodo')
  .controller('UserController', UserController);

  // $inject Property Annotation: an array of service names to inject to the controller.
  UserController.$inject = ['UserService', 'AuthenticationService', '$location', '$log'];

  function UserController(UserService, AuthenticationService, $location, $log) {
    // All of this is happening on load (until methods below)
    var vm = this;

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the users list from the database
    vm.users = [];

    // This variable is to store the current user
    vm.user = {};

    vm.getUsers = getUsers;
    vm.signupUser = signupUser;
    vm.loginUser = loginUser;
    vm.removeUser = removeUser;
    vm.updateUser = updateUser;

    // when landing on the page, get all the usernames and display them
    function getUsers() {
      UserService.getUsers()
      .then(function(allUsers) {
        vm.title = "Registered Users";
        for (var i = 0; i < allUsers.length; i++) {
          vm.users.push(allUsers[i]);
          $log.log('This is allUsers[i]: ', allUsers[i]);
        }
        $log.log('This is vm.users: ', vm.users);
      })
    }

    // Create/signup a new user
    function signupUser() {
      UserService.createUser(vm.formData)
      .then(function (newUser) {
        vm.user = newUser;
        $log.log('This is the newUser: ', newUser);
        $location.path('/login');
      })
      .catch(function(err) {
        $log.error('Error creating a user: ', err);
      })
    }

    // Login a new user with the form data
    function loginUser() {
      $log.log('This is vm.formData: ', vm.formData);
      AuthenticationService.login(vm.formData.email, vm.formData.password, function (response) {
        $log.log('This is response in loginUser in UserController: ', response);
        $log.log('This is response._id: ', response._id);
        $location.path('/boards/' + response._id);
      });
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
})();
