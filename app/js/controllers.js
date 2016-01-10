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



