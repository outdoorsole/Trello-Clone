(function() {
'use strict';

angular.module('mytodo')
  .controller('ListController', function ($routeParams, $http, $log) {
    var vm = this;

    // All of this is happening on load (until methods below)

    // This variable stores the form data coming through the front-end
    vm.formData = {};

    // This variable stores the items list from the database
    vm.lists = [];

    // This will capture the information from a list
    // $scope.listId = $routeParams.list_id;
    // $scope.list_name = $routeParams.list_name;

    // when landing on the page, get all todos and show them

  $http.get('/api/lists/')
    .success(function(data) {
      vm.title = "List of Todo Lists";
      // console.log('I got the data I requested');
      // console.log('--------------------------');
      // console.log('This is vm.lists: ', vm.lists);
      // vm.itemslist = ;
      vm.lists = data;
      // console.log('--------------------------');
      // console.log('This is vm.lists: ', vm.lists);
      // console.log('This is the response in refresh: ', response);
      // console.log('This is vm.itemslist: ', vm.itemslist);
    })


    vm.createList = function () {
      // console.log('This is inside of createItem: ');
      // console.log('This is formData: ', vm.formData);
      $http.post('/api/lists/create', vm.formData)
        .success(function(data) {
          vm.lists = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
      });
    };

    vm.removeList = function (listId) {
      // console.log('This is inside of removeList: ');
      // console.log('This is formData: ', vm.formData);
      $http.post('/api/lists/delete/' + listId)
        .success(function(data) {
          vm.lists = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
        });
    };

    vm.updateList = function (listId, list_name) {
      // console.log('This is inside of updateList: ');
      // console.log('This is the list_name: ', list_name);
      // console.log('This is vm.formData: ', {list_name: list_name});
      $http.post('/api/lists/update/' + listId, {list_name: list_name})
        .success(function(data) {
          vm.lists = data;
          $log.log(data);
        })
        .error(function(data) {
          $log.log('Error: ' + data);
        });
    };
  })
})();
