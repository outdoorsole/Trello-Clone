(function() {
'use strict';

angular.module('mytodo')
  .controller('ListController', function ($scope, $routeParams, $http) {

    // All of this is happening on load (until methods below)

    // This variable stores the form data coming through the front-end
    $scope.formData = {};

    // This variable stores the items list from the database
    $scope.lists = [];

    // This will capture the information from a list
    // $scope.listId = $routeParams.list_id;
    // $scope.list_name = $routeParams.list_name;

    // when landing on the page, get all todos and show them

  $http.get('/api/lists/')
    .success(function(data) {
      $scope.title = "List of Todo Lists";
      console.log('I got the data I requested');
      console.log('--------------------------');
      console.log('This is $scope.lists: ', $scope.lists);
      // $scope.itemslist = ;
      $scope.lists = data;
      console.log('--------------------------');
      console.log('This is $scope.lists: ', $scope.lists);
      // console.log('This is the response in refresh: ', response);
      // console.log('This is $scope.itemslist: ', $scope.itemslist);
    })


    $scope.createList = function () {
      console.log('This is inside of createItem: ');
      console.log('This is formData: ', $scope.formData);
      $http.post('/api/lists/create', $scope.formData)
        .success(function(data) {
          $scope.lists = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
      });
    };

    $scope.removeList = function (listId) {
      console.log('This is inside of removeList: ');
      console.log('This is formData: ', $scope.formData);
      $http.post('/api/lists/delete/' + listId)
        .success(function(data) {
          $scope.lists = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.updateList = function (listId, list_name) {
      console.log('This is inside of updateList: ');
      console.log('This is the list_name: ', list_name);
      console.log('This is $scope.formData: ', {list_name: list_name});
      $http.post('/api/lists/update/' + listId, {list_name: list_name})
        .success(function(data) {
          $scope.lists = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
  })
})();
