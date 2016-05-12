var express = require('express');
var router = express.Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Place = require('../../models/place');
var Days = require('../../models/day');
var Promise = require('bluebird');

router.get('/', function(req, res){
	var promisesForDays = Days.findAll({});
	promisesForDays.then(function(days){
		res.send(days);
	})
})

router.get('/:id', function(req, res){
	var id = +(req.params.id);
	Days.findOne({
		where: {
			id: id
		}
	})
	.then(function(days){
		res.send(days);
	})
})

router.delete('/:id', function(req, res){

})

router.post('/', function(req, res){
	var day = req.body.day;
	Days.create({
		number: day
	})
	.then(function(d) {
		res.send(d);
	})
})

router.post('/:id/restaurants', function(req, res) {
	var id = +(req.params.id);
	var restaurantId = req.body.restaurant;
	day_restaurant.create({
		dayId: id,
		restaurantId: restaurantId 
	})
})

router.post('/:id/hotels', function(req, res) {
	var id = +(req.params.id);
	var hotel = req.body.hotel;
})

router.post('/:id/activities', function(req, res) {
	var id = +(req.params.id);
	var hotel = req.body.hotel;
})

module.exports = router;
