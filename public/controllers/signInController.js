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
//          adminEmailPassword = CryptoJS.enc.Utf8.parse($scope.adminEmail + ":" + CryptoJS.SHA1($scope.password).toString());
//          encrypted = CryptoJS.enc.Base64.stringify(adminEmailPassword);
          data = {
                adminEmail: $scope.adminEmail,
                password: CryptoJS.SHA1($scope.password).toString()
          };
          if(!check()){
               $http({
                 method: 'POST',
                 url: '/signIn',
                 headers: {
                    'content-type': 'application/json',
                    'content-length': angular.fromJson(data).length
                 },
                 data: data
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
           $scope.adminEmailError = "You must type your adminEmail";
           $scope.adminEmailGroup = ["form-group", "has-error"];
           isError = true;
        } else {
           $scope.adminEmailError = "";
           $scope.adminEmailGroup = ["form-group"];
        }

        if ($scope.password == ""){
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






