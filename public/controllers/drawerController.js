kimoApp.controller("DrawerController", function drawerController($scope, $cookieStore, $window, $http, $interval, Commons){
  $scope.title = "Kimo -  Drawer";
  $scope.formHeader = "Drawer";
  $scope.alerts = [];
  $scope.errorStyle = {"display":"none"};
  $scope.lazyLoadStyle = {"display" : "none"};
  $scope.tableStyle = {"display":"none"};

  getDrawer();

  $scope.removeAlert = function(index){
     $scope.alerts.splice(index, 1);
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
             method: "GET",
             headers: {'authorization' : 'Basic ' + Commons.authorization}
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

  $scope.getDrawInfo = function(){
          if (!angular.isUndefined(drawInfoDate) || drawInfoDate != ""){
                  $scope.tableStyle = {"display":"none"};
                  $scope.errorStyle = {"display":"none"};
                  $scope.lazyLoadStyle = {"display" : "block"};
                  url = '/getDrawInfo/' + $scope.drawInfoDate.replace(/-/g, "").replace(/:/g, "").replace(/ /g, "");
                  $http({
                       url: url,
                       method: "GET"
                     })
                     .then(
                        function(response) {
                              $scope.lazyLoadStyle = {"display" : "none"};
                              if (response.status == 500){
                                  $scope.errorStyle = {"display":"block"};
                                  $scope.errorMessage = response.data;
                              } else {
                                  $scope.tableStyle = {"display":"block"};
                                  console.log(response.data);
                                  $scope.infos = response.data;
                                  $scope.infos.forEach(function(info){
                                      info.drawDateTime = fromIsoToEuro(new Date(info.drawDateTime));
                                  });
                              }

                        },
                        function(response) { // optional
                            // failed
                          $scope.lazyLoadStyle = {"display" : "none"};
                          $scope.tableStyle = {"display":"block"};
                          $scope.errorMessage = "The request could not reach the server. Please try again later";
                        }
                  );
              } else {

              }
      };

});



