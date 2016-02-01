(function () {
  'use strict';

  angular
      .module('mytodo')
      .factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
  function AuthenticationService($http, $cookieStore, $rootScope, $timeout) {
    var service = {};

    service.login = login;
    service.setCredentials = setCredentials;
    service.clearCredentials = clearCredentials;

    // Show current user logged in:
    return service;

    // Use form information (email & password) to login. The callback will receive an object with the username and token
    function login(email, password, callback) {

      $http.post('/api/authenticate', { email: email, password: password })
         .success(function (res) {
             callback({ email: email, token: res.body.token });
         });

    }

    // Store credentials for reuse. They are stored in $rootScope for the current app session. Stored in the $cookieStore for use if the app is reloaded
    function setCredentials(email, token) {
      $rootScope.globals = {
        currentUser: {
          email: email,
          token: token
        }
      };

      $http.defaults.headers.common['X-ACCESS-TOKEN'] = token;
      $cookieStore.put('globals', $rootScope.globals);
    }

    // Cleanup the stored credentials
    function clearCredentials() {
      $log.log('clear creds');
      $rootScope.globals = {};
      $cookieStore.remove('globals');
      $http.defaults.headers.common.Authorization = 'Basic';
    }
  }
})();
