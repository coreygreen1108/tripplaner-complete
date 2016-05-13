var Sequelize = require('sequelize');
var db = require('./_db');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');

var Day = db.define('day', {
  number: {
  	type: Sequelize.INTEGER
  }
}
, {
	// hooks: {
	// 	afterDestroy: function(day) {
	// 		console.log("In da hook")
	// 		Day.renumber(day);
	// 	}
	// },
	classMethods: {
		renumber: function(startDay) {
			console.log("Hello chief")
			return Day.findAll({
				where: {
					number: {
						$gt: startDay
					}
				}
			}).then(function(daysToRenumber) {
				var promisesForUpdatedDays = [];
				daysToRenumber.forEach(function(day) {
					day.number-- ;
					console.log(day)
					promisesForUpdatedDays.push(day.save());
				})
				return Promise.all(promisesForUpdatedDays)
			})
			// .then(function(updatedDays) {
			// 	return updatedDays;
			// })
		}
 	}
});

// Hotel.hasOne(Day, {onDelete: 'cascade', hooks: true})
// Restaurant.hasMany(Day, {onDelete: 'cascade', hooks: true})

Day.belongsTo(Hotel);
Day.belongsToMany(Restaurant, {through: 'day_restaurant'});
Day.belongsToMany(Activity, {through: 'day_activity'});

module.exports = Day;