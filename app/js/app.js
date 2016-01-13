'use strict';

var pollcatApp = angular.module('pollcatApp', [
  'ngRoute',
  'pollcatControllers',
]);

pollcatApp.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'JWT ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
});

pollcatApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

pollcatApp.config(['$httpProvider','$routeProvider',function($httpProvider, $routeProvider) {
    $httpProvider.interceptors.push('authInterceptor');
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
      when('/add_question', {
        templateUrl: 'partials/add-question.html',
        controller: 'addQuestionController'
      }).
      when('/create_user', {
        templateUrl: 'partials/createUser.html',
        controller: 'createUserController'
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