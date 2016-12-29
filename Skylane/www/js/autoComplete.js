
$(document).ready(function initialize(){
	var input = (document.getElementById('departure'));
	var autocomplete = new google.maps.places.Autocomplete(input, { types: ['(cities)'], region:'US' });
	var input = (document.getElementById('destination'));
	var autocomplete = new google.maps.places.Autocomplete(input, { types: ['(cities)'], region:'US' });
});