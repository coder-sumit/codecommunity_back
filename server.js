const express = require("express");
const app = express();
const {APP_PORT} = require("./config");
const cors = require("cors");
const db = require("./config/mongoose");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(cors())

app.use("/api", require("./routes"));

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/images", express.static(__dirname + "/images"));




app.use(errorHandler);

app.listen(APP_PORT, (err)=> {
    if(err){
        console.log(err);
    }
    console.log(`Server is Up and running on Port ${APP_PORT}`);
});