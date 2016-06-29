/**
 * Created by yangyang on 6/21/16.
 */
(function () {
    angular
        .module("myApp")
        .factory('Canvas', canvas);

    function canvas(Auth, $http, myConfig, $location) {
        var userId = parseInt(Auth.getUserId());
        console.log("user id in user panel: " +userId);
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

        //list of models for the dropdown
        function getModelList() {
            var data = {
                params: {user_id: 1}
            };

            return $http.get(myConfig.baseURL + '/brasstacksapi/index.php/Api/model', data);
        }

        function getResponces() {
            var data = {
                params: {user_id: userId}
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
                user_id: userId,
                data: canvasData
            };

            console.log(data);

            localStorage.setItem("ucID", '');
            localStorage.setItem("ca_title", canvasData.ca_title);
            localStorage.setItem("ca_desc", canvasData.ca_desc);


            $http
                .post(myConfig.baseURL + '/brasstacksapi/index.php/Api/canvas', data)
                .then(
                    function (response) {
                        console.log(response.data);
                        localStorage.setItem("qu_mcID", response.data.caID);
                        //$('body').removeClass('modal-open');
                        document.getElementsByTagName("body")[0].setAttribute('class', "");
                        document.querySelectorAll('.modal-backdrop')[0].remove();
                        $location.url('/responsepanel');
                    },
                    function (error) {
                        toastr.warning(error);
                    });
        }

        function getCanvasList() {
            var data = {
                params: {
                    user_id: userId,
                    qu_mcID: localStorage.getItem("qu_mcID")
                }
            }
            return $http.get(myConfig.baseURL + '/brasstacksapi/index.php/Api/question', data);
        }

        function saveAnswers(answersList) {
            var data = {
                user_id: userId,
                data: answersList
            };
            return $http.post(myConfig.baseURL + '/brasstacksapi/index.php/Api/userresponse', data);
        }

        function getUserresponse(ucID) {
            var data = {
                params: {
                    user_id: userId,
                    ucID: ucID
                }
            };
            return $http.get(myConfig.baseURL + '/brasstacksapi/index.php/Api/userresponse', data);
        }

        function updateResponce(answersList) {
            var data = {
                user_id: userId,
                data: answersList
            };
            return $http.put(myConfig.baseURL + '/brasstacksapi/index.php/Api/userresponse', data);
        }
    }
})();