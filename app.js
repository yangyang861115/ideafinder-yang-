/**
 * Created by yangyang on 3/31/16.
 */
(function () {
    angular
        .module("myApp",
            ['ngRoute', 'ngStorage', 'ngAnimate', 'ngResource', 'ngTouch','ngMessages', 'ui.bootstrap', 'ui.validate'])
        .constant("myConfig", {
            "baseURL": window.location.origin,
            "pathArray": window.location.pathname.split('/'),
            "projectPath": '/' + window.location.pathname.split('/')[1]
        });
})();
