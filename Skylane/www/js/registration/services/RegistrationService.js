/**
 * Created by Salifukayta on 04/05/2016.
 */

sklApp.factory('registrationService', ['FIRE_BASE_BASE_URL', function(FIRE_BASE_BASE_URL) {

  var rootRef = new Firebase(FIRE_BASE_BASE_URL);
  var ref = rootRef.child('flight');
  //FIXME add data on each click ? or when data is saved, the submit after is an update to that data ?
  //FIXME In that case for the user to add another data, he has at least left the app then back
  var newRef = ref.push();

  return {
    save: function (data) {
      newRef.set(data);
    }
  };
}]);
