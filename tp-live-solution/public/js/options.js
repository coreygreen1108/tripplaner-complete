	var typeObj = {
		restaurant: '/api/restaurants',
		hotel: '/api/hotels',
		activity: '/api/activities'
	}

	var jointTableRouteName = {
		restaurant: '/restaurants',
		hotel: '/hotels',
		activity: '/activities'
	}
	var $locationObj = {
		restaurant: $('#restaurant-choices'),
		hotel: $('#hotel-choices'),
		activity: $('#activity-choices')
	}

	var selectItems = function(type){
		$.get(typeObj[type], function (typeData) {
	  		typeData.forEach(function(typeSingle){
	    	$locationObj[type].append('<option value="' + typeSingle.id + '">' + typeSingle.name + '</option>');
	 	 });
		})
		.fail( console.error.bind(console) );
	}

	var addEventToDB = function(){
		
	}
	// var addEventToDB = function (sectionToGet, eventId, dayNum){
	// 	var itemToReturn;
	// 	var placeToReturn
	// 	var collectionToGet = typeObj[sectionToGet];
	// 	return getDays()
	// 	.then(function(days){
	// 		return days.filter(function(singleDay){
	// 			return singleDay.number = dayNum;
	// 		})
	// 	})
	// 	.then(function(day){
	// 		return day.addHotel({where: {hotel.id: eventID}}).save();
	// 	}).then(function(newItem){
	// 		console.log(newItem);
	// 	})
	// 	// if(sectionToGet === 'hotel'){
	// 	// 	return Day.addHotel({where: {
	// 	// 		number: dayNum,
	// 	// 		hotel: eventID
	// 	// 	}})
	// 	// }
	// 	// else {
	// 	// 	return Day.add({where: {
	// 	// 		number: dayNum,
	// 	// 		hotel: eventID
	// 	// 	}})
	// 	// }

	// 	// return $.get(collectionToGet)
	// 	// .then(function(collectionData){
	// 	// 	return collectionData.filter(function(singleEvent){
	// 	// 	    return singleEvent.id === eventId;
	// 	// 	})[0]
	// 	// }).then(function(item){
	// 	// 	// Day.addHotel()
	// 	// 	itemToReturn = item;
	// 	// 	return $.get('/api/places')
	// 	// }).then(function(allThePlaces) {
	// 	// 	return allThePlaces.filter(function(singlePlace){
	// 	// 	    return singlePlace.id === itemToReturn.placeId;
	// 	// 	})[0]
	// 	// }).then(function(place) {
	// 	// 	placeToReturn = place;
	// 	// 	$.post('/:' + eventID + '/' + jointTableRouteName[sectionName], {place: place, days: dayNum})
	// 	// 	// return [itemToReturn, placeToReturn]
	// 	// })

	// 	 // function(collectionData){

	// 	// })
	// }

	function addDay(dayNum){
		return $.post("/api/days", { day: dayNum })
	}

	function removeDay(dayNum){
		return $.ajax({
			url: "/api/days/",
			type: 'DELETE',
			data: { day: dayNum }
		})
	}

	function getDays(){
		return $.get("/api/days");
	}