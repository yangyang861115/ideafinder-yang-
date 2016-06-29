/**
 * Created by yangyang on 6/22/16.
 */
(function () {
    angular
        .module("myApp")
        .controller("ResponsePanelController", responsePanelController);

    function responsePanelController($location, Canvas) {
        var vm = this;
        vm.tab = 1;
        vm.showdetail = false;
        vm.user = {
            description: {},
            maxLength: {},
            minLength: {},
            mainDescription: ""
        };
        vm.selected = 0;
        vm.preLoader = false;

        vm.tabIndex = 0;
        vm.showme = false;
        vm.buttonLabel = "Next";
        vm.tabs = [];

        vm.nameBtn = [];

        vm.answersList = {
            answers: []
        };

        vm.select = select;
        vm.selectTab = selectTab;
        vm.activeButton = activeButton;
        vm.isSelected = isSelected;
        vm.procced = procced;
        vm.back = back;
        vm.addnewproject = addnewproject;
        vm.getCanvasList = getCanvasList;
        vm.saveall = saveall;
        vm.updateResponce = updateResponce;

        function select(index) {
            vm.selected = index;
        }

        function selectTab(setTab) {
            vm.tab = setTab;
        }

        function activeButton() {
            vm.isActive = !vm.isActive;
        }

        function isSelected(checkTab) {
            return vm.tab === checkTab;
        }

        function procced(index) {
            if (index <= vm.tabs.length) {
                vm.tab = index
            }
        }

        function back(index) {
            if (index > 0) {
                return vm.tab = index
            }
        }

        function addnewproject() {
            vm.showdetail = false;
            vm.hideform = false;
            vm.message = false;
        }

        function getCanvasList() {

            if (!localStorage.getItem("qu_mcID") && !localStorage.getItem("ucID")) {
                $location.url('/userpanel');
            }

            vm.nameBtn = [];
            vm.tabs = [];
            vm.user={};
            vm.user.description={};
            vm.user.maxLength={};
            vm.user.minLength={};

            if (localStorage.getItem("ucID") != '') {
                // Edit mode start

                Canvas
                    .getUserresponse(localStorage.getItem("ucID"))
                    .then(
                        function (response) {

                            var i = 1;
                            angular.forEach(response.data.response_data[0].Question, function (value, key) {
                                vm.nameBtn.push({'name': value.qu_short});
                                vm.tabs.push({
                                    'heading': '#' + i + ' ' + value.qu_quest,
                                    'content': value.qu_desc,
                                    'name': 'q' + i
                                });
                                vm.user.description[i] = value.re_resp;
                                vm.user.maxLength[i] = value.qu_max;
                                vm.user.minLength[i] = value.qu_min;
                                vm.answersList.answers.push({'urID': value.urID, 're_resp': vm.user.description[i]});
                                i++;
                            });
                            vm.user.ucID = response.data.response_data[0].ucID;
                            vm.user.title = response.data.response_data[0].title;
                            vm.user.mainDescription = response.data.response_data[0].desc;


                        }, function (response) {
                            // something went wrong
                            return $q.reject(response.data);
                        });

                // Edit mode end
            } else {
                // Add mode start

                Canvas
                    .getCanvasList()
                    .then(function (response) {

                        var i = 1;
                        angular.forEach(response.data.response_data, function (value, key) {
                            vm.nameBtn.push({'name': value.qu_short});
                            vm.tabs.push({
                                'heading': '#' + i + ' ' + value.qu_quest,
                                'content': value.qu_desc,
                                'name': 'q' + i
                            });
                            vm.user.maxLength[i] = value.qu_max;
                            vm.user.minLength[i] = value.qu_min;
                            vm.answersList.answers.push({'re_quID': value.quID, 're_resp': ''});
                            i++;
                        });

                        vm.user.title = localStorage.getItem("ca_title");
                        vm.user.mainDescription = localStorage.getItem("ca_desc");


                    }, function (response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });

                // Add mode end

            }
        }

        function saveall() {
            vm.preLoader = true;
            vm.answersList.uc_mcID = localStorage.getItem("qu_mcID");
            vm.answersList.title = vm.user.title;
            vm.answersList.email = vm.user.email;
            vm.answersList.name = vm.user.username;
            vm.answersList.desc = vm.user.mainDescription;
            var i = 0;
            angular.forEach(vm.user.description, function (value, key) {
                this.answers[i].re_resp = value;
                i++;
            }, vm.answersList);

            Canvas
                .saveAnswers(vm.answersList)
                .then(
                    function (response) {
                        console.log(response);
                        if (response.data.success) {
                            vm.preLoader = false;
                            localStorage.setItem("qu_mcID", '');
                            localStorage.setItem("ca_title", '');
                            localStorage.setItem("ca_desc", '');
                            toastr.success(response.data.message);
                            $location.url('/userpanel');
                        } else {
                            vm.preLoader = false;
                            toastr.warning(response.data.message);
                        }
                    },
                    function (error) {
                        vm.preLoader = false;
                        toastr.warning(error);
                    }
                );
        }

        function updateResponce() {
            vm.preLoader = true;
            var i = 0;
            angular.forEach(vm.user.description, function (value, key) {
                this.answers[i].re_resp = value;
                i++;
            }, vm.answersList);

            vm.answersList.uc_title = vm.user.title;
            vm.answersList.ucID = parseInt(vm.user.ucID);
            vm.answersList.uc_desc = vm.user.mainDescription;

            console.log(vm.answersList);
            Canvas
                .updateResponce(vm.answersList)
                .success(
                    function(data){
                        console.log(data);
                        if(data.success){
                            vm.preLoader = false;
                            localStorage.setItem("ucID", '');
                            toastr.success(data.message);
                            $location.url('/userpanel');
                        }else{
                            vm.preLoader = false;
                            toastr.warning(data);
                        }
                    })
                .error(function(error){
                    console.log(error);
                    vm.preLoader = false;
                    toastr.warning(error);
                });

        }
    }
})();






