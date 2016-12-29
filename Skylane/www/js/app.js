angular.module('starter', ['ionic', 'starter.controllers','starter.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
     if($cordovaNetwork.isOffline()) {
        $ionicPopup.alert({
            title: "No Internet Connection",
            content: "Please verify your internet then retry."
          })
          .then(function(result) {
            ionic.Platform.exitApp();
          });
      }
  });
})

.constant('$ionicLoadingConfig', {
    template: '<ion-spinner icon="spiral"></ion-spinner>'
  })
  .constant('FIRE_BASE_BASE_URL', 'https://dazzling-inferno-9600.firebaseio.com/')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.account', {
    url: '/account',
    views: {
      'menuContent': {
        templateUrl: 'templates/account.html'
      }
    }
  })

  .state('app.flight', {
    url: '/flight',
    views: {
      'menuContent': {
        templateUrl: 'templates/flight.html'
      }
    }
  })

  .state('app.contact', {
    url: '/contact',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact.html'
      }
    }
  })

  .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/authentication/login.html',
            controller: 'LoginController as loginCtrl'
          }
        }
      })
      .state('app.signup', {
        url: '/signup',
        views: {
          'menuContent': {
            templateUrl: 'templates/authentication/signup.html',
            controller: 'SignUpController as signUpCtrl'
          }
        }
      })
      .state('app.forget', {
        url: '/forget',
        views: {
          'menuContent': {
            templateUrl: 'templates/authentication/forget.html',
            controller: 'ForgetController as forgetCtrl'
          }
        }
      })
      .state('app.registration', {
        url: '/registration',
        views: {
          'menuContent': {
            templateUrl: 'templates/registration/index.html',
            controller: 'RegistrationController as registrationCtrl'
          }
        }
      })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
