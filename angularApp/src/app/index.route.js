(function() {
  'use strict';

  angular
    .module('mytodo')
    .config(routeConfig);

  function routeConfig($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'app/Lists/list.html',
        // knows to go to the main controller
        controller: 'ListController',
        // alias for the controller
        controllerAs: 'ListController'
      })
      .otherwise({
        redirectTo: '/'
      });

    $routeProvider
      .when('/items', {
        templateUrl: 'app/Items/item.html',
        // knows to go to the main controller
        controller: 'ItemController',
        controllerAs: 'ItemController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
