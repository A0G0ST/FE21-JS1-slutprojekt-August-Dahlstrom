let KEY = "51c7632f45a145d0813d33471ecc773f"
const userinput = document.getElementById("getWeather")


let weather = {

    fetchWeather: function (city) {
        fetch(
            `https://api.weatherbit.io/v2.0/current?&city=${city}&key=${KEY}&lang=sv`
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
        console.log(city)
    },



    displayWeather: function (data) {
        const { city_name, temp, rh, wind_spd } = data.data[0];
        const { icon, description } = data.data[0].weather;

        console.log(city_name, icon, description, temp, rh, wind_spd)

        document.querySelector(".city").innerHTML = "Väder i " + city_name;
        document.querySelector(".icon").src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = temp + "°C";
        document.querySelector(".humidity").innerHTML = "Luftfuktighet: " + rh + "%";
        document.querySelector(".wind").innerHTML = "Vindhastighet: " + wind_spd + "m/s";
        document.querySelector(".weather").classList.remove("loading")
    },


    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }


};


let weather2 = {

    fetchWeather: function (city) {
        fetch(
            `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${KEY}&lang=sv`
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather2(data));

        console.log(city)
    },

    displayWeather2: function (data) {
        for (let i = 1; i < 6; i++) {


            const { valid_date, temp } = data.data[i];
            const { icon, description } = data.data[i].weather;

            let fivedays = document.getElementById("fivedays")
            const makeFiveDivs = document.createElement("div");
            const cityTitleDiv = document.createElement("h2");
            const weatherIconDiv = document.createElement("img");
            const cityDescDiv = document.createElement("p");
            const cityTempDiv = document.createElement("p");

            cityTitleDiv.innerText = data.data[i].valid_date;
            weatherIconDiv.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
            cityTempDiv.innerText = data.data[i].temp + " " + "°C"
            cityDescDiv.innerText = data.data[i].weather.description;

            makeFiveDivs.appendChild(cityTitleDiv);
            makeFiveDivs.appendChild(weatherIconDiv);
            makeFiveDivs.appendChild(cityTempDiv);
            makeFiveDivs.appendChild(cityDescDiv);
            fivedays.appendChild(makeFiveDivs);

            console.log(i)
            console.log(valid_date, temp, icon, description)
        }
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);

    }
};


document.querySelector(".search button").addEventListener("click", function (event) {

    if (userinput.value === "") {
        alert("Insert a city name")
    }

    else {
        clearSecondDiv();
        weather.search(),
            weather2.search()
        animation.play();
    }
    event.preventDefault();
});

function clearSecondDiv() {
    const divEl = document.querySelectorAll("#fivedays *")
    for (let i = 0; i < divEl.length; i++) {
        let el = divEl[i];
        el.remove();
    }
}

weather.fetchWeather("malmö")

