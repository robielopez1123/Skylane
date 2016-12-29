/**
 * Created by Salifukayta on 07/05/2016.
 */

sklApp.directive('autoCompleteCity', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var x = new google.maps.places.Autocomplete(element[0], { types: ['(cities)'], region:'US' });
    }
  };
});
