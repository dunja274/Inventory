angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('menu.sviPredmeti', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/sviPredmeti.html',
        controller: 'sviPredmetiCtrl'
      }
    }
  })

  .state('menu.uIonice', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/uIonice.html',
        controller: 'uIoniceCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  .state('menu.predmet', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/predmet.html',
        controller: 'predmetCtrl'
      }
    }
  })

  .state('menu.dodajPredmet', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/dodajPredmet.html',
        controller: 'dodajPredmetCtrl'
      }
    }
  })

  .state('menu.urediPredmet', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/urediPredmet.html',
        controller: 'urediPredmetCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/')


});