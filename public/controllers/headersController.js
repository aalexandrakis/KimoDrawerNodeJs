kimoApp.controller("HeadersController", function headersController($scope, $http, $cookieStore, $window){
      $scope.isLoggedOn = function(){
          if ($cookieStore.get("user")){
             return true;
          } else {
             return false;
          }
      };

      $scope.signOut = function(){
          if ($scope.isLoggedOn()){
             $http({
               url: '/signOut',
               method: "POST"
           }).then(function(response){
               $cookieStore.remove("user");
               $window.location.href="#/index";
           }, function(response){
                console.log("log out failed");
           });
          }
      };
});






