app.controller('MainController', function ($scope, $http, $route, $routeParams, $location, $window, $localStorage) 
{

   $scope.$route = $route;
   $scope.$location = $location;
   $scope.$routeParams = $routeParams;
   $scope.$storage = $localStorage;


  
});

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/',
    {
     templateUrl: 'views/logini.html',
      controller: 'loginController as login',
     })
    .when('/register',
    {
      templateUrl: 'views/register.html',
      controller: 'registerController as register'
    })
    .when('/home',
    {
      templateUrl: 'views/home_boot.html',
      controller: 'homeController as home'
    })
    .when('/new',
    {
      templateUrl: 'views/new_boot.html',
      controller: 'newController as new'
    })
    .when('/kategorija/:kat',
    {
      templateUrl: 'views/kategorija.html',
      controller: 'categoryController as cat'
    })
    .otherwise(
      {
          //home     
      })
    $locationProvider.html5Mode(true);
});



