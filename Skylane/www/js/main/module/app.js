// http://devfanatic.com/blog/blog/2015/11/03/google-places-autocomplete-with-ionic-framework/
// cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
// cordova plugin add cordova-plugin-network-information

var sklApp = angular.module('skApp', ['ionic', 'ngCordova', 'ngAnimate', 'ngMessages', 'ion-place-tools'])

  //TODO configure facebook and twitter application by creating an id

  .run(function ($ionicPlatform, $cordovaNetwork, $ionicPopup) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
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

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppController as appCtrl'
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
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
  });
