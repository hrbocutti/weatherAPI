const axios = require('axios');
let token = 'b4b9b06f2a4965eb71c03c9e290e2f71';
let cities;
let idsCity;

callApi = async (url) => {
    try {
        cities = axios({
            method: 'get',
            url: url,
        }).then(response => {
            return response.data;
        })
    } catch (err) {
        console.log(err.message.error)
    }
    return cities;
}

exports.cityInfo = async (city, state) => {
    let cities = await listarCidades(city, state);
    let firstCityId = cities['0'].id;
    let infoFromCity = await getWeatherInfo(firstCityId).then(response => {
        return response;
    });
    return infoFromCity;
}

listarCidades = async (city, state) => {
    let url = `http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=${city}&state=${state}&token=${token}`;
    let urlEncoded = encodeURI(url);
    idsCity = await callApi(urlEncoded).then(response => {
       return response;
    });
    return idsCity;
}

getWeatherInfo = async (idCity) => {
    let url = `http://apiadvisor.climatempo.com.br/api/v1/weather/locale/${idCity}/current?token=${token}`;
    let urlEncoded = encodeURI(url);
    let cityInfo = await callApi(urlEncoded).then(response =>{
        return response;
    });
    return cityInfo;
}
