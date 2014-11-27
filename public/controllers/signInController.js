kimoApp.controller("SignInController", function signInController($scope, $cookieStore, $window, $http){
     $scope.title = "Kimo -  Sign In";
     $scope.formHeader = "Sign In";

     $scope.userNameGroup = ["form-group"];
     $scope.userName = "";
     $scope.userNameError = "";

     $scope.userPassGroup = ["form-group"];
     $scope.userPass = "";
     $scope.userPassError = "";

     $scope.errorMessageGroup = {"display":"none"};

     $scope.login = function(){

          $scope.errorMessageGroup = {"display":"none"};
          userNamePassword = CryptoJS.enc.Utf8.parse($scope.userName + ":" + CryptoJS.SHA1($scope.password).toString());
          encrypted = CryptoJS.enc.Base64.stringify(userNamePassword);
          console.log(encrypted);
          if(!check()){
                $http.defaults.headers.common.Authorization = 'Basic '+ encrypted;
               $http({
                 method: 'POST',
                 url: 'http://localhost:3000/signIn'
               })
               .then(function(response) {
                        if (response.data.message){
                            $scope.errorMessageGroup = {"display":"block"};
                            $scope.errorMessage = response.data.message;
                        } else if (!response.data.userName){
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
        if ($scope.userName == ""){
           $scope.userNameError = "You must type your username";
           $scope.userNameGroup = ["form-group", "has-error"];
           isError = true;
        } else {
           $scope.userNameError = "";
           $scope.userNameGroup = ["form-group"];
        }

        if ($scope.password == ""){
           $scope.userPassError = "You must type your password";
           $scope.userPassGroup = ["form-group", "has-error"];
           isError = true;
        } else {
           $scope.userPassError = "";
           $scope.userPassGroup = ["form-group"];
        }

        return isError;
     };
});






