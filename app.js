window.addEventListener('load',()=>{
    let long; //longitude
    let lat; //latitude
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let feelsLike = document.querySelector('#feels-like-temp');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature')
    const temperatureSpan = document.querySelector('.temperature span');
    const feelsTempSpan = document.querySelector('.feels-like span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/7ea5302c22c0f48ee99a2a5278113dbc/${lat},${long}`
    
            fetch(api)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    console.log(data)
                    const {summary ,icon}  = data.hourly;
                    const {temperature,apparentTemperature}  = data.currently;
                    //set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    locationTimezone.textContent = data.timezone;
                    feelsLike.textContent = apparentTemperature;
                    temperatureDescription.textContent = summary;
                    //Formula for Celcius
                    let celcius = (temperature - 32) * (5 / 9);
                    let feelsCelcius = (apparentTemperature - 32 ) * (5 / 9 ); 




                    //setIcon
                    setIcons(icon,document.querySelector('.icon'));

                    temperatureSection.addEventListener('click',()=>{
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";  
                            feelsTempSpan.textContent = "C";  
                            temperatureDegree.textContent = Math.floor(celcius);
                            feelsLike.textContent = Math.floor(feelsCelcius);
                        }else {
                            temperatureSpan.textContent = "F";
                            feelsTempSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                            feelsLike.textContent = apparentTemperature;

                        }
                    })

                })
        });


    }
    function setIcons(icon,iconID){
        const skycons = new Skycons({color:'white'});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon])
    }

})