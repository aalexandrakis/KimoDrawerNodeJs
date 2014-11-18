var kimoApp = angular.module("kimoApp", ['ngRoute', 'ngCookies']);

kimoApp.directive('headerDirective', function() {
                  return {
                    templateUrl: "partials/headers.html",
                    controller: 'HeadersController'
                  };
       });

//Do configuration and routing here
kimoApp.config(function($routeProvider){
    $routeProvider
        .when("/signIn",{
            controller: "SignInController",
            templateUrl: "partials/signIn.html",
            mustBeLoggedOn: false
        }).otherwise("/#");
});

