myApp.factory('testModelService', function ($http) {
  return {

    getCanvasList: function(){
      var data = {
        params:{
          user_id: 1,
          qu_mcID: localStorage.getItem("qu_mcID")
        }
      }
      return $http.get(baseURL+'/brasstacksapi/index.php/Api/question',data);
    },

    saveAnswers: function(answersList){
      var data = {
          user_id: 1,
          data: answersList
      }
      return $http.post(baseURL+'/brasstacksapi/index.php/Api/userresponse',data)
    },

    getUserresponse: function(ucID){
      var data = {
         params:{
          user_id: 1,
          ucID: ucID
         } 
      }
      return $http.get(baseURL+'/brasstacksapi/index.php/Api/userresponse',data);
    },

    updateResponce: function(answersList){
      var data = {
        user_id: 1,
        data: answersList
      }
      return $http.put(baseURL+'/brasstacksapi/index.php/Api/userresponse',data);
    }
  }
});