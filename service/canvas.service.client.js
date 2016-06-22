/**
 * Created by yangyang on 6/21/16.
 */
(function () {
    angular
        .module("myApp")
        .factory('Canvas', canvas);

    function canvas(Auth, $http, myConfig, $location) {
        var api = {
            //userpanel
            getModelList: getModelList,
            getResponces: getResponces,
            editResponce: editResponce,
            saveCanvas: saveCanvas,
            //responsepanel
            getCanvasList: getCanvasList,
            saveAnswers: saveAnswers,
            getUserresponse: getUserresponse,
            updateResponce: updateResponce

        };
        return api;

        //var userId = Auth.getUserId();

        function getModelList() {
            var data = {
                params: {user_id: 1}
            };
            console.log(myConfig.baseURL);
            return $http.get(myConfig.baseURL + '/brasstacksapi/index.php/Api/model', data);
        }

        function getResponces() {
            var data = {
                params: {user_id: 1}
            }
            return $http.get(myConfig.baseURL + '/brasstacksapi/index.php/Api/userresponse', data);
        }

        function editResponce(ucID) {
            localStorage.setItem("ucID", ucID);
            localStorage.setItem("ca_title", '');
            localStorage.setItem("ca_desc", '');
            console.log(localStorage.getItem('ucID'));
            $location.url('/responsepanel');
        }

        function saveCanvas(canvasData) {
            var data = {
                user_id: 1,
                data: canvasData
            };

            localStorage.setItem("ucID", '');
            localStorage.setItem("ca_title", canvasData.ca_title);
            localStorage.setItem("ca_desc", canvasData.ca_desc);

            $http
                .post(myConfig.baseURL + '/brasstacksapi/index.php/Api/canvas', data)
                .then(
                    function (data) {
                        localStorage.setItem("qu_mcID", data.caID);
                        window.location = myConfig.baseURL + '/responcePanel/#/'
                    },
                    function (error) {
                        toastr.warning(error);
                    });
        }

        function getCanvasList() {
            var data = {
                params: {
                    user_id: 1,
                    qu_mcID: localStorage.getItem("qu_mcID")
                }
            }
            return $http.get(myConfig.baseURL + '/brasstacksapi/index.php/Api/question', data);
        }

        function saveAnswers(answersList) {
            var data = {
                user_id: 1,
                data: answersList
            };
            return $http.post(myConfig.baseURL + '/brasstacksapi/index.php/Api/userresponse', data)
        }

        function getUserresponse(ucID) {
            var data = {
                params: {
                    user_id: 1,
                    ucID: ucID
                }
            };
            return $http.get(myConfig.baseURL + '/brasstacksapi/index.php/Api/userresponse', data);
        }

        function updateResponce(answersList) {
            var data = {
                user_id: 1,
                data: answersList
            };
            return $http.put(myConfig.baseURL + '/brasstacksapi/index.php/Api/userresponse', data);
        }
    }
})();