(function() {
  'use strict';

  angular.module('mytodo')
  .controller('SignupController', ['UserService', '$log', function(UserService, $log) {
    // All of this is happening on load (until methods below)
    var vm = this;

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // Sign up a new user from the form data
    vm.signupUser = function() {
      $log('This is the SignupController');
    }
  }])
})()
