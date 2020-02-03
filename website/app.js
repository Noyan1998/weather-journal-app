/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = 'a2adda676ea3cad6bbeba93ebfcbba31';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.querySelector('#generate').addEventListener('click', performAction);
function performAction(e) {
  const newZip = document.getElementById('zip').value;
  const userResponse = document.getElementById('feelings').value;

  getWeather(baseURL, newZip, apiKey)
  .then(function(data) {
        let date = new Date(data.dt * 1000)
        let date_str = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();
        postData('/addWeather', {temperature: data.main.temp, date: date_str, userResponse: userResponse});
        updateUI();
      })
};

const getWeather = async (baseURL, newZip, apiKey) => {
  const res = await fetch(baseURL + newZip + '&appid=' + apiKey + '&units=imperial');
  try {
    const data = await res.json();
    return data;
  } catch(error) {
    console.log('error', error);
  };
};

const postData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type':'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch(error) {
    console.log('error', error);
  };
};


const updateUI = async() => {
  const req = await fetch('/all');
  try {
    const allData = await req.json();
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].temperature;
    document.getElementById('content').innerHTML = allData[0].userResponse;
  } catch(error) {
    console.log('error', error);
  };
};
