/*var myApp = angular.module('myApp',['ngRoute','ngAnimate','ngTouch','ui.bootstrap','ngMessages'])
myApp.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  
  	$routeProvider.when("/",
    {
      templateUrl: "index.html",
      controller: "ValidationCtrl"       
    }).
    when("/thankyou",
    {
      templateUrl: "thankyou.html",
      controller: "ValidationCtrl"       
    })
    $routeProvider.otherwise({redirectTo:'/'})
  	
}])*/

var myApp = angular.module('myApp', ['ngRoute','ngAnimate','ngTouch','ui.bootstrap','ngMessages']);
 
var baseURL = window.location.origin;
var pathArray = window.location.pathname.split('/');
var projectPath = '/'+pathArray[1]+'/'+pathArray[2];
// var projectPath = '/'+pathArray[1];

myApp .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'index.html',
        controller: 'ValidationCtrl'
      }).
      when('/thankyou', {
        templateUrl: 'thankyou.html',
        controller: 'ValidationCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
