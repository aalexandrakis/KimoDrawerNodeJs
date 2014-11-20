kimoApp.controller("DrawerController", function drawerController($scope, $cookieStore, $window, $http, $interval){
     $scope.title = "Kimo -  Drawer";
     $scope.formHeader = "Drawer";
     $scope.alerts = [];


  getDrawer();

  $scope.removeAlert = function(index){
     $scope.alerts.remove(index);
  }

  interval1 = $interval(function(){
                      $scope.alerts = [];
                    }, 3000, 1);

  $scope.isDateValid = function(){
    if (!angular.isUndefined($scope.startDate)){
        return true;
    } else {
        return false;
    }
  }

  $scope.makeOneDraw = function(){
      $http({
             url: '/drawerService/makeOneDraw',
             method: "GET"
         })
       .then(function (response){
              console.log(response);
              if (response.status == 200){
                  $scope.alerts.push(response.data);
              }
       });
  }

  $scope.startDrawer = function(){
      $http({
             url: '/drawerService/startDrawer/' + $scope.startDate.replace(/-/g, "").replace(/:/g, "").replace(/ /g, "") + "00",
             method: "GET"
         })
       .then(function (response){
              if (response.status == 200){
                  $scope.alerts.push(response.data);
                  $scope.isDrawerActive = true;
              }
       });
  }

  $scope.stopDrawer = function(){
        $http({
               url: '/drawerService/stopDrawer',
               method: "GET"
           })
         .then(function (response){
                if (response.status == 200){
                    $scope.alerts.push(response.data);
                    $scope.isDrawerActive = false;
                }
         });
  }

  function getDrawer(){
        $http({
               url: '/drawerService/getDrawer',
               method: "GET"
           })
         .then(function (response){
                console.log(response);
                if (response.status == 200){
                    if (response.data == true) {
                        $scope.isDrawerActive = true;
                    } else {
                        $scope.isDrawerActive = false;
                    }
                } else {
                    $scope.isDrawerActive = false;
                }
         });
  }



});






