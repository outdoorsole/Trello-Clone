(function() {
  'use strict';

  angular.module('mytodo')
  .controller('SignupController', ['$log', 'UserService', function($log, UserService) {
    // All of this is happening on load (until methods below)
    var vm = this;

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // Variable to store the user
    vm.user = {};

    // Sign up a new user from the form data
    vm.signupUser = function () {
      $log.log('This is vm.formData in signupUser in the SignupController (client): ', vm.formData);
      UserService.createUser(vm.formData)
      .then(function(newUser) {
        $log.log('This is newUser: ', newUser);
        vm.user = newUser;
        $log.log('This is vm.user:', vm.user);
      })
      .catch(function(error){
        $log.log('error: ', error);
      });
    };
  }])
})();
