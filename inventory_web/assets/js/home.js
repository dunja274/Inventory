app.controller('homeController', function ($rootScope, $scope, $http, $location, $routeParams, $localStorage, $route) {
  var self = this;

  this.new = function () {
    
    $location.path('/new');
    console.log($localStorage.token);
  };

  $rootScope.redirect = function () {
    if ($localStorage.token == undefined) {
      $location.path("/");
    }
  };

  this.logOut = function () {
    $route.reload();
    $localStorage.$reset();
    $location.path('/');
  };


  this.categoryPick = function (kategorija, index) {
    $scope.selected = index;
    $rootScope.kat = kategorija;
   $location.path('/kategorija/' + kategorija);
  };

  $http(
    {
      method: 'POST',
      url: '/home'
    }).then(function successCallback(res) {
      $localStorage.category = res.data.category;
      $localStorage.ucionice = res.data.ucionice;
      $localStorage.stanje = res.data.stanje;
      $localStorage.objekti = res.data.objekti;
    }, function errorCallback(res) {
      console.log("error");
      $rootScope.registerSuccess = false;
    });


});