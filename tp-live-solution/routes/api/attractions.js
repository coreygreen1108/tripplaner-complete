var express = require('express');
var router = express.Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Place = require('../../models/place');
var Promise = require('bluebird');

router.get('/', function(req, res){
	res.send("I feel dumber");
})

router.get('/places', function (req, res){
	var promiseForPlaces = Place.findAll({});
	promiseForPlaces.then(function(places){
		res.send(places);
	})
})

router.get('/hotels', function (req, res){
	var promiseForHotels = Hotel.findAll({});
	promiseForHotels.then(function(hotels){
		res.send(hotels);
	})
})

router.post('/restaurants', function (req, res){
	var promiseForRestaurants = Restaurant.findAll({});
	promiseForRestaurants.then(function(restaurants){
		res.send(restaurants);
	})
})

router.get('/restaurants', function (req, res){
	var promiseForRestaurants = Restaurant.findAll({});
	promiseForRestaurants.then(function(restaurants){
		res.send(restaurants);
	})
})

router.get('/activities', function (req, res){
	var promiseForActivities = Activity.findAll({});
	promiseForActivities.then(function(activities){
		res.send(activities);
	})
})


module.exports = router;
