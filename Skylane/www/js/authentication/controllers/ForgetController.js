/**
 * Created by Salifukayta on 05/05/2016.
 */

sklApp.controller("ForgetController", ['$scope', '$state', '$cordovaToast', '$ionicLoading', 'authenticationService',
  function ($scope, $state, $cordovaToast, $ionicLoading, authenticationService) {

    this.email = "";
    this.tempPasswordEmailSent = false;
    this.newPassword = "";
    this.conformNewPassword = "";
    this.tempPassword = "";
    var _this = this;

    $scope.$on('$ionicView.beforeEnter', function (e) {
      _this.tempPasswordEmailSent = false;
    });

    this.sendTempPasswordToEmail = function (resetPasswordForm) {
      // this.tempPasswordEmailSent = false;
      this.tempPassword = "";
      if (resetPasswordForm.email.$valid) {
        authenticationService.sendTempPassword({email: this.email})
          .then(function (msg) {
            _this.tempPasswordEmailSent = true;
            $cordovaToast.showLongBottom(msg);
          })
          .catch(function (err) {
            $cordovaToast.showLongBottom(err);
          });
      }
    };

    this.setNewPassword = function (resetPasswordForm) {
      if (resetPasswordForm.$valid) {
        $ionicLoading.show();
        authenticationService.loginWithEmail({
            email: this.email,
            password: this.tempPassword
          })
          .then(function (authData) {
            authenticationService.changePassword({
                email: _this.email,
                oldPassword: _this.tempPassword,
                newPassword: _this.newPassword
              })
              .then(function (msg) {
                $ionicLoading.hide();
                $state.go('app.login');
                $cordovaToast.showLongBottom(msg);
              })
              .catch(function (err) {
                $ionicLoading.hide();
                $cordovaToast.showLongBottom(err);
              });
          })
          .catch(function (err) {
            $cordovaToast.showLongBottom(err);
          });
      }
    }
  }
]);
