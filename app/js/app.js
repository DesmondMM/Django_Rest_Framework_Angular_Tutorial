'use strict';

var pollcatApp = angular.module('pollcatApp', [
  'ngRoute',

]);

pollcatApp.controller('QuestionDetailCtrl', ['$scope', '$routeParams', 'Qdet',
  function($scope, $routeParams, Qdet) {
    $scope.qdet = Qdet.get({id: $routeParams.id}, function(qdet) {
      $scope.details = qdet.id;
    });
  }]);


pollcatApp.controller('QuestionListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('http://localhost:8000').success(function(data) {
    $scope.questions = data;

  });

  $scope.orderProp = 'id';
}]);

pollcatApp.controller('PollListController', function($scope){

})

.config(['$routeProvider',function($routeProvider) {
    $routeProvider.
      when('/', {
        template: '<h1>Welcome to Polls App</h1>',
        controller: 'PollListController'
      }).
      when('/questions', {
        templateUrl: 'partials/question-list.html',
        controller: 'QuestionListCtrl'
      }).
      when('/questions/:id', {
        templateUrl: 'partials/question-det.html',
        controller: 'QuestionDetailCtrl'
      }).
      when('/add', {
        templateUrl: 'partials/add-question.html',
        controller: 'PollListController'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'PollListController'
      }).
      when('/error', {
        template: '<h1>404: Sorry an Error Occured</h1>',
        controller: 'PollListController'
      }).
      otherwise({
        redirectTo: '/error'
      });

  }]);