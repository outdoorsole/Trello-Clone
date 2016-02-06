(function() {
  'use strict';

  angular.module('mytodo')
  .controller('SignupController', SignupController);

  // $inject Property Annotation: an array of service names to inject to the controller.
  SignupController.$inject = ['UserService', '$location', '$log'];

  function SignupController(UserService, $location, $log) {
    // All of this is happening on load (until methods below)
    var vm = this;

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // Variable to store the user
    vm.user = {};

    vm.signupUser = signupUser;

    // Sign up a new user from the form data
    function signupUser() {
      UserService.createUser(vm.formData)
      .then(function(newUser) {
        vm.user = newUser;
        $location.path('/login');
      })
      .catch(function(error){
        $log.log('error: ', error);
      });
    };
  }
})();
