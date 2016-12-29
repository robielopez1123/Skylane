/**
 * Created by Salifukayta on 04/05/2016.
 */

sklApp.controller('RegistrationController', ['$scope', '$timeout', '$ionicScrollDelegate', '$cordovaToast', 'registrationService',
  function ($scope, $timeout, $ionicScrollDelegate, $cordovaToast, registrationService) {

    this.hasReturnTrip = true;
    this.returnDate = "";
    this.departureDate = "";
    this.departureCity = "";
    this.destination = "";
    this.numberSeats = "";
    this.typePassenger = "passenger";
    this.pricePerSeat = "";

    this.submitRegistration = function (registrationForm) {
      if (registrationForm.$valid) {
        registrationService.save({
          return_trip: this.hasReturnTrip,
          departure_date: this.departureDate,
          return_date: this.returnDate,
          departure_from: this.departureCity,
          destination: this.destination,
          no_of_seats: this.numberSeats,
          person_type: this.typePassenger,
          price_per_seat: this.pricePerSeat
        });
        $cordovaToast.showLongBottom('Registration done');
      }
    };

    this.scrollBottom = function () {
      $timeout(function () {
        $ionicScrollDelegate.scrollBottom(true);
      }, 250);
    };

  }]
);
