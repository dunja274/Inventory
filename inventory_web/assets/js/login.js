app.controller('loginController', function($rootScope, $scope, $http, $location, $localStorage)
{
  this.ime = " ";
  this.pass = " ";
  var self = this;
   
  console.log($localStorage.token);
  console.log($localStorage.loginSuccess);

  this.redirect = function()
  {
    $location.path('/register');

  };

  this.send = function(ime, pass) 
  {
    self.ime = ime;
    self.pass = pass;
    
    var data = {ime:ime, pass:pass};
    $http(
    {
      data: data,
      method : 'POST',
      url : '/auth'
    }).then(function successCallback(res) 
    {
      console.log("response", res);
      $localStorage.loginSuccess = true;
      $localStorage.token = res.data.token;
     
      //window.location.href = '/home';
     
      $location.path('/home');
      
    }, function errorCallback(res) 
    {
      console.log("error");
      $rootScope.registerSuccess = false;
    });
  };

});