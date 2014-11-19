kimoApp.controller("DrawerController", function drawerController($scope, $cookieStore, $window, $http, $interval){
     $scope.title = "Kimo -  Drawer";
     $scope.formHeader = "Drawer";
     $scope.alerts = [];

  console.log(drawer.globalNextDraw);
  $scope.removeAlert = function(index){
     $scope.alerts.remove(index);
  }

  $scope.isDateValid = function(){
    if (!angular.isUndefined($scope.startDate)){
        return true;
    } else {
        return false;
    }
  }

  $scope.makeDraw = function(){
      $http({
             url: '/drawer',
             method: "POST",
             data:{drawDate:  $scope.startDate.replace(/-/g, "").replace(/:/g, "").replace(/ /g, "")}
       })
       .then(function (response){
              parseData(response);
              if (response.status = 200){
                  $scope.alerts.push(response.data);
                  interval1 = $interval(function(){
                  }, 3000, 1);
              } else {
              }
       });
  }


  interval1 = $interval(function(){
    getInfoData();
  }, 180000, 0);
});






