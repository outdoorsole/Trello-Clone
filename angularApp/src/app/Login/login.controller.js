(function() {
  'use strict';

  angular.module('mytodo')
  .controller('LoginController', ['$log', function($log) {
    // All of this is happening on load (until methods below)
    var vm = this;

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // Sign up a new user from the form data
    vm.loginUser = function() {
      $log('This is the LoginController');
    }
  }])
})()
