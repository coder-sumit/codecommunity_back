const {MongoClient} = require("mongodb");

const DbConnector = async(uri, dbName)=>{
   try{
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Successfully connected to DB server!");
    const db = client.db(dbName);
    return db;
   }catch(err){
    console.log(err);
    console.log("Error while connecting to db!");
   }

}

module.exports = DbConnector;