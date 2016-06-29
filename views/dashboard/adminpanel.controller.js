/**
 * Created by yangyang on 6/23/16.
 */

(function () {
    angular
        .module("myApp")
        .controller("AdminPanelController", adminPanelController);

    function adminPanelController(AdminCanvas) {
        var vm = this;
        var questionKeyList = ["mo_1", "mo_2", "mo_3", "mo_4", "mo_5", "mo_6", "mo_7", "mo_8", "mo_9", "mo_10", "mo_11", "mo_12", "mo_13", "mo_14", "mo_15"];

        vm.modelList = [
            {
                Id: 1,
                Name: 'mo_1',
                modelTitle: '',
                modelShortName: '',
                modelDescription: '',
                modelMaxLength: '',
                modelMinLength: ''

            }, {
                Id: 2,
                Name: 'mo_2',
                modelTitle: '',
                modelShortName: '',
                modelDescription: '',
                modelMaxLength: '',
                modelMinLength: ''

            }, {
                Id: 3,
                Name: 'mo_3',
                modelTitle: '',
                modelShortName: '',
                modelDescription: '',
                modelMaxLength: '',
                modelMinLength: ''

            }, {
                Id: 4,
                Name: 'mo_4',
                modelTitle: '',
                modelShortName: '',
                modelDescription: '',
                modelMaxLength: '',
                modelMinLength: ''

            }, {
                Id: 5,
                Name: 'mo_5',
                modelTitle: '',
                modelShortName: '',
                modelDescription: '',
                modelMaxLength: '',
                modelMinLength: ''

            }, {
                Id: 6,
                Name: 'mo_6',
                modelTitle: '',
                modelShortName: '',
                modelDescription: '',
                modelMaxLength: '',
                modelMinLength: ''

            }, {
                Id: 7,
                Name: 'mo_7',
                modelTitle: '',
                modelShortName: '',
                modelDescription: '',
                modelMaxLength: '',
                modelMinLength: ''

            }, {
                Id: 8,
                Name: 'mo_8',
                modelTitle: '',
                modelShortName: '',
                modelDescription: '',
                modelMaxLength: '',
                modelMinLength: ''

            }, {
                Id: 9,
                Name: 'mo_9',
                modelTitle: '',
                modelShortName: '',
                modelDescription: '',
                modelMaxLength: '',
                modelMinLength: ''

            }, {
                Id: 10,
                Name: 'mo_10',
                modelTitle: '',
                modelShortName: '',
                modelDescription: '',
                modelMaxLength: '',
                modelMinLength: ''

            }, {
                Id: 11,
                Name: 'mo_11',
                modelTitle: '',
                modelShortName: '',
                modelDescription: '',
                modelMaxLength: '',
                modelMinLength: ''

            }, {
                Id: 12,
                Name: 'mo_12',
                modelTitle: '',
                modelShortName: '',
                modelDescription: '',
                modelMaxLength: '',
                modelMinLength: ''

            }, {
                Id: 13,
                Name: 'mo_13',
                modelTitle: '',
                modelShortName: '',
                modelDescription: '',
                modelMaxLength: '',
                modelMinLength: ''

            }, {
                Id: 14,
                Name: 'mo_14',
                modelTitle: '',
                modelShortName: '',
                modelDescription: '',
                modelMaxLength: '',
                modelMinLength: ''

            }, {
                Id: 15,
                Name: 'mo_15',
                modelTitle: '',
                modelShortName: '',
                modelDescription: '',
                modelMaxLength: '',
                modelMinLength: ''
            }
        ];
        vm.selectedIndex = 0;
        vm.masterModel = {
            mo_name: '',
            mo_desc: '',
            mo_list: vm.modelList
        };
        vm.invalidLength = false;

        function init() {
            getModelList();
        }

        init();

        vm.changColor = changColor;
        vm.saveModel = saveModel;
        vm.getModelList = getModelList;
        vm.editModel = editModel;
        vm.updateModel = updateModel;
        vm.addNewModel = addNewModel;
        vm.checkLength = checkLength;
        vm.getMasterModels = getMasterModels;
        vm.selectedMasterModel = selectedMasterModel;
        vm.saveNewModel = saveNewModel;
        vm.clearNewModel = clearNewModel;
        vm.saveMyModel = saveMyModel;

        function getMasterModels() {
            AdminCanvas
                .getMasterModels()
                .then(
                    function (response) {
                        //console.log(response.data);
                        vm.masterModels = response.data.response_data;
                    },
                    function (error) {

                    }
                )
        }

        function selectedMasterModel(data) {
            vm.newModel = data;
        }

        function saveNewModel(data) {

            vm.myNewModel = data;
            var questions = [];
            for (var idx in data) {
                if (questionKeyList.indexOf(idx) >= 0) {
                    var tempValue = data[idx].split('^');

                    questions.push({
                        Id: parseInt(idx.substring(3)),
                        Name: idx,
                        modelTitle: tempValue[0],
                        modelShortName: tempValue[1],
                        modelDescription: tempValue[2],
                        modelMaxLength: tempValue[3],
                        modelMinLength: tempValue[4]
                    });
                }
            }
            vm.myNewModel.mo_list = questions;
        }

        function clearNewModel() {
            vm.newModel = "";
            vm.myNewModel = "";
        }


        function changColor(index) {
            vm.selectedIndex = index;
        }

        function saveMyModel(data) {
            var modeldata = {
                mo_name: data.mo_name,
                mo_desc: data.mo_desc,
                mo_list: data.mo_list
            };

            AdminCanvas
                .saveMasterModel(modeldata)
                .then(function(response) {
                    clearNewModel();
                    init();
                    document.getElementById("myNewModal").style.display= "none";
                    document.getElementsByTagName("body")[0].setAttribute('class', "");
                    document.querySelectorAll('.modal-backdrop')[0].remove();
                });
        }

        function saveModel() {

            AdminCanvas
                .saveMasterModel(vm.masterModel);
            init();
        }

        function getModelList() {
            AdminCanvas
                .getModelList()
                .then(
                    function (response) {
                        //console.log(response.data);
                        vm.models = response.data.response_data;
                    }, function (error) {
                        // something went wrong
                        return $q.reject(error.data);
                    });
        }

        function editModel(model) {
            vm.selectedIndex = 0;
            vm.masterModel = {
                moID: model.moID,
                mo_name: model.mo_name,
                mo_desc: model.mo_desc,
                mo_list:  []
            };

            for (var idx in model) {
                if (questionKeyList.indexOf(idx) >= 0 && model[idx] != "") {
                    var tempValue = model[idx].split('^');
                    vm.masterModel.mo_list.push({
                        Id: parseInt(idx.substring(3)),
                        Name: idx,
                        modelTitle: tempValue[0],
                        modelShortName: tempValue[1],
                        modelDescription: tempValue[2],
                        modelMaxLength: tempValue[3],
                        modelMinLength: tempValue[4]
                    });
                }
            }
        }

        function updateModel() {

            AdminCanvas
                .updateModel(vm.masterModel)
                .success(function (data) {
                    vm.getModelList();
                }).error(function (err) {
                toastr.warning(err);
            });
        }

        function addNewModel() {
            vm.modelList =
                [
                    {
                        Id: 1,
                        Name: 'mo_1',
                        modelTitle: '',
                        modelShortName: '',
                        modelDescription: '',
                        modelMaxLength: '',
                        modelMinLength: ''

                    }, {
                    Id: 2,
                    Name: 'mo_2',
                    modelTitle: '',
                    modelShortName: '',
                    modelDescription: '',
                    modelMaxLength: '',
                    modelMinLength: ''

                }, {
                    Id: 3,
                    Name: 'mo_3',
                    modelTitle: '',
                    modelShortName: '',
                    modelDescription: '',
                    modelMaxLength: '',
                    modelMinLength: ''

                }, {
                    Id: 4,
                    Name: 'mo_4',
                    modelTitle: '',
                    modelShortName: '',
                    modelDescription: '',
                    modelMaxLength: '',
                    modelMinLength: ''

                }, {
                    Id: 5,
                    Name: 'mo_5',
                    modelTitle: '',
                    modelShortName: '',
                    modelDescription: '',
                    modelMaxLength: '',
                    modelMinLength: ''

                }, {
                    Id: 6,
                    Name: 'mo_6',
                    modelTitle: '',
                    modelShortName: '',
                    modelDescription: '',
                    modelMaxLength: '',
                    modelMinLength: ''

                }, {
                    Id: 7,
                    Name: 'mo_7',
                    modelTitle: '',
                    modelShortName: '',
                    modelDescription: '',
                    modelMaxLength: '',
                    modelMinLength: ''

                }, {
                    Id: 8,
                    Name: 'mo_8',
                    modelTitle: '',
                    modelShortName: '',
                    modelDescription: '',
                    modelMaxLength: '',
                    modelMinLength: ''

                }, {
                    Id: 9,
                    Name: 'mo_9',
                    modelTitle: '',
                    modelShortName: '',
                    modelDescription: '',
                    modelMaxLength: '',
                    modelMinLength: ''

                }, {
                    Id: 10,
                    Name: 'mo_10',
                    modelTitle: '',
                    modelShortName: '',
                    modelDescription: '',
                    modelMaxLength: '',
                    modelMinLength: ''

                }, {
                    Id: 11,
                    Name: 'mo_11',
                    modelTitle: '',
                    modelShortName: '',
                    modelDescription: '',
                    modelMaxLength: '',
                    modelMinLength: ''

                }, {
                    Id: 12,
                    Name: 'mo_12',
                    modelTitle: '',
                    modelShortName: '',
                    modelDescription: '',
                    modelMaxLength: '',
                    modelMinLength: ''

                }, {
                    Id: 13,
                    Name: 'mo_13',
                    modelTitle: '',
                    modelShortName: '',
                    modelDescription: '',
                    modelMaxLength: '',
                    modelMinLength: ''

                }, {
                    Id: 14,
                    Name: 'mo_14',
                    modelTitle: '',
                    modelShortName: '',
                    modelDescription: '',
                    modelMaxLength: '',
                    modelMinLength: ''

                }, {
                    Id: 15,
                    Name: 'mo_15',
                    modelTitle: '',
                    modelShortName: '',
                    modelDescription: '',
                    modelMaxLength: '',
                    modelMinLength: ''
                }
                ];
            vm.selectedIndex = 0;
            vm.masterModel = {
                mo_name: '',
                mo_desc: '',
                mo_list: vm.modelList
            };
        }

        function checkLength(maxLength, minLength) {
            if (parseInt(maxLength) > parseInt(minLength)) {
                vm.invalidLength = false;
            } else {
                vm.invalidLength = true;
            }
        }
    }
})();





















