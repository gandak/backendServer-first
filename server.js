const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser());
const { upcomingMovies } = require("./utils/movieDB");

// app.get("/", function (req, res) {
//   // const results = upcomingMovies.results;
//   // res.send({ results });
//   console.log(req.body);
//   res.send("Post");
// });

let users = [];
const saltRounds = 10;

const userSignUp = async (userData) => {
  users.push(userData);
  const hashPassword = await bcrypt.hash(userData.password, saltRounds);

  userData.password = hashPassword;
};

const checkPassword = (loginInfo) => {
  const isFound = users.find((user) => {
    return bcrypt.compare(user.password, loginInfo.password) ? true : false;
  });

  return isFound
    ? "Logged in successfully"
    : "You are not authorized to log in";
};

app.post("/signup", (req, res) => {
  userSignUp(req.body);
  res.send("User added");
});

app.post("/login", (req, res) => {
  const info = checkPassword(req.body);

  res.send(info);
});

app.put("/users", (req, res) => {
  const { name, age, gender } = req.body;
  const foundUser = users.find((user) => name === user.name);

  if (foundUser) {
    Object.assign(foundUser, { age, gender });
    res.send("User info edited");
  }
  res.send("User not found");
});

app.get("/users", (req, res) => {
  res.send(users);
});
console.log(users);
app.listen(4000, () => {
  console.log(`Example app listening on port ${4000}`);
});
