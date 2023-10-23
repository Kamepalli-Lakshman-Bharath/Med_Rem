const express = require("express");
const getUserById = require("../Controllers/UserControllers/getUserById");

const route = express.Router();

route.get("/user/:id",getUserById)

module.exports = route;