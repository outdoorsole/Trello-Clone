(function() {
  'use strict';

  // list of modules
  // the first one is the starting point for the applicaiton
  // the rest are dependencies
  // dependency injection
  // encapsulating things in different pieces
  angular
    .module('mytodo', [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngResource',
      'ngRoute',
      'ui.bootstrap',
      'ui.sortable',
      'LocalStorageModule',
      'toastr'
    ]);
    // .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    //   localStorageServiceProvider.setPrefix('ls');
    // }]);
    // .config(function ($routeProvider) {
    //   $routeProvider
    //   .when('/', {
    //     templateUrl: 'views/main.html',
    //     controller: 'MainCtrl'
    //   })
    //   .when('/about', {
    //     templateUrl: 'views/about.html',
    //     controller: 'AboutCtrl'
    //   })
    //   .otherwise({
    //     redirectTo: '/'
    //   });
  // });
})();

