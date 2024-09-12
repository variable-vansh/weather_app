
async function getWeather(inputLocation) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputLocation}?unitGroup=metric&key=LAJERFGZH2P58LEZTXBCPW3DC&contentType=json`, { mode: 'cors' })
    const responseData = await response.json();

    // console.log(responseData)

    //
    let location = responseData.address
    let mainTemp = Math.trunc(responseData.currentConditions.temp)
    let weatherCondition = responseData.currentConditions.conditions
    let mainWeatherIcon = responseData.currentConditions.icon
    let mainMaxTemp = responseData.days[0].tempmax
    let mainMinTemp = responseData.days[0].tempmin
    //

    //
    let sunRiseTime = responseData.days[0].sunrise;
    let sunSetTime = responseData.days[0].sunset;
    //

    //
    let humidity = responseData.currentConditions.humidity
    let wind = responseData.currentConditions.windspeed;
    let visibility = responseData.currentConditions.visibility
    //

    //
    //location name
    console.log(location)
    //current temperature
    console.log(mainTemp)
    // condition
    console.log(weatherCondition)
    //icon
    console.log(mainWeatherIcon)
    //high temp
    console.log(mainMaxTemp)
    //low temp
    console.log(mainMinTemp)
    //

    // -----------------------------

    //sunrise time
    console.log(sunRiseTime)
    //sunset time
    console.log(sunSetTime)

    // -----------------------------

    //humidity
    console.log(humidity)
    //wind
    console.log(wind)
    //visibility
    console.log(visibility)

    console.log("--------------------------------------")
    console.log("------------Hourly-weather------------")
    console.log("--------------------------------------")

    // -----------------------------

    //now to get 14 hours of today's forecast
    //get present time (hours), and present day
    let currentDay = 0;
    let currentHour = parseInt(responseData.currentConditions.datetime.substring(0, 2))

    console.log(currentHour)

    // keep adding 2 and get 7 intervals
    for (let i = 1; i <= 7; i++) {
        currentHour = currentHour + 2;
        //before going ahead and fetching weather from new time, check if it's less that 24, if not, subtract 24 from it and add 1 to the day
        if (currentHour >= 24) {
            currentHour = currentHour - 24;
            currentDay++;
        }
        console.log("Weather for time=", `${currentHour}:00`);
        console.log(responseData.days[currentDay].hours[currentHour].icon)
        console.log(responseData.days[currentDay].hours[currentHour].temp)
        console.log("--------------------------------------")
    }

    console.log("-----------------------------------")
    console.log("------------Next-7-Days------------")
    console.log("-----------------------------------")

    //take next day
    //extract it's date, icon, max/min

    for (let i = 1; i <= 7; i++) {
        properDatetime = responseData.days[i].datetime.substring(8, 10) + '-' + responseData.days[i].datetime.substring(5, 7) + "-" + responseData.days[i].datetime.substring(2, 4)
        console.log("date:", properDatetime)
        console.log(responseData.days[i].icon)
        maxMinTempString = Math.trunc(responseData.days[i].tempmax) + "/" + Math.trunc(responseData.days[i].tempmin);
        console.log(maxMinTempString)
        console.log("-----------------------------------")
    }
}

function newLocationInput(event) {
    //clear old stuff from console
    console.clear()

    //prevent form from submitting
    event.preventDefault();

    //get input value from input
    let inputLocation = document.querySelector(".locationInput").value;

    // console.log(inputLocation)

    getWeather(inputLocation)
}