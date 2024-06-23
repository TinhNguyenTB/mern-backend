const express = require("express");
const cors = require("cors");
require("dotenv").config()
const connectDB = require('./config/db')
const router = require('./routes/api');

const app = express();
app.use(cors());
app.use('/api', router);

const port = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
});