adminApp.factory('modelMasterService', function ($http,$resource) {
  return {

    saveMasterModel: function(data2){
     
      var data = {
        user_id: 1,
        data: data2
      }
      var response = $http.post(baseURL+'/brasstacksapi/index.php/Api/model',data);
      response.success(function(data){
        toastr.success(data.message);
      }).error(function(err){
        toastr.warning(err);
      });
      return response;
    },

    getModelList: function(){

      var data = {
        params: {user_id: 1}
      }

      return $http.get(baseURL+'/brasstacksapi/index.php/Api/model',data);

    },

    updateModel: function(masterModel){

      var data = {
        user_id: 1,
        data: masterModel
      }
      var response = $http.put(baseURL+'/brasstacksapi/index.php/Api/model',data);
      response.success(function(data){
        toastr.success(data.message);
      }).error(function(err){
        toastr.warning(err);
      });
      return response;
    }


  }
});
