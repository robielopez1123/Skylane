/**
 * Created by Salifukayta on 05/05/2016.
 */

sklApp.controller("LoginController", ['$state', '$cordovaToast', '$ionicLoading', 'authenticationService',
  function ($state, $cordovaToast, $ionicLoading, authenticationService) {

    this.email = "";
    this.password = "";
    var _this = this;

    this.loginWithEmail = function (formLogin) {
      if (formLogin.$valid) {
        $ionicLoading.show();
        authenticationService.loginWithEmail({
            email: this.email,
            password: this.password
          })
          .then(function (data) {
            $ionicLoading.hide();
            $state.go(/map);
          })
          .catch(function (err) {
            $ionicLoading.hide();
            $cordovaToast.showLongBottom(err);
          });
      }
    };

    this.loginWithFacebook = function () {
      $ionicLoading.show();
      authenticationService.loginWithFacebook()
        .then(function (authData) {
          $ionicLoading.hide();
        })
        .catch(function (err) {
          $ionicLoading.hide();
          $cordovaToast.showLongBottom(err);
        });
    };

    this.loginWithTwitter = function () {
      $ionicLoading.show();
      authenticationService.loginWithTwitter()
        .then(function (authData) {
          $ionicLoading.hide();
        })
        .catch(function (err) {
          $ionicLoading.hide();
          $cordovaToast.showLongBottom(err);
        });
    };

  }
]);
