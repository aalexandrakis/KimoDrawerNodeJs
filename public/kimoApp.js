var kimoApp = angular.module("kimoApp", ['ngRoute', 'ngCookies']);

kimoApp.directive('headerDirective', function() {
                  return {
                    templateUrl: "partials/headers.html",
                    controller: 'HeadersController'
                  };
       });
kimoApp.factory('Commons', function($cookieStore){
    authorization = ""
    if (!angular.isUndefined($cookieStore.get("user"))){
        authorization =  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse($cookieStore.get("user").userName + ":" + CryptoJS.SHA1($cookieStore.get("user").userPassword).toString()))
    }
    return {
        apiEndPoint: "http://localhost:3000",
        authorization: authorization
    }
});

kimoApp.run(function($rootScope, $location, $cookieStore){
    $rootScope.$on('$routeChangeStart', function(event, route){
        if (route.mustBeLoggedOn && angular.isUndefined($cookieStore.get("user"))) {
            // reload the login route
            alert('You must be logged on to visit this page');
            window.location = '#/signIn';
        }

    });
});
//Do configuration and routing here
kimoApp.config(function($routeProvider){
    $routeProvider
        .when("/signIn",{
            controller: "SignInController",
            templateUrl: "partials/signIn.html",
            mustBeLoggedOn: false
        }).when("/drawer",{
            controller: "DrawerController",
            templateUrl: "partials/drawer.html",
            mustBeLoggedOn: true
        }).otherwise("/#");
});

