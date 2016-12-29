/**
 * Created by Salifukayta on 06/05/2016.
 */

sklApp.factory('authenticationService', ['$q', 'FIRE_BASE_BASE_URL', function($q, FIRE_BASE_BASE_URL) {

  var ref = new Firebase(FIRE_BASE_BASE_URL);

  function authWithPopup(application) {
    var deferred = $q.defer();
    ref.authWithOAuthPopup(application, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        deferred.reject("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        deferred.resolve(authData);
      }
    }, {
      remember: 'none'
    });
    return deferred.promise;
  }

  return {
    loginWithEmail: function(userCredentials) {
      var deferred = $q.defer();
      return ref.authWithPassword(userCredentials, function(error, authData) {
        if (error) {
          var msgError;
          switch (error.code) {
            case "INVALID_EMAIL":
              msgError = "The specified user account email is invalid.";
              break;
            case "INVALID_PASSWORD":
              msgError = "The specified user account password is incorrect.";
              break;
            case "INVALID_USER":
              msgError = "The specified user account does not exist.";
              break;
            default:
              msgError = "Error logging user in:", error;
          }
          console.log(msgError);
          deferred.reject(msgError);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          deferred.resolve(authData);
        }
      }, {
        remember: 'none'
      });
      return deferred.promise;
    },
    loginWithFacebook: function () {
      return authWithPopup("facebook");
    },
    loginWithTwitter: function () {
      return authWithPopup("twitter");
    },
    signUp: function (userCredentials) {
      var deferred = $q.defer();
      ref.createUser(userCredentials, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
          deferred.reject("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          deferred.resolve(userData);
        }
      });
      return deferred.promise;
    },
    sendTempPassword: function (userEmail) {
      var deferred = $q.defer();
      ref.resetPassword(userEmail, function(error) {
        if (error === null) {
          var msg = "Temporary password is sent to your email successfully";
          console.log(msg);
          deferred.resolve(msg);
        } else {
          var msgError;
          switch (error.code) {
            case "INVALID_USER":
              msgError = "The specified user account does not exist.";
              break;
            default:
              msgError = "Error resetting password:", error;
          }
          deferred.reject(msgError);
        }
      });
      return deferred.promise;
    },
    changePassword: function (newPasswordsCredentials) {
      var deferred = $q.defer();
      ref.changePassword(newPasswordsCredentials, function(error) {
        if (error === null) {
          var msg = "Password changed successfully";
          console.log(msg);
          deferred.resolve(msg);
        } else {
          var msgError = "Error changing password:", error;
          console.log(msgError);
          deferred.reject(msgError);
        }
      });
      return deferred.promise;
    }
  };

}]);
