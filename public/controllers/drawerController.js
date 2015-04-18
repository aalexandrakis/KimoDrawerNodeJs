kimoApp.controller("DrawerController", function drawerController($scope, $cookieStore, $window, $http, $interval){
  $scope.title = "Kimo -  Drawer";
  $scope.formHeader = "Drawer";
  $scope.alerts = [];
  $scope.errorStyle = {"display":"none"};
  $scope.lazyLoadStyle = {"display" : "none"};
  $scope.tableStyle = {"display":"none"};

  successClass = ["alert", "alert-success", "alert-dismissable"];
  unsuccessClass = ["alert", "alert-danger", "alert-dismissable"];

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
             url: '/drawerService/makeOneDraw/' + moment().format("YYYYMMDDHHmmss"),
             method: "GET"
         })
       .then(function (response){
              if (response.status == 200){
                  $scope.alerts.push({class:successClass, status:200, message:new Date() + " " + response.data});
              }
       },function (response){
                       $scope.alerts.push({class:unsuccessClass, status:500, message:new Date() + " " + response.data});
       });
  }

$scope.createTestBets = function(){
      $http({
             url: '/testBets/' + $scope.betsToCreate,
             method: "GET"
         })
       .then(function (response){
              $scope.alerts.push({class:successClass, status:200, message:new Date() + " " + response.data});
       },function (response){
               $scope.alerts.push({class:unsuccessClass, status:500, message:new Date() + " " + response.data});
       });
  }

  function isoDate(timestamp){
       return timestamp.getFullYear().toString() +
           (timestamp.getMonth() + 1 < 10 ? ("0" + timestamp.getMonth() + 1) : (timestamp.getMonth() + 1)).toString() +
           (timestamp.getDate() < 10 ? "0" + timestamp.getDate() : timestamp.getDate()).toString() +
           (timestamp.getHours() < 10 ? "0" + timestamp.getHours() : timestamp.getHours()).toString() +
           (timestamp.getMinutes() < 10 ? "0" + timestamp.getMinutes() : timestamp.getMinutes()).toString() +
           (timestamp.getSeconds() < 10 ? "0" + timestamp.getSeconds() : timestamp.getSeconds()).toString();
  }
  $scope.startDrawer = function(){
        console.log($scope.startDate);
        regExp = /(\d{2}).(\d{2}).(\d{4}).(\d{2}).(\d{2})/;
        dateArray = regExp.exec($scope.startDate);
        scopeDate = new Date(dateArray[3], dateArray[2], dateArray[1], dateArray[4], dateArray[5], '00');
        diff = scopeDate - new Date() ;
        console.log(isoDate(scopeDate), '-', new Date(), '=', diff);

      $http({
             url: '/drawerService/startDrawer/' + isoDate(scopeDate) + "/" + diff * 1,
             method: "GET"
         })
       .then(function (response){
              if (response.status == 200){
                  $scope.alerts.push({class:successClass, status:200, message:new Date() + " " + response.data});
                  $scope.isDrawerActive = true;
              }
       },function (response){
               $scope.alerts.push({class:unsuccessClass, status:500, message:new Date() + " " + response.data});
       });
  }

  $scope.stopDrawer = function(){
        $http({
               url: '/drawerService/stopDrawer',
               method: "GET"
           })
         .then(function (response){
                if (response.status == 200){
                    $scope.alerts.push({class:successClass, status:200, message:new Date() + " " + response.data});
                    $scope.isDrawerActive = false;
                }
         },function (response){
                         $scope.alerts.push({class:unsuccessClass, status:500, message:new Date() + " " + response.data});
         });
  }

  function getDrawer(){
        $http({
               url: '/drawerService/getDrawer',
               method: "GET"
           })
         .then(function (response){
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



