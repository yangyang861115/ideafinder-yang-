var adminApp = angular.module('adminApp', [
    'ngRoute',
    'ui.bootstrap',
    'ngAnimate',
    'ngResource'
]);

var baseURL = window.location.origin;
var pathArray = window.location.pathname.split('/');
// var projectPath = '/'+pathArray[1]+'/'+pathArray[2];
var projectPath = '/' + pathArray[1];

adminApp
    .config(configuration)
    .run(restrict);


function configuration($routeProvider, $httpProvider) {

    $routeProvider
        .when('/modelMaster', {
            templateUrl: 'views/modelMaster/modelMaster.html',
            controller: 'modelMasterController'
        })
        .otherwise({
            redirectTo: '/modelMaster'
        });

    $httpProvider.interceptors.push(authInterceptor);

    function authInterceptor(Auth, $window) {
        return {
            // automatically attach Authorization header
            request: function (config) {
                var token = Auth.getToken();
                if (token) {
                    config.headers.Authorization = token;
                }
                return config;
            },

            // If a token was sent back, save it
            response: function (res) {
                if (res.data.token) {
                    Auth.saveToken(res.data.token);
                }

                return res;
            },

            responseError: function (res) {
                if (res.status === 401) {
                    $window.location = "#/login";
                }
            }
        }
    }

}

function restrict($rootScope, $location, Auth) {
    $rootScope.$on("$routeChangeStart", function (event, next) {
        console.log("Have you logged in ? " + Auth.isAuthed());
        if (!Auth.isAuthed()) {
            location.href = "http://ideafinder.org/#/";
        }
    });
}
