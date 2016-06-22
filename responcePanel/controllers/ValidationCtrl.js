angular.module('myApp')
.controller('ValidationCtrl',['$scope','$http','$location','$route','testModelService',function($scope,$http,$location,$route,testModelService){
    
  this.tab = 1;
  $scope.showdetail=false;
  $scope.user={};
  $scope.user.description={};
  $scope.user.maxLength={};
  $scope.user.minLength={};
  $scope.user.mainDescription = "";
  
  $scope.selected = 0;
  $scope.preLoader = false;
  
  $scope.select= function(index) {
       $scope.selected = index; 

  };

  this.selectTab = function(setTab){
    this.tab = setTab;
    // $scope.isActive = !$scope.isActive;
  }

  $scope.activeButton = function() {
    $scope.isActive = !$scope.isActive;
  }  

  this.isSelected = function(checkTab){
    return this.tab === checkTab;

  }
  
  this.procced = function(index){
      
     if(index <= $scope.tabs.length){
        this.tab = index
     }

  }
  
  
  this.back = function(index){
        if(index > 0){
            return this.tab = index
        }
  }

  $scope.submitFrom= function(user,des){
        
       
  }

  $scope.addnewproject = function(){
     $scope.showdetail = false;
     $scope.hideform = false; 
     $scope.message = false;
  };  
    
    
    
  
 
  $scope.tabIndex = 0;
  $scope.showme= false;
  $scope.buttonLabel = "Next";
  $scope.tabs = [];

  $scope.nameBtn= [];

  $scope.answersList = {};
  $scope.answersList.answers = [];

  $scope.getCanvasList = function(){

    if(!localStorage.getItem("qu_mcID") && !localStorage.getItem("ucID")){
      window.location = baseURL+projectPath+'/responcePanel/userPanel/#/';
    }

    $scope.nameBtn = [];
    $scope.tabs = [];
    $scope.user={};
    $scope.user.description={};
    $scope.user.maxLength={};
    $scope.user.minLength={};

    if(localStorage.getItem("ucID")!=''){
      // Edit mode start

      var responceData = testModelService.getUserresponse(localStorage.getItem("ucID"));
      responceData.then(function(response) {

        var i =1;
        angular.forEach(response.data.response_data[0].Question, function(value, key){
            $scope.nameBtn.push({'name': value.qu_short});
            $scope.tabs.push({'heading':'#'+i+' '+value.qu_quest,'content':value.qu_desc,'name':'q'+i});
            $scope.user.description[i] = value.re_resp;
            $scope.user.maxLength[i]=value.qu_max;
            $scope.user.minLength[i]=value.qu_min;
            $scope.answersList.answers.push({'urID':value.urID,'re_resp': $scope.user.description[i]});
            i++;
        });
        $scope.user.ucID = response.data.response_data[0].ucID;
        $scope.user.title = response.data.response_data[0].title;
        $scope.user.mainDescription = response.data.response_data[0].desc;

        
      }, function(response) {
        // something went wrong
        return $q.reject(response.data);
      });

      // Edit mode end
    }else{
      // Add mode start

      var questionList = testModelService.getCanvasList();
      questionList.then(function(response) {
      
        var i =1;
        angular.forEach(response.data.response_data, function(value, key){
          $scope.nameBtn.push({'name': value.qu_short});
          $scope.tabs.push({'heading':'#'+i+' '+value.qu_quest,'content':value.qu_desc,'name':'q'+i});
          $scope.user.maxLength[i]=value.qu_max;
          $scope.user.minLength[i]=value.qu_min;
          $scope.answersList.answers.push({'re_quID':value.quID,'re_resp':''});
          i++;
        });

        $scope.user.title = localStorage.getItem("ca_title");
        $scope.user.mainDescription = localStorage.getItem("ca_desc");


      }, function(response) {
        // something went wrong
        return $q.reject(response.data);
      });

      // Add mode end 

    }
  }

  

  $scope.saveall = function(){
    $scope.preLoader = true;
    $scope.answersList.uc_mcID = localStorage.getItem("qu_mcID");
    $scope.answersList.title = $scope.user.title;
    $scope.answersList.email = $scope.user.email;
    $scope.answersList.name = $scope.user.username;
    $scope.answersList.desc = $scope.user.mainDescription;
    var i =0;
    angular.forEach($scope.user.description,function(value,key){
      this.answers[i].re_resp = value;
      i++;
    },$scope.answersList);

    var responce = testModelService.saveAnswers($scope.answersList);

    responce.success(function(data){

      if(data.success){
        $scope.preLoader = false;
        localStorage.setItem("qu_mcID",'');
        localStorage.setItem("ca_title",'');
        localStorage.setItem("ca_desc",'');

        window.location = baseURL+'/userPanel/#/';

      }else{
        $scope.preLoader = false;
        toastr.warning(data);
      }

    }).error(function(err){
      $scope.preLoader = false;
        toastr.warning(err);
    });
  }

  
  $scope.updateResponce = function(){
    $scope.preLoader = true;
    var i =0;
    angular.forEach($scope.user.description,function(value,key){
      this.answers[i].re_resp = value;
      i++;
    },$scope.answersList);

    $scope.answersList.uc_title = $scope.user.title;
    $scope.answersList.ucID = parseInt($scope.user.ucID);
    $scope.answersList.uc_desc = $scope.user.mainDescription;

    var responce = testModelService.updateResponce($scope.answersList);
    
    responce.success(function(data){
      if(data.success){
        $scope.preLoader = false;
        localStorage.setItem("ucID",'');
        window.location = baseURL+'/userPanel/#/';
      }else{
        $scope.preLoader = false;
        toastr.warning(data);
      }
    }).error(function(err){
      $scope.preLoader = false;
      toastr.warning(err);
    });
  }

 
 

}])