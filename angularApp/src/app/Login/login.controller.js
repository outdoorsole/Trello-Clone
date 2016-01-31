(function() {
  'use strict';

  angular.module('mytodo')
  .controller('LoginController', ['AuthenticationService', '$location', '$log', function(AuthenticationService, $location, $log) {
    // All of this is happening on load (until methods below)
    var vm = this;

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // Sign up a new user from the form data
    vm.loginUser = function() {
      AuthenticationService.login(vm.email, vm.password, function (response) {
        $log.log('This is the LoginController');
      });
    }
}])
})()
