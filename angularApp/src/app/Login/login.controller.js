(function() {
  'use strict';

  angular.module('mytodo')
  .controller('LoginController', LoginController)

  // $inject Property Annotation: an array of service names to inject to the controller.
  LoginController.$inject = ['AuthenticationService', '$location', '$log'];

  function LoginController(AuthenticationService, $location, $log) {
    // All of this is happening on load (until methods below)
    var vm = this;

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    vm.loginUser = loginUser;

    // Sign up a new user from the form data
    function loginUser() {
      $log.log('This is vm.formData: ', vm.formData);
      AuthenticationService.login(vm.formData.email, vm.formData.password, function (response) {
        $log.log('This is response in LoginController: ', response);
        $location.path('/users');
      });
    }
  }
})();
