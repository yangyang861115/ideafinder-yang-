/**
 * Created by yangyang on 6/23/16.
 */
(function () {
    angular
        .module("myApp")
        .factory('AdminCanvas', adminCanvas);

    function adminCanvas(Auth, $http, myConfig) {

        var userId = parseInt(Auth.getUserId());
        console.log("user id in admin panel: " + userId);

        var api = {
            saveMasterModel: saveMasterModel,
            getModelList: getModelList,
            updateModel: updateModel,
            getMasterModels: getMasterModels
        };
        return api;

        function getMasterModels(){
            var data = {
                params: {user_id: userId}
            }
            return $http.get(myConfig.baseURL + '/brasstacksapi/index.php/Api/master', data);
        }

        function saveMasterModel(data2) {
            var data = {
                user_id: userId,
                data: data2
            };
            var response = $http.post(myConfig.baseURL + '/brasstacksapi/index.php/Api/model', data);
            response.success(function (data) {
                console.log(response);
                toastr.success(data.message);
            }).error(function (err) {
                toastr.warning(err);
            });
            return response;
        }

        function getModelList() {
            var data = {
                params: {user_id: userId}
            }
            return $http.get(myConfig.baseURL + '/brasstacksapi/index.php/Api/mymodel', data);

        }

        function updateModel(masterModel) {
            var data = {
                user_id: userId,
                data: masterModel
            }
            var response = $http.put(myConfig.baseURL + '/brasstacksapi/index.php/Api/model', data);
            response.success(function (data) {
                toastr.success(data.message);
            }).error(function (err) {
                toastr.warning(err);
            });
            return response;
        }
    }
})();