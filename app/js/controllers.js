'use strict';

var pollcatControllers = angular.module('pollcatControllers', []);

pollcatControllers.controller('UserCtrl', function ($scope, $http, $window) {
  $scope.user = {username: 'admin', password: 'plkplk123'};
  $scope.message = '';
  $scope.submit = function () {
    $http
      .post('http://localhost:8000/login/', $scope.user)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;

        $scope.message = 'Welcome';
          console.log($scope.message);
          console.log(data.token);
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

pollcatControllers.controller('QuestionDetailCtrl', function($scope, $http, $routeParams){
    $http.get('http://localhost:8000/question_list/' + $routeParams.id).success(function(data) {
        console.log("id" + $routeParams.id);
    $scope.detail = data;
    });

  });

pollcatControllers.controller('QuestionListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('http://localhost:8000/question_list/').success(function(data) {
    $scope.questions = data;
  });
  $scope.orderProp = 'id';
}]);

pollcatControllers.controller('PollListController', function($scope){

});

pollcatControllers.controller('createUserController',function($scope, $http){

    $scope.newUserForm = {username: '', email: '', password: ''};



    $scope.onSubmit = function(){
        console.log("submitted");
        console.log("username: " + $scope.newUserForm.username);
        var dataObject = {
            username: $scope.newUserForm.username,
            email: $scope.newUserForm.email,
            password: $scope.newUserForm.password
        };

        $http.post("http://localhost:8000/create_user/", $scope.newUserForm).
            success(function(data){
                console.log("success");
        }).error(function(){
                console.log("error");
        });
    }
});

pollcatControllers.controller('addQuestionController',function($scope, $http){

    $scope.newQuestionForm = {};
    $scope.newQuestionForm = {
        q: 'hello',
        d: 'date'
    };

    $scope.onSubmit = function(){
        console.log("submitted");
        console.log("question: " + $scope.newQuestionForm.q);
        console.log("date_pub" + $scope.newQuestionForm.d)
        $scope.dataObject = {
            question_text: $scope.newQuestionForm.q,
            pub_date: $scope.newQuestionForm.d
        };
        console.log("q = " + $scope.dataObject.question_text);

        $http.post("http://localhost:8000/question_list/", $scope.dataObject).
            success(function(data){
                console.log("success");
        }).error(function(){
                console.log("error");
        });
    }
});
