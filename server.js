const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser());
const {
  userSignUp,
  checkPassword,
  editUserInfo,
  getProfile,
} = require("./services/user-routes");

// USER ROUTE
app.post("/users/signup", userSignUp);
app.post("/users/login", checkPassword);
app.put("/users/profile", editUserInfo);
app.get("/users/profile", getProfile);

app.listen(4000, () => {
  console.log(`Example app listening on port ${4000}`);
});

// https://www.geeksforgeeks.org/express-js-express-router-function/
