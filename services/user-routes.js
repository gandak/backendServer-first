const { users } = require("../db/user-data");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const userSignUp = async (req, res) => {
  const newUser = req.body;

  const passwordHash = await bcrypt.hash(newUser.password, saltRounds);
  users.push({
    ...newUser,
    password: passwordHash,
    id: users.length,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.send("Successful");
};

const checkPassword = async (req, res) => {
  const { name, password } = req.body;

  const foundUser = users.find((user) => {
    return user.name === name;
  });

  if (!foundUser) return res.send("User not found");

  let isValid = await bcrypt.compare(password, foundUser.password);

  return isValid
    ? res.send("Logged in successfully")
    : res.send("You are not authorized to log in");
};

const editUserInfo = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  const foundUser = users.find((user) => name === user.name);

  if (foundUser) {
    if (password) {
      let passwordHash = await bcrypt.hash(newUser.password, saltRounds);
      foundUser.password = passwordHash;
      foundUser.updatedAt = new Date();
    }
    if (email) {
      foundUser.email = email;
      foundUser.updatedAt = new Date();
    }
    if (address) {
      foundUser.address = address;
      foundUser.updatedAt = new Date();
    }
    if (role) {
      foundUser.role = role;
      foundUser.updatedAt = new Date();
    }
    return res.send("User info edited");
  }
  return res.send("User not found");
};

const getProfile = (req, res) => {
  const { name } = req.body;
  const { password, updatedAt, ...rest } = users.find(
    (user) => name === user.name
  );
  res.send(rest);
};

const deleteProfile = (req, red) => {
  const { id } = req.body;
   const foundUser = users.find(
    (user) => id === user.
    
  );
};

module.exports = { checkPassword, userSignUp, editUserInfo, getProfile };
