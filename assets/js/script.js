// variables for API key
var key = "2df1652a058b395cb4ed75187de013b1";
var city = "Portland"; 

// displays  current time and date
var date = dayjs().format('dddd, MMMM Do YYYY');
var time = dayjs().format('YYYY-MM-DD HH:MM:SS');


// function to save city search history
var cityHist = [];
$('.search').on("click", function (event) {
    event.preventDefault();
    city = $(this).parent(".btnPar").siblings(".textval").val().trim();
    if (city === "") {
        return;
    };
    cityHist.push(city);

    localStorage.setItem("city", JSON.stringify(cityHist));
    fiveForcastEl.empty();
    getHistory();
    getWeatherToday();
});

// function to create buttons for city search history
var HistoryEL = $(".cityHistory");
function getHistory() {
    HistoryEL.empty();

    for (i = 0; i < cityHist.length; i++) {

        var rowEl = $("<row>");
        var btnEl = $("<button>").text("${cityHistory[i]}")

        rowEl.addClass("row histBtnRow");
        btnEl.addClass("btn btn-outline-secondary histBtn");
        btnEl.attr("type", "button");

        contHistEl.prepend(rowEl);
        rowEl.append(btnEl);
    } if (!city) {
        return;
    }

    // function that allows these buttons to be used to search previously searched cities
    $(".histBtn").on("click", function (event) {
        event.preventDefault();
        city = $(this).text();
        fiveForcastEl.empty();
        getWeatherToday();
    });
};

// function for today's weather card
var cardBodyToday = $(".cardBodyToday")

function getWeatherToday() {
    var getUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}";

    $(cardBodyToday).empty();

    $.ajax({
        url: getUrlCurrent,
        method: "GET",
    }).then(function (repsonse) {
        $(".cardTodayCityName").text(repsonse.name);
        $(".cardtodayDate").text(date);
        //
        $(".icons").attr("src", "https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png");
        //
        var pEl = $("<p>").text("Temperature: ${response.main.temp} °F");
        cardBodyToday.append(pELTemp);
        //
        var pElHumid = $("<p>").text("Humidity: ${response.main.humidity} %");
        cardBodyToday.append(pElHumid);
        //
        var pELWind = $$("<p>").text("Wind Speed; ${response.wind.speed} MPH");
        cardBodyToday.append(pELWind);
        //
        var cityLon = repsonse.coord.lon;
        console.log(cityLon)
        //  
        var cityLat = repsonse.coord.lat;
        console.log(cityLat)
        var getUrlUvi = "https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,daily,minutely&appid=${key}";

        $.ajax({
            url: getUrlUvi,
            method: 'GET',
        }).then(function (response) {
            var pElUvi = $('<p>').text(`UV Index: `);
            var uviSpan = $('<span>').text(response.current.uvi);
            var uvi = response.current.uvi;
            pElUvi.append(uviSpan);
            cardTodayBody.append(pElUvi);
    });
    getFiveDayForecast = function() {
};

var getFiveDayForecast = $(".fiveForecast");

    function getFiveDayForecast() {
    var getUrlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}";

    $.ajax({
        url: getUrlFiveDay,
        method: "GET",
    }).then(function (repsonse) {
        var fiveDayArray = repsonse.list;
        var myWeather = [];

        //
        $.each(fiveDayArray, function (index, value) {
            testObj = {
                date: value.dt_txt.split(' ')[0],
                time: value.dt_txt.split(' ')[1],
                temp: value.main.temp,
                feels_like: value.main.feels_like,
                icon: value.weather[0].icon,
                humidity: value.main.humidity
            };

            if (value.dt_txt.split(" ")[1 === "12:00:00"]) {
                myWeather.push(testObj);
            }
        });

        // 
        for (let i = 0; i < myWeather.length; i++) {

            var divElCard = $("<div>");
            divElCard.attr("class", "card text-white bg-primary mb-3 cardOne");
            divElCard.attr("style", "max-width: 200px;");
            fiveForecastEl.append(divElCard);

            var divElHeader = $("<div>");
            divElHeader.attr("class", "card-header");
            var m = moment(`${myWeather[i].date}`).format("MM-DD-YYYY");
            divElHeader.text(m);
            divElCard.append(divElHeader);

            var divElBody = $("<div>");
            divElBody.attr("class", "card-body");
            divElCard.append(divElBody);

            var divElIcon = $("<img>");
            divElIcon.attr("class", "icons");
            divElIcon.attr("src", "https://openweathermap.org/img/wn/${myWeather[i].icon}@2x.png");
            divElBody.append(divElIcon);

            // 
            var pElTemp = $("<p>").text("Temperature: ${myWeather[i].temp} °F");
            divElBody.append(pElTemp);

            // 
            var pElFeel = $("<p>").text("Feels Like: ${myWeather[i].feels_like} °F");
            divElBody.append(pElFeel);

            // 
            var pElHumid = $("<p>").text("Humidity: ${myWeather[i].humidity} %");
            divElBody.append(pElHumid);
        }
    });
};

// 
function initLoad() {

var cityHistStore = JSON.parse(localStorage.getItem("city"));

if (cityHistStore !== null) {
cityHist = cityHistStore
}
getHistory();
getWeatherToday();
};

initLoad()};