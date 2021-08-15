app.controller('newController', function ($rootScope, $scope, $http, $location, $localStorage) {

    var self = this;
    this.ime = " ";
    this.ucionica = " ";
    this.garancija = " ";
    this.datum = " ";
    this.stanje = " ";
    this.kategorija = " ";

    this.send = function (ime, ucionica, garancija, datum, stanje, kategorija) {

        this.ime = ime;
        this.ucionica = ucionica;
        this.garancija = garancija;
        this.datum = datum;
        this.stanje = stanje;
        this.kategorija = kategorija;

        var data = { ime: ime, ucionica: ucionica, garancija: garancija, datum: datum, stanje: stanje, kategorija: kategorija };


        $http(
            {
                data: data,
                method: 'POST',
                url: '/new'
            }).then(function successCallback(res) {
                self.stanje = res.data.stanje;
                self.ucionica = res.data.ucionica;
                self.kategorija = res.data.kategorija;
                $location.path('/home');
            }, function errorCallback(res) {
                console.log("error");
                $rootScope.registerSuccess = false;
            });

    }




});