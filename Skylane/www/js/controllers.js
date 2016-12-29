angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('MapCtrl', function($scope, $ionicLoading) {

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: $scope.map,
        position: place.geometry.location

      });

      google.maps.event.addListener(marker, 'click', function() {
        var infowindow = new google.maps.InfoWindow();
        infowindow.setContent(place.name);
        infowindow.open($scope.map, this);
      });
    };

    function callback(results, status) {
      console.log('status:' + status);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    };

    $scope.mapCreated = function(map) {
      $scope.map = map;
        

      //Wait until the map is loaded
      google.maps.event.addListenerOnce($scope.map, 'idle', function(){
        $scope.centerOnMe();
      });

    };

    $scope.centerOnMe = function () {
      console.log("Centering");
      if (!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function (pos) {
        console.log('Got pos', pos);

        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

        var service = new google.maps.places.PlacesService($scope.map);
        service.nearbySearch({
            location:  new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude),
            radius: '50000',
            type: ['airport']
        },callback);

        $scope.loading.hide();
      }, function (error) {
        alert('Unable to get location: ' + error.message);
      });
    };

});
