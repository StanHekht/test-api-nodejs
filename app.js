const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Post request to v1 endpoint
app.post("/api/v1/parse", (req, res) => {

  const data = req.body.data;

  // Destructure the string from request body to match desired format of the data sent to the client
  let [fName, fNameId, lName, lNameId, phone] = data.split(/([0]{3,4})/);
  const firstName = `${fName}${fNameId}`;
  const lastName = `${lName}${lNameId}`;
  const clientId = phone;

  // Create a response object that accepts values as set forth in the specifications
  const responseData = {
      statusCode: res.statusCode, 
      data:  { 
        firstName: firstName,
        lastName: lastName,
        clientId: clientId
      } 
  }

  // Send response data to the client
  res.send(responseData);
})

// Post request to v2 endpoint
app.post("/api/v2/parse", (req, res) => {

  const data = req.body.data;

  // Destructure the string from request body in order to match format of the data sent to the client
  let [firstName, lastName, undashedPhone] = data.split(/[0]{3,4}/);
  let clientId = undashedPhone.replace(/(\d{3})(\d{4})/, "$1-$2");

  // Create a response object that accepts values as set forth in the specifications
  const responseData = {
      statusCode: res.statusCode, 
      data:  { 
        firstName: firstName,
        lastName: lastName,
        clientId: clientId
      } 
  }

  // Send response data to the client
  res.send(responseData);
})

// Have application listen to port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("The server is running on port 3000");
})
