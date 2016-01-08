'use strict';

/* Controllers */

var pollcatApp = angular.module('pollcatApp', []);

pollcatApp.controller('PollListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('http://127.0.0.1:8080/?format=json').success(function(data) {
    $scope.questions = data;
  });

  $scope.orderProp = 'id';
}]);
