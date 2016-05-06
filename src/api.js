export const getWeatherAPI=(city)=>{
    let api_key='80c9d6f50c1c0ae113f2c3974e059524'
    let url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
    console.log('url is',url)
    return fetch(url)
        .then(data=>data.json())
}