const express = require("express");
const app = express();
const {APP_PORT} = require("./config");
const db = require("./config/db");





app.listen(APP_PORT, (err)=> {
    if(err){
        console.log(err);
    }
    console.log(`Server is Up and running on Port ${APP_PORT}`);
});