const express = require("express");
const cors = require("cors");
require("dotenv").config()
const connectDB = require('./config/db')


const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
});