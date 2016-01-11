'use strict';

var pollcatControllers = angular.module('pollcatControllers', []);

pollcatControllers.controller('QuestionDetailCtrl', function($scope, $http, $routeParams){
    $http.get('http://localhost:8000/' + $routeParams.id).success(function(data) {
    $scope.detail = data;
    });

  });


pollcatControllers.controller('QuestionListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('http://localhost:8000').success(function(data) {
    $scope.questions = data;

  });

  $scope.orderProp = 'id';
}]);

pollcatControllers.controller('PollListController', function($scope){

})

//Login Function


pollcatControllers.controller('UserCtrl', function ($scope, $http, $window) {
  $scope.user = {username: 'john.doe', password: 'foobar'};
  $scope.message = '';
  $scope.submit = function () {
    $http
      .post('http://localhost:8000/login/', $scope.user)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $scope.message = 'Welcome';
          console.log($scope.message);
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;

        // Handle login errors here
        $scope.message = 'Error: Invalid user or password';
          console.log($scope.message);
      });
  };
});


