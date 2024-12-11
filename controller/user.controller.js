const db = require("../model/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.registerUser = async (req, res) => {
    try {
        const userCheck = await db.users.findOne({ where: { email: req.body.email } });
        console.log("------------userCheck--------------", userCheck);

        if (userCheck) {
            return res.status(409).json({
                data: false,
                message: "A user with this email is already registered."
            });
        }

        const securePassword = await bcrypt.hash(req.body.password, 10);
        console.log("++++++++++++ securePassword +++++++++++", securePassword);

        const userData = {
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            select_business_category: req.body.select_business_category,
            date_of_birth: req.body.date_of_birth,
            password: securePassword
        };

        const addUser = await db.users.create(userData);
        console.log("+++++++++++ addUser +++++++++++", addUser);

        return res.status(201).json({
            data: true,
            userData: addUser,
            message: "User registered successfully."
        });

    } catch (error) {
        console.log("******** error *********", error);
        return res.status(500).json({
            data: false,
            message: "An error occurred while registering the user."
        });
    }
};











exports.loginUser = async (req, res) => {
    try {
        const findUser = await db.users.findOne({ where: { phone_number: req.body.phone_number } });
        console.log("------------findUser--------------", findUser);

        if (!findUser) {
            return res.status(404).json({
                data: false,
                message: "User with this phone number not found."
            });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, findUser.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                data: false,
                message: "Incorrect password."
            });
        }

        const token = jwt.sign(
            { id: findUser.id, name: findUser.name, email: findUser.email },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
        );
        console.log("********** token ************", token);

        return res.status(200).json({
            data: true,
            jwtToken: token,
            user: findUser,
            message: "User logged in successfully."
        });

    } catch (error) {
        console.log("******** error *********", error);
        return res.status(500).json({
            data: false,
            message: "An error occurred while logging in the user."
        });
    }
};
