$(function () {
    
    var map = initializeMap();
    var $addItemButton = $('#options-panel').find('button');

    var $listGroups = {
        hotel: $('#hotel-list').children('ul'),
        restaurant: $('#restaurant-list').children('ul'),
        activity: $('#activity-list').children('ul')
    };

    // var collections = {
    //     hotel: hotels,
    //     restaurant: restaurants,
    //     activity: activities
    // };

    var $itinerary = $('#itinerary');
    var $addDayButton = $('#day-add');
    var $dayTitle = $('#day-title').children('span');
    var $removeDayButton = $('#day-title').children('button');
    var $dayButtonList = $('.day-buttons');

    var days = [
    ];

    var currentDayNum = 0;

    /*
    --------------------------
    END VARIABLE DECLARATIONS
    --------------------------
     */

    $addItemButton.on('click', function () {

        var $this = $(this);
        var $select = $this.siblings('select');
        var sectionName = $select.attr('data-type');
        var itemId = parseInt($select.val(), 10);
        var itemName = $select.val();
        // var itemId = $(itemName)
        var $list = $listGroups[sectionName];
        // var collection = collections[sectionName];
        // var item = findInCollection(collection, itemId);
        //var collection = typeObj[sectionName];
        addEventToDB(); 
        //var promiseForItem = addEventToDB(sectionName, itemId, currentDayNum)
        // var item = findInCollection(collection, itemId);
        // console.log("HERE IS YOUR ITEM:" + item);
        promiseForItem.done(function(item){
                        console.log(item)
            var marker = drawMarker(map, sectionName, item[1].location);

            $list.append(create$item(item[0]));

            days[currentDayNum - 1].push({
                item: item[0],
                marker: marker,
                type: sectionName
            });

            mapFit();
        }).fail(console.error.bind(console));
    });

    $itinerary.on('click', 'button.remove', function () {

        var $this = $(this);
        var $item = $this.parent();
        var itemName = $item.children('span').text();
        var day = days[currentDayNum - 1];
        var indexOfItemOnDay = findIndexOnDay(day, itemName);
        var itemOnDay = day.splice(indexOfItemOnDay, 1)[0];

        itemOnDay.marker.setMap(null);
        $item.remove();

        mapFit();

    });

    $addDayButton.on('click', function () {
        makeNewButton();
        addDay(currentDayNum);
    });

    $dayButtonList.on('click', '.day-btn', function () {
        var dayNumberFromButton = parseInt($(this).text(), 10);
        switchDay(dayNumberFromButton);
    });

    $removeDayButton.on('click', function () {

        wipeDay();
        days.splice(currentDayNum - 1, 1);

        if (days.length === 0) {
            days.push([]);
        }

        reRenderDayButtons();
        removeDay(currentDayNum);
        switchDay(1);


    });

    selectItems('hotel');
    selectItems('restaurant');
    selectItems('activity');
    dealWithDayOne();

    /*
    --------------------------
    END NORMAL LOGIC
    --------------------------
     */

    // Create element functions ----

    function create$item(item) {

        var $div = $('<div />');
        var $span = $('<span />').text(item.name);
        var $removeButton = $('<button class="btn btn-xs btn-danger remove btn-circle">x</button>');

        $div.append($span).append($removeButton);

        return $div;

    }

    function createDayButton(number) {
        return $('<button class="btn btn-circle day-btn">' + number + '</button>');
    }

    // End create element functions ----

    function fillInOptions(collection, $selectElement) {
        collection.forEach(function (item) {
            $selectElement.append('<option value="' + item.id + '">' + item.name + '</option>');
        });
    }

    function switchDay(dayNum) {
        wipeDay();
        currentDayNum = dayNum;
        renderDay();
        $dayTitle.text('Day ' + dayNum);
        mapFit();
    }

    function renderDay() {

        var currentDay = days[currentDayNum - 1];

        $dayButtonList
            .children('button')
            .eq(currentDayNum - 1)
            .addClass('current-day');

        currentDay.forEach(function (attraction) {
            var $listToAddTo = $listGroups[attraction.type];
            $listToAddTo.append(create$item(attraction.item));
            attraction.marker.setMap(map);
        });

    }

    function wipeDay() {

        $dayButtonList.children('button').removeClass('current-day');

        Object.keys($listGroups).forEach(function (key) {
           $listGroups[key].empty();
        });

        if (days[currentDayNum - 1]) {
            days[currentDayNum - 1].forEach(function (attraction) {
                attraction.marker.setMap(null);
            });
        }


    }

    function reRenderDayButtons() {

        var numberOfDays = days.length;

        $dayButtonList.children('button').not($addDayButton).remove();

        for (var i = 0; i < numberOfDays; i++) {
            $addDayButton.before(createDayButton(i + 1));
        }

    }

    function mapFit() {

        var currentDay = days[currentDayNum - 1];
        var bounds = new google.maps.LatLngBounds();

        currentDay.forEach(function (attraction) {
            bounds.extend(attraction.marker.position);
        });

        map.fitBounds(bounds);

    }

    // Utility functions ------

    function findInCollection(collection, id) {
        return collection.filter(function (item) {
            return item.id === id;
        })[0];
    }

    function findIndexOnDay(day, itemName) {
        for (var i = 0; i < day.length; i++) {
            if (day[i].item.name === itemName) {
                return i;
            }
        }
        return -1;
    }

    function dealWithDayOne(){
        var dayOne = getDays();
        dayOne.done(function(days){
                console.log(days);
             if(days.length == 0) {
                addDay(1); 
                makeNewButton();
             }
             else {
                days.forEach(function(day){
                    makeNewButton();
                })
             }
        }).fail(console.error.bind(console));
        // .filter(function(day){
        //     return day.number === 1;
        // })
        // console.log(dayOne);
        // console.log(dayOne);
        // console.log(dayOne.length);
       
    }

    function makeNewButton(){
        var newDayNum = days.length + 1;
        var $newDayButton = createDayButton(newDayNum);
        days.push([]);
        $addDayButton.before($newDayButton);
        switchDay(newDayNum);
    }


    // End utility functions ----

});
