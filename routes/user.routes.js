const express = require("express")
const router = express.Router()
const userController = require("../controller/user.controller")
const userValidation = require("../middlware/validation")





router.post(
    "/register/user",
    userValidation.userRegisterSchema(),
    userController.registerUser
  );
  
  router.post(
    "/login/user",
    userValidation.userLoginSchema(),
    userController.loginUser
  );


module.exports = router
