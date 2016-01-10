'use strict';

var pollcatApp = angular.module('pollcatApp', [
  'ngRoute',

]);

pollcatApp.controller('QuestionDetailCtrl', function($scope, $http, $routeParams){
    $http.get('http://localhost:8000/' + $routeParams.id).success(function(data) {
    $scope.detail = data;
    });

  });


pollcatApp.controller('QuestionListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('http://localhost:8000').success(function(data) {
    $scope.questions = data;

  });

  $scope.orderProp = 'id';
}]);

pollcatApp.controller('PollListController', function($scope){

})



