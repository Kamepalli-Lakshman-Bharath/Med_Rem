const express = require("express");
const Login = require("../Controllers/Login&Reg_Controllers/LoginController");
const Register = require("../Controllers/Login&Reg_Controllers/RegisterController");

const route = express.Router();

route.post("/login", Login);

route.post("/register", Register);

module.exports = route;
