/**
 * Created by yangyang on 3/2/16.
 */
(function () {
    angular
        .module("myApp")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.html",
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/dashboard", {
                templateUrl: "views/dashboard/dashboard.view.html",
                controller: "DashboardController",
                controllerAs: "model",
                resolve : {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/userpanel", {
                templateUrl: "views/dashboard/userpanel.view.html",
                resolve : {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/adminpanel", {
                templateUrl: "views/dashboard/adminpanel.view.html",
                resolve : {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/lesson", {
                templateUrl: "views/lesson/lesson.view.html",
                controller: "LessonController",
                controllerAs: "model"
            })
            .when("/lesson/:study/:lesson/:page", {
                templateUrl: "views/lesson/lesson.view.html",
                controller: "LessonController",
                controllerAs: "model"
            })
            .when("/api_return/:tokenstring", {
                templateUrl: "views/redirect/redirect.view.html",
                controller: "RedirectController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/"
            });

        function  checkLoggedIn(Auth, User, $location, $q){
            var deferred = $q.defer();
            var token = Auth.getToken();
            if(token) {
                User.validateToken()
                    .then(
                        function(response){
                            if(response && response.data.success) {
                                deferred.resolve();
                            } else {
                                deferred.reject();
                                $location.url('/login');
                            }
                        },
                        function(err){
                            deferred.reject();
                            $location.url('/login');
                        }
                    );
            } else {
                var cookieToken = Auth.getTokenFromCookie();
                if(cookieToken) {
                    Auth.saveToken(cookieToken, function () {
                        User.validateToken(cookieToken)
                            .then(function(response){
                                if (response && response.data.success) {
                                    deferred.resolve();
                                }
                                else {
                                    $window.localStorage.removeItem('jwtToken');
                                    Auth.deleteRememberMeCookie();
                                    deferred.reject();
                                    $location.url('/login');
                                }
                            });
                    });
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            }
            return deferred.promise;
        }


        $httpProvider.interceptors.push(authInterceptor);

        function authInterceptor(Auth, $window) {
            return {
                // automatically attach Authorization header
                request: function (config) {
                    var token = $window.sessionStorage['jwtToken'];
                    //console.log("the token in the header is ");
                    //console.log(token);
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

})();
