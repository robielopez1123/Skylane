/**
 * Created by Salifukayta on 05/05/2016.
 */

sklApp.controller("SignUpController", ['$state', '$cordovaToast', '$ionicLoading', 'authenticationService',
  function ($state, $cordovaToast, $ionicLoading, authenticationService) {

    this.email = "";
    this.password = "";
    this.confirmPassword = "";

    this.singUp = function (signupForm) {
      if (signupForm.$valid) {
        $ionicLoading.show();
        authenticationService.signUp({
            email: this.email,
            password: this.password
          })
          .then(function (data) {
            $ionicLoading.hide();
            $state.go('app.login');
          })
          .catch(function (err) {
            $ionicLoading.hide();
            $cordovaToast.showLongBottom(err);
          });
      }
    };

  }
]);
