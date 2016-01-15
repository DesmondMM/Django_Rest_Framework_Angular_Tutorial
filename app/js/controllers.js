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
          window.location = "#/questions"
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
    console.log('hello');
    console.log('Route' + $routeParams.id);
    $scope.url = "http://localhost:8000/question_detail/" + $routeParams.id + "/";
    $http.get($scope.url).success(function(data) {
        console.log("id = 1");
        $scope.clickedID = $routeParams.id;

        $scope.detail = data;
        console.log("GET ID = " + $scope.detail.id);
        console.log('ID ' + data.id + ' Qn = ' + data.question_text);
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
            "question_text": $scope.newQuestionForm.q,
            "pub_date": $scope.newQuestionForm.d
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

pollcatControllers.controller('ChoiceListCtrl', function($scope, $http, $routeParams){
    $http.get('http://localhost:8000/choice_list/' + $routeParams.id).success(function(data) {
        console.log("id" + $routeParams.id);
    $scope.detail = data;
    });
  });

pollcatControllers.controller('createChoiceController',function($scope, $http){
   var queryy = $http.get('http://localhost:8000/question_list/').success(function(data) {
    $scope.questions = data;
     });
   //$scope.newChoiceForm = {"question": '', "choice_text": '', "votes": ''};
      $scope.onSubmit = function(){
        console.log("submitted");
        console.log("question" + $scope.newChoiceForm.question);
       console.log("choice" + $scope.newChoiceForm.choice)
        $scope.dataObj = {
            "question": parseInt($scope.newChoiceForm.question),
            "choice_text": $scope.newChoiceForm.choice,
            "votes": 0
        };

       console.log("New Choice Qn" + $scope.newChoiceForm.question);
        $http.post("http://localhost:8000/create_choice/", $scope.dataObj).
            success(function(data){
                console.log("success");
        }).error(function(){
                console.log("error");
        });
    }
});

pollcatControllers.controller('ChoiceListCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $http.get('http://localhost:8000/choice_list/').success(function(data) {
    $scope.ans_choices = data;
      //console.log(data.id);
  });
  $scope.orderProp = 'question';

  $scope.location = $location.search()['target'];
    console.log("Location = " + $scope.location);
  if($scope.location){
      console.log('Location Recieved');
      console.log("Location = " + $scope.location);
  }

   $scope.voteSubmit = function(votes) {
       alert('Vote Submitted');
       console.log("submitted question = " + $scope.detail.id);
       console.log("Selected choice = " + $scope.location);
       console.log("votes = " + votes);
        $scope.voteurl = "http://localhost:8000/choices/" + $scope.detail.id + "/";

       $scope.dataObject= {
            "question": $scope.detail.id,
            "choice_text": $scope.location,
            "votes": votes + 1
        }

       $http.put($scope.voteurl, $scope.dataObject).
            success(function(data){
                console.log("success");
        }).error(function(){
                console.log("error");
        });
   }

}]);



