let input = document.querySelector(".before_input")
let address =document.querySelector(".header__name")
let desWe = document.querySelector(".main__des")
let showDay = document.querySelector(".main__day-show")
let showTemperature = document.querySelector(".main__temperature")
let showCountry = document.querySelector(".header__name-country")
let showWind = document.querySelector(".speed-wind--show")
let img = document.querySelector(".main__img")
let api;
let apiKey = "5609b3378c50f5eef2bd4474f87f2b3f";
input.addEventListener("keyup", (e) =>{
    if(e.key =="Enter" && input.value != ""){
        requestApi(input.value);
    }
})
function requestApi(name){
    api = `http://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${apiKey}`
    fechData();
}
function fechData(){    
   fetch(api)
    .then(
        (response) =>{
            return response.json();
        }    
    )
    .then((data) =>{
        console.log(data);
        if(data.name === undefined){
            address.innerHTML = "Vị Trí Không Tồn Tại"
            input.classList.add("erorr")
        }
        else{
            input.classList.remove("erorr")
            address.innerHTML =data.name;
        }
        let temperatura =Object.entries( data.main)
        temperatura.forEach(([key,value]) =>{
            if(key == "temp"){
                showTemperature.innerHTML = value;
            }
        })
        let desWeather = data.weather.forEach((info) =>{
            desWe.innerHTML = info.description;
            // get icon
            let iconWeather = info.icon
            if(info.icon){
                return img.src = `https://openweathermap.org/img/wn/${iconWeather}@2x.png`
            }
        })
      
        let winds = Object.entries(data.wind)
        winds.forEach(([wind, windValue]) =>{
            if(wind == "speed"){
                showWind.innerHTML = windValue;
            }
        })
        let country = Object.entries(data.sys)
        country.forEach(([key, value]) =>{
            if(key === 'country') {
                showCountry.innerHTML=value;
            }
        })
        function getDay (){
            let today = new Date();
            let day = today.getDate();
            let month = today.getMonth();
            showDay.innerHTML = `
            ${day}/${month}
            `
        }
        getDay();
    })
}
