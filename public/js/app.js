console.log("hello giii");



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationId = document.querySelector('#location')
const forecast = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(search.value);
    locationId.textContent = "Loading..."
    forecast.textContent = ""



    fetch('/weather?address=' + search.value).then((res)=>{
    console.log(res);
    res.json().then((data)=>{
        if(data.error){
            console.log(data.error);
            locationId.textContent = data.error
        }
        else{
            console.log(data.location);
            console.log(data.forecast);
            locationId.textContent = data.location
            forecast.textContent = data.forecast
        }
    })
})
})
