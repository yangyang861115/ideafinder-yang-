(function () {
    angular
        .module("myApp")
        .controller("UserPanelController", userPanelController);

    function userPanelController($window, Canvas) {
        var vm = this;
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
        vm.modelSelected = false;
        vm.canvasList = [];
        vm.selectedIndex = 0;
        vm.masterModel = {
            ca_title: "",
            ca_desc: "",
            ca_model: "",
            Question: vm.canvasList
        };
        vm.userResponces = [];

        vm.getModelList = getModelList;
        vm.getResponces = getResponces;
        vm.viewData = viewData;
        vm.selectedModel = selectedModel;
        vm.changColor = changColor;
        vm.saveCanvas = saveCanvas;
        vm.viewPDF = viewPDF;
        vm.editResponce = editResponce;

        function getModelList() {
            Canvas
                .getModelList()
                .then(
                    function (response) {
                        vm.models = response.data.response_data;
                    }, function (error) {
                        // something went wrong
                        return $q.reject(error.data);
                    });

        }

        function getResponces() {
            localStorage.setItem("qu_mcID", '');
            localStorage.setItem("ca_title", '');
            localStorage.setItem("ca_desc", '');

            Canvas
                .getResponces()
                .then(
                    function (response) {
                        vm.responceList = response.data.response_data;
                        console.log(vm.responceList);
                    },
                    function (error) {
                        // something went wrong
                        return $q.reject(error.data);
                    });
        }

        function viewData(data) {
            vm.showData = data;
        }

        function selectedModel(model) {
            vm.modelSelected = true;

            var tempValue1 = model.mo_1.split('^');
            var tempValue2 = model.mo_2.split('^');
            var tempValue3 = model.mo_3.split('^');
            var tempValue4 = model.mo_4.split('^');
            var tempValue5 = model.mo_5.split('^');
            var tempValue6 = model.mo_6.split('^');
            var tempValue7 = model.mo_7.split('^');
            var tempValue8 = model.mo_8.split('^');
            var tempValue9 = model.mo_9.split('^');
            var tempValue10 = model.mo_10.split('^');
            var tempValue11 = model.mo_11.split('^');
            var tempValue12 = model.mo_12.split('^');
            var tempValue13 = model.mo_13.split('^');
            var tempValue14 = model.mo_14.split('^');
            var tempValue15 = model.mo_15.split('^');

            vm.modelList = [
                {
                    Id: 1,
                    Name: 'mo_1',
                    modelTitle: tempValue1[0],
                    modelShortName: tempValue1[1],
                    modelDescription: tempValue1[2],
                    modelMaxLength: tempValue1[3],
                    modelMinLength: tempValue1[4]

                }, {
                    Id: 2,
                    Name: 'mo_2',
                    modelTitle: tempValue2[0],
                    modelShortName: tempValue2[1],
                    modelDescription: tempValue2[2],
                    modelMaxLength: tempValue2[3],
                    modelMinLength: tempValue2[4]

                }, {
                    Id: 3,
                    Name: 'mo_3',
                    modelTitle: tempValue3[0],
                    modelShortName: tempValue3[1],
                    modelDescription: tempValue3[2],
                    modelMaxLength: tempValue3[3],
                    modelMinLength: tempValue3[4]

                }, {
                    Id: 4,
                    Name: 'mo_4',
                    modelTitle: tempValue4[0],
                    modelShortName: tempValue4[1],
                    modelDescription: tempValue4[2],
                    modelMaxLength: tempValue4[3],
                    modelMinLength: tempValue4[4]

                }, {
                    Id: 5,
                    Name: 'mo_5',
                    modelTitle: tempValue5[0],
                    modelShortName: tempValue5[1],
                    modelDescription: tempValue5[2],
                    modelMaxLength: tempValue5[3],
                    modelMinLength: tempValue5[4]

                }, {
                    Id: 6,
                    Name: 'mo_6',
                    modelTitle: tempValue6[0],
                    modelShortName: tempValue6[1],
                    modelDescription: tempValue6[2],
                    modelMaxLength: tempValue6[3],
                    modelMinLength: tempValue6[4]

                }, {
                    Id: 7,
                    Name: 'mo_7',
                    modelTitle: tempValue7[0],
                    modelShortName: tempValue7[1],
                    modelDescription: tempValue7[2],
                    modelMaxLength: tempValue7[3],
                    modelMinLength: tempValue7[4]

                }, {
                    Id: 8,
                    Name: 'mo_8',
                    modelTitle: tempValue8[0],
                    modelShortName: tempValue8[1],
                    modelDescription: tempValue8[2],
                    modelMaxLength: tempValue8[3],
                    modelMinLength: tempValue8[4]

                }, {
                    Id: 9,
                    Name: 'mo_9',
                    modelTitle: tempValue9[0],
                    modelShortName: tempValue9[1],
                    modelDescription: tempValue9[2],
                    modelMaxLength: tempValue9[3],
                    modelMinLength: tempValue9[4]

                }, {
                    Id: 10,
                    Name: 'mo_10',
                    modelTitle: tempValue10[0],
                    modelShortName: tempValue10[1],
                    modelDescription: tempValue10[2],
                    modelMaxLength: tempValue10[3],
                    modelMinLength: tempValue10[4]

                }, {
                    Id: 11,
                    Name: 'mo_11',
                    modelTitle: tempValue11[0],
                    modelShortName: tempValue11[1],
                    modelDescription: tempValue11[2],
                    modelMaxLength: tempValue11[3],
                    modelMinLength: tempValue11[4]

                }, {
                    Id: 12,
                    Name: 'mo_12',
                    modelTitle: tempValue12[0],
                    modelShortName: tempValue12[1],
                    modelDescription: tempValue12[2],
                    modelMaxLength: tempValue12[3],
                    modelMinLength: tempValue12[4]

                }, {
                    Id: 13,
                    Name: 'mo_13',
                    modelTitle: tempValue13[0],
                    modelShortName: tempValue13[1],
                    modelDescription: tempValue13[2],
                    modelMaxLength: tempValue13[3],
                    modelMinLength: tempValue13[4]

                }, {
                    Id: 14,
                    Name: 'mo_14',
                    modelTitle: tempValue14[0],
                    modelShortName: tempValue14[1],
                    modelDescription: tempValue14[2],
                    modelMaxLength: tempValue14[3],
                    modelMinLength: tempValue14[4]

                }, {
                    Id: 15,
                    Name: 'mo_15',
                    modelTitle: tempValue15[0],
                    modelShortName: tempValue15[1],
                    modelDescription: tempValue15[2],
                    modelMaxLength: tempValue15[3],
                    modelMinLength: tempValue15[4]
                }
            ];

            vm.canvasList = [];

            angular.forEach(vm.modelList, function (value, key) {
                if (value.modelTitle) {
                    this.push(
                        {
                            'qu_map': value.Name,
                            'qu_short': value.modelTitle,
                            'qu_quest': value.modelShortName,
                            'qu_desc': value.modelDescription,
                            'qu_max': value.modelMaxLength,
                            'qu_min': value.modelMinLength
                        });
                }
            }, vm.canvasList);

            vm.masterModel.ca_model = model.moID;
            vm.masterModel.Question = vm.canvasList;
        }

        function changColor(index) {
            vm.selectedIndex = index;
        }

        function saveCanvas() {
            Canvas.saveCanvas(vm.masterModel);
        }

        function viewPDF(responce) {
            //need to find the baseUrl
            var baseURL = "";
            $window.open(baseURL + '/' + responce.pdf_report_url);
        }

        function editResponce(responce) {
            Canvas.editResponce(responce.ucID);
        }

    }

})();
