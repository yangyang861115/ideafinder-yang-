adminApp.factory('modelMasterService', function ($http, $resource, Auth) {

    var userId = Auth.getUserId();
    return {

        saveMasterModel: function (data2) {

            var data = {
                user_id: userId,
                data: data2
            }
            var response = $http.post(baseURL + '/brasstacksapi/index.php/Api/model', data);
            response.success(function (data) {
                toastr.success(data.message);
            }).error(function (err) {
                toastr.warning(err);
            });
            return response;
        },

        getModelList: function () {

            var data = {
                params: {user_id: userId}
            }

            return $http.get(baseURL + '/brasstacksapi/index.php/Api/model', data);

        },

        updateModel: function (masterModel) {

            var data = {
                user_id: userId,
                data: masterModel
            }
            var response = $http.put(baseURL + '/brasstacksapi/index.php/Api/model', data);
            response.success(function (data) {
                toastr.success(data.message);
            }).error(function (err) {
                toastr.warning(err);
            });
            return response;
        }


    }
});


var s = {
    "modelList": [{
        "Id": 1,
        "Name": "mo_1",
        "modelTitle": "Age",
        "modelShortName": "What is your age",
        "modelDescription": "State your age as a full spelled out phrase",
        "modelMaxLength": "30",
        "modelMinLength": "5"
    }, {
        "Id": 2,
        "Name": "mo_2",
        "modelTitle": "Location",
        "modelShortName": "Where do you live",
        "modelDescription": "State where you live as a phrase",
        "modelMaxLength": "30",
        "modelMinLength": "5"
    }, {
        "Id": 3,
        "Name": "mo_3",
        "modelTitle": ""
    },
        {
            "Id": 4,
            "Name": "mo_4",
            "modelTitle": ""
        }, {
            "Id": 5,
            "Name": "mo_5",
            "modelTitle": ""
        }, {"Id": 6, "Name": "mo_6", "modelTitle": ""},
        {"Id": 7, "Name": "mo_7", "modelTitle": ""}, {
            "Id": 8,
            "Name": "mo_8",
            "modelTitle": ""
        }, {"Id": 9, "Name": "mo_9", "modelTitle": ""}, {"Id": 10, "Name": "mo_10", "modelTitle": ""}, {
            "Id": 11,
            "Name": "mo_11",
            "modelTitle": ""
        }, {"Id": 12, "Name": "mo_12", "modelTitle": ""}, {"Id": 13, "Name": "mo_13", "modelTitle": ""}, {
            "Id": 14,
            "Name": "mo_14",
            "modelTitle": ""
        }, {"Id": 15, "Name": "mo_15", "modelTitle": ""}],


    "selectedIndex": 0,
    "masterModel": {
        "moID": "1",
        "mo_name": "Two Question Test",
        "mo_desc": "This model will only use two questions.",
        "mo_list": [{
            "Id": 1,
            "Name": "mo_1",
            "modelTitle": "Age",
            "modelShortName": "What is your age",
            "modelDescription": "State your age as a full spelled out phrase",
            "modelMaxLength": "30",
            "modelMinLength": "5"
        }, {
            "Id": 2,
            "Name": "mo_2",
            "modelTitle": "Location",
            "modelShortName": "Where do you live",
            "modelDescription": "State where you live as a phrase",
            "modelMaxLength": "30",
            "modelMinLength": "5"
        }, {"Id": 3, "Name": "mo_3", "modelTitle": ""}, {"Id": 4, "Name": "mo_4", "modelTitle": ""}, {
            "Id": 5,
            "Name": "mo_5",
            "modelTitle": ""
        }, {"Id": 6, "Name": "mo_6", "modelTitle": ""}, {"Id": 7, "Name": "mo_7", "modelTitle": ""}, {
            "Id": 8,
            "Name": "mo_8",
            "modelTitle": ""
        }, {"Id": 9, "Name": "mo_9", "modelTitle": ""}, {"Id": 10, "Name": "mo_10", "modelTitle": ""}, {
            "Id": 11,
            "Name": "mo_11",
            "modelTitle": ""
        }, {"Id": 12, "Name": "mo_12", "modelTitle": ""}, {"Id": 13, "Name": "mo_13", "modelTitle": ""}, {
            "Id": 14,
            "Name": "mo_14",
            "modelTitle": ""
        }, {"Id": 15, "Name": "mo_15", "modelTitle": ""}]
    },
    "invalidLength": false,
    "models": [{
        "moID": "1",
        "mo_name": "Two Question Test",
        "mo_desc": "This model will only use two questions.",
        "mo_1": "Age^What is your age^State your age as a full spelled out phrase^30^5",
        "mo_2": "Location^Where do you live^State where you live as a phrase^30^5",
        "mo_3": "",
        "mo_4": "",
        "mo_5": "",
        "mo_6": "",
        "mo_7": "",
        "mo_8": "",
        "mo_9": "",
        "mo_10": "",
        "mo_11": "",
        "mo_12": "",
        "mo_13": "",
        "mo_14": "",
        "mo_15": ""
    }, {
        "moID": "5",
        "mo_name": "Ten Question Model",
        "mo_desc": "This model model 1 desc",
        "mo_1": "Short Question 1^Question One as a full question.^Question 1 with a longer description^42^3",
        "mo_2": "",
        "mo_3": "short question 3^question 3^question 3 desc^12^2",
        "mo_4": "",
        "mo_5": "short question 5^question 5 ?^question 5 desc^55^4",
        "mo_6": "short question 6^question 6 ?^question 6 desc^44^2",
        "mo_7": "",
        "mo_8": "",
        "mo_9": "short question 9^question 9 ?^question 9 desc^7^2",
        "mo_10": "",
        "mo_11": "",
        "mo_12": "",
        "mo_13": "",
        "mo_14": "",
        "mo_15": ""
    }, {
        "moID": "6",
        "mo_name": "Fish net",
        "mo_desc": "Description is",
        "mo_1": "short name^quesion^description^40^10",
        "mo_2": "",
        "mo_3": "",
        "mo_4": "",
        "mo_5": "",
        "mo_6": "",
        "mo_7": "",
        "mo_8": "",
        "mo_9": "",
        "mo_10": "",
        "mo_11": "",
        "mo_12": "",
        "mo_13": "",
        "mo_14": "",
        "mo_15": ""
    }]
};



