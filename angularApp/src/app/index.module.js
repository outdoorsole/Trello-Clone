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
})();

