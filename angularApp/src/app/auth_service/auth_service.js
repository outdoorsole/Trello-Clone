// (function() {
//   'use strict';

//   angular
//   .module('mytodo')
//   .factory('AuthenticationService', AuthenticationService);

//   AuthenticationService.$inject = ['$log', '$http', '$cookieStore', '$rootScope', '$timeout'];
//   function AuthenticationService($log, $http, $cookieStore, $rootscope, $timeout) {
//     var service = {};

//     service.login = login;
//     service.SetCredentials = SetCredentials;
//     service.ClearCredentials = ClearCredentials;

//   // Show current user logged in:
//   return service;

//   // Use form information to signup. The callback will receive an object with the username and token
//   function signUp(email, password, callback) {

//     $http.post('/authenticate', {email: email, password: password})
//     .success(function(res) {
//       callback({
//         success: res.success,
//         email: email,
//         token: res.token,
//         id: res._id
//       });
//     });
//   }
//   // Store credentials for reuse. They are stored in $rootScope for the current app session. Stored in the $cookieStore for use if the app is reloaded
//   function SetCredentials(email, token, id) {
//     $rootScope.globals = {
//       currentUser: {
//         email: data.email,
//         token: data.name,
//         id: data.id,
//         token: data.token
//       }
//     }
//   }

//   $http.defaults.headers.common['X-ACCESS-TOKEN'] = data.token;
//   $cookieStore.put('globals', $rootScope.globals);
// }

//   // Cleanup the stored credentials
//   function clearCredentials() {
//     $log.log('clear creds');
//     $rootScope.globals = {};
//     $cookieStore.remove('globals');
//     $http.defaults.headers.common.Authorization = 'Basic';
//   }
// })();
