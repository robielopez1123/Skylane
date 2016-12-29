/**
 * Created by Salifukayta on 04/05/2016.
 */

sklApp.directive('groupedRadio', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      model: '=ngModel',
      value: '=groupedRadio'
    },
    controller: function ($scope) {
      $scope.selectItem = function () {
      }
    },
    link: function (scope, element, attrs, ngModelCtrl) {
      element.addClass('button');
      var updateModelCtrl = function () {
        scope.$apply(function() {
          ngModelCtrl.$setViewValue(scope.value);
        });
      };

      element.on('click', function(e) {
        updateModelCtrl();
      });
      element.on('tap', function(e) {
        updateModelCtrl();
      });

      scope.$watch('model', function (newVal) {
        element.removeClass('button-positive');
        if (newVal === scope.value) {
          element.addClass('button-positive');
        }
      });
    }
  };
});
