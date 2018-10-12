angular
  .module("app")
  .controller("AppCtrl", function($scope, $http) {
    (this.clear = () => {
      $http({
        method: "POST",
        url: "/drop"
      }).then(function() {
        $route.reload();
      });
    }),
      (this.ShowWeather = cityname => {
        $http({
          method: "POST",
          url: "/data",
          data: { name: cityname },
          headers: { "Content-Type": "application/json" }
        }).then(function() {
          window.location.reload();
        });
      }),
      $http({
        method: "GET",
        url: "/data"
      }).then(
        function Done(res) {
          $scope.Cities = res.data;
        },
        function Err(res) {
          $scope.Cities = res.statusText;
        }
      );
  })
  .component("app", {
    bindings: {},
    controller: "AppCtrl",
    templateUrl: "/templates/app.html"
  });
