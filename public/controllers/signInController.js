kimoApp.controller("SignInController", function signInController($scope, $cookieStore, $window, $http){
     $scope.title = "Kimo -  Sign In";
     $scope.formHeader = "Sign In";

     $scope.adminEmailGroup = ["form-group"];
     $scope.adminEmail = "";
     $scope.adminEmailError = "";

     $scope.adminPassGroup = ["form-group"];
     $scope.adminPass = "";
     $scope.adminPassError = "";

     $scope.errorMessageGroup = {"display":"none"};

     $scope.login = function(){

          $scope.errorMessageGroup = {"display":"none"};
          if(!check()){

               $http({
                 url: '/signIn',
                 method: "POST",
                 data: {'adminEmail' : $scope.adminEmail , "adminPass": CryptoJS.SHA1($scope.adminPass).toString()}
               })
               .then(function(response) {
                        if (response.data.message){
                            $scope.errorMessageGroup = {"display":"block"};
                            $scope.errorMessage = response.data.message;
                        } else if (!response.data.adminEmail){
                            $scope.errorMessageGroup = {"display":"block"};
                            $scope.errorMessage = response.data;
                        } else {
                            $scope.errorMessageGroup = {"display":"none"};
                            $cookieStore.put("user" , response.data);
                            $window.location.href = '#/drawer';
                        }

                  },
                  function(response) { // optional
                      // failed
                    $scope.errorMessageGroup = {"display":"block"};
                    $scope.errorMessage = "The request could not reach the server. Please try again later";
                  }
              );
          }
     };

     check = function(){
        isError = false;
        if ($scope.adminEmail == ""){
           $scope.adminEmailError = "You must type your email";
           $scope.adminEmailGroup = ["form-group", "has-error"];
           isError = true;
        } else {
           $scope.adminEmailError = "";
           $scope.adminEmailGroup = ["form-group"];
        }

        if ($scope.adminPass == ""){
           $scope.adminPassError = "You must type your password";
           $scope.adminPassGroup = ["form-group", "has-error"];
           isError = true;
        } else {
           $scope.adminPassError = "";
           $scope.adminPassGroup = ["form-group"];
        }

        return isError;
     };
});






