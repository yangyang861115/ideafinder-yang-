/**
 * Created by yangyang on 6/23/16.
 */
(function () {
    angular
        .module("myApp")
        .factory('AdminCanvas', adminCanvas);

    function adminCanvas(Auth, $http, myConfig) {
        var api = {
            saveMasterModel: saveMasterModel,
            getModelList: getModelList,
            updateModel: updateModel
        };
        return api;

        function saveMasterModel(data2) {
            var data = {
                user_id: 1,
                data: data2
            };
            var response = $http.post(myConfig.baseURL + '/brasstacksapi/index.php/Api/model', data);
            response.success(function (data) {
                toastr.success(data.message);
            }).error(function (err) {
                toastr.warning(err);
            });
            return response;
        }

        function getModelList() {
            var data = {
                params: {user_id: 1}
            }
            return $http.get(myConfig.baseURL + '/brasstacksapi/index.php/Api/model', data);
        }

        function updateModel(masterModel) {
            var data = {
                user_id: 1,
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