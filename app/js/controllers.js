'use strict';

/* Controllers */

var pollcatApp = angular.module('pollcatApp', []);

pollcatApp.controller('PollListCtrl', function($scope) {
  $scope.questions = [
    {'id': 1,
     "question_text": "Hello what's up?",
    "pub_date": "2015-12-28T21:45:41Z"},

    {"id": 2,
        "question_text": "How can i help you",
        "pub_date": "2015-12-30T04:34:57Z"},

    {"id": 3,
        "question_text": "Who is your favorite Beatle?",
        "pub_date": "2015-12-29T04:57:20.466289Z"}

  ];
});
