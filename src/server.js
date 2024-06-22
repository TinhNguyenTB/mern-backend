const express = require("express");
const cors = require("cors");
require("dotenv").config()

const app = express();
app.use(cors());

const port = 8080 || process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})