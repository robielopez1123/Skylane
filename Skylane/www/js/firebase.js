
	var rootRef = new Firebase('https://dazzling-inferno-9600.firebaseio.com/');
	var returnTrip = document.getElementById('returnTrip');
	var departureDate = document.getElementById('departureDate');
	var returnDate = document.getElementById('returnDate');
	var departure = document.getElementById('departure');
	var destination = document.getElementById('destination');
	var seats = document.getElementById('seats');
	var personType = document.getElementById('personType');
	var pricePerSeat = document.getElementById('pricePerSeat');
	var btn = document.getElementById('btn');
	
	var ref = rootRef.child('flight');
	var newRef = ref.push();
	
	btn.addEventListener('click', function(){
		newRef.set({
			return_trip: returnTrip.value,
			departure_date: departureDate.value,
			return_date: returnDate.value,
			departure_from: departure.value,
			destination: destination.value,
			no_of_seats: seats.value,
			person_type: personType.value,
			price_per_seat: pricePerSeat.value
		});
	});