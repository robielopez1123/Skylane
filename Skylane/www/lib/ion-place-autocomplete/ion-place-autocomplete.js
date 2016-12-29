window.placeTools = angular.module('ion-place-tools', []);
placeTools.directive('ionGooglePlace', [
  '$ionicTemplateLoader',
  '$ionicPlatform',
  '$q',
  '$timeout',
  '$rootScope',
  '$document',
  function ($ionicTemplateLoader, $ionicPlatform, $q, $timeout, $rootScope, $document, $ionicScrollDelegate) {
    return {
      priority:1000,
      require: '?ngModel',
      restrict: 'E',
      templateUrl: 'src/ionGooglePlaceTemplate.html',
      replace: true,
      scope: {
        searchQuery: '=ngModel',
        locationChanged: '&',
        radius: '='
      },
      link: function (scope, element, attrs, ngModel) {
        scope.dropDownActive = false;
        var service = new google.maps.places.AutocompleteService();
        var searchEventTimeout = undefined;
        var latLng = null;

        navigator.geolocation.getCurrentPosition(function (position) {
          latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        });

        var searchInputElement = angular.element(element.find('input'));

        scope.selectLocation = function (location) {
          scope.dropDownActive = false;
          scope.searchQuery = location.description;
          if (scope.locationChanged && scope.locationChanged() !== undefined) {
            scope.locationChanged()(location.description);
          }
        };

        scope.locations = []

        scope.updateLocations = function () {
          // scope.$watch('searchQuery', function (query) {
          //   if (!query) {
          var query = (!scope.searchQuery ? "" : scope.searchQuery);
          // }
          // scope.dropDownActive = false; //(scope.locations.length > 0);
          if (searchEventTimeout) {
            $timeout.cancel(searchEventTimeout);
          }
          searchEventTimeout = $timeout(function () {
            if (!query || query.length < 1) {
              scope.locations = [];
              return;
            }

            var req = {};
            req.input = query;
            if (latLng) {
              req.location = latLng;
              if (!scope.radius) {
                scope.radius = 1500000;
              }
              req.radius = scope.radius;
            }
            service.getQueryPredictions(req, function (predictions, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                scope.locations = predictions;
                scope.dropDownActive = (scope.locations.length > 0);
                scope.$apply();
              }
            });
          }, 350); // we're throttling the input by 350ms to be nice to google's API
        }
        // });

        var onClick = function (e) {
          e.preventDefault();
          e.stopPropagation();
          scope.dropDownActive = true;
          scope.$digest();
          searchInputElement[0].focus();
          // $ionicScrollDelegate.$getByHandle('mainScroll').scrollTo(0, element.top - 500, true);
          setTimeout(function () {
            searchInputElement[0].focus();
          }, 0);
        };

        var onCancel = function (e) {
          setTimeout(function () {
            scope.dropDownActive = false;
            scope.$digest();
          }, 200);
        };

        if (!scope.radius) {
          scope.radius = 1500000;
        }

        element.find('input').bind('click', onClick);
        element.find('input').bind('touchend', onClick);
        element.find('input').bind('blur', onCancel);

        if (attrs.name) {
          element.find('input').attr('name', attrs.name);
        }

        if (attrs.placeholder) {
          element.find('input').attr('placeholder', attrs.placeholder);
        }
      }
    };
  }
]);

// Add flexibility to template directive
var template = '<div class="ion-place-tools-autocomplete">' +
  '<input type="text" autocomplete="off" ng-model="searchQuery" ng-keyup="updateLocations()">' +
  '<div class="ion-place-tools-autocomplete-dropdown" ng-if="dropDownActive">' +
  '<ion-list>' +
  '<ion-item ng-repeat="location in locations" ng-mousedown="selectLocation(location)" ng-click="selectLocation(location)">' +
  '{{location.description}}' +
  '</ion-item>' +
  '</ion-list>' +
  '</div>' +
  '</div>';
placeTools.run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/ionGooglePlaceTemplate.html", template);
}]);
