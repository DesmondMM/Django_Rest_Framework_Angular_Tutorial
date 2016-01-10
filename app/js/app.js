'use strict';

var pollcatApp = angular.module('pollcatApp', [
  'ngRoute',
  'pollcatControllers',
])

pollcatApp.config(['$routeProvider',function($routeProvider) {
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