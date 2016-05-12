	var typeObj = {
		restaurant: '/api/restaurants',
		hotel: '/api/hotels',
		activity: '/api/activities'
	}

	var $locationObj = {
		restaurant: $('#restaurant-choices'),
		hotel: $('#hotel-choices'),
		activity: $('#activity-choices')
	}

	var selectItems = function(type){
		$.get(typeObj[type], function (typeData) {
	  		typeData.forEach(function(typeSingle){
	  			console.log(typeSingle);
	    	$locationObj[type].append('<option id="' + typeSingle.id + '">' + typeSingle.name + '</option>');
	 	 });
		})
		.fail( console.error.bind(console) );
	}

	selectItems('hotel');
    selectItems('restaurant');
    selectItems('activity');


	function addDay(dayNum){
		return $.post("/api/days", { day: dayNum })
	}