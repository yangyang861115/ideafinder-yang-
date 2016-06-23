angular.module('adminApp')
.controller('questionListController',['$scope','$http','$q','questionListService',function($scope,$http, $q,questionListService){

  $scope.Question=[{
    id:0,
    qu_short:'',
    qu_quest:'',
    qu_desc:'',
    qu_max:'',
    qu_min:''
  }];


  $scope.addQuestionnaires= [{
      Mq_canvas_title:'',
      Mq_canvas_desc:'',
      Question:$scope.Question
  }];

  $scope.getQuestionList = function(){
    $scope.quesList = [];
    
    $scope.quesList = questionListService.getQuestions();
  }

  $scope.addNewQuestion = function(){
    var newQuestion = $scope.Question.push.length;
    $scope.Question.push({
      id:newQuestion,
      qu_short:'',
      qu_quest:'',
      qu_desc:'',
      qu_max:'',
      qu_min:''
    });
    
    console.log($scope.Question);
  }

  $scope. saveQuestionnaires =function(){
    // console.log($scope.addQuestionnaires);
    
    questionListService.saveQuestionnaires($scope.addQuestionnaires);
  }

}])