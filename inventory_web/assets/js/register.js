app.controller('registerController', function ($rootScope, $scope, $http, $location) {
  this.ime = " ";
  this.pass = " ";
  this.passConf = " ";
  var self = this;
  $rootScope.registerSuccess = false;

  this.send = function (ime, pass, passConf) {
    self.ime = ime;
    self.pass = pass;
    self.passConf = passConf;

    if (pass == passConf) {
      var data = { ime:ime, pass: pass };
      $http(
        {
          data: data,
          method: 'POST',
          url: '/register'
        }).then(function successCallback(res) {
          console.log("response", res);
          $rootScope.registerSuccess = true;
          $location.path('/');
        }, function errorCallback(res) {
          console.log("error");
          $rootScope.registerSuccess = false;
        });
    }
    else {
      console.log("password doesn't match");
      $rootScope.registerSuccess = false;
    }
  };


});