// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8080;
app.listen(port, listening);
//callback function to make sure server is running
function listening() {
  console.log("Server is Running");
  console.log(`Server is Running on Localhost:${port}`);
}

//GET Route
app.get("/allData", getData);
function getData(request, response) {
  response.send(projectData);
}

//POST Route
app.post("/addData", postData);
function postData(request, response) {
  projectData = request.body;
  response.send({ message: "Data sent successfully" });
}
