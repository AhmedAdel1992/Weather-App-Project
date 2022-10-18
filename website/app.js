/* Global Variables */
const TheBaseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const TheApiKey = "&appid=d0bfa71201fcd30a5c060463ec8aa8b1&units=metric";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//Adding an event listener to the generate button in the HTML
document.querySelector("#generate").addEventListener("click", getAllData);
//the Callback function of the event listener
function getAllData() {
  //declaring the zipcode and feelings values which will be provided by the user
  const zipValue = document.querySelector("#zip").value;
  const feelingsValue = document.querySelector("#feelings").value;
  getTheWeather(TheBaseURL, zipValue, TheApiKey)
    .then(function (data) {
      console.log(data);
      //add Data to the Post Route
      postData("/addData", {
        date: d,
        temp: data.main.temp,
        content: feelingsValue,
      });
    })
    .then(function (data) {
      console.log(data);
      updateUI();
    });
}

//The function used to get the data from the OpenWeather API
const getTheWeather = async (baseURL, zipCode, apiKey) => {
  const request = await fetch(`${baseURL}${zipCode}${apiKey}`);
  try {
    const response = await request.json();
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

//Function used to post the data
const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch("/addData", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//Function used to get all the data from the app endpoint and then update the UI according to the entries we got from the Api and the entries inserted by the user
const updateUI = async () => {
  const request = await fetch("/allData");
  try {
    const allData = await request.json();
    document.querySelector("#date").innerHTML = `Date is: ${allData.date}`;
    document.querySelector(
      "#temp",
    ).innerHTML = `Temperature is: ${allData.temp}°C`;
    document.querySelector(
      "#content",
    ).innerHTML = `My feelings today are: ${allData.content}`;
  } catch (error) {
    console.log("error", error);
  }
};
