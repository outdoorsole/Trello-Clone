(function() {
  'use strict';

  angular.module('mytodo')
  .controller('SignupController', ['UserService', '$log', function(UserService, $log) {
    // All of this is happening on load (until methods below)
    var vm = this;

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // Variable to store the user
    vm.user = {};

    // Sign up a new user from the form data
    vm.signupUser = function() {
      UserService.createNewUser(vm.formData)
      .then(function(newUser) {
        vm.user = newUser;
        $log('This is vm.user:', vm.user);
      })
      .catch(function(error){
        $log('error: ', error);
      })
    }
  }])
})()
