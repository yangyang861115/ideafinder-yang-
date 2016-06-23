var adminApp = angular.module('adminApp', [
  'ngRoute',
  'ui.bootstrap',
  'ngAnimate',
  'ngResource'
]);

var baseURL = window.location.origin;
var pathArray = window.location.pathname.split('/');
// var projectPath = '/'+pathArray[1]+'/'+pathArray[2];
var projectPath = '/'+pathArray[1];

adminApp.config(['$routeProvider',
  function($routeProvider){

    $routeProvider
    // .when('/',{
    //     templateUrl: 'views/questionList/questionList.html',
    //     controller: 'questionListController'
    // })
    .when('/modelMaster',{
        templateUrl: 'views/modelMaster/modelMaster.html',
        controller: 'modelMasterController'
    }).
    otherwise({
        redirectTo: '/modelMaster'
    });

}]);
