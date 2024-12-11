const express = require("express")
const app = express()
const path = require("path")
const db = require("./model/db")
const bodyParser = require("body-parser")
const userRouter = require("./routes/user.routes")
require("dotenv").config()


db.sequelize




app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use("/api", userRouter)


app.get("/", (req, res) => {
    res.send(`express server connected http://localhost:${process.env.PORT_NUMBER}`)
})




app.listen(process.env.PORT_NUMBER,() => {
    console.log(`localhost server connected successfully http://localhost:${process.env.PORT_NUMBER}`)
}) 