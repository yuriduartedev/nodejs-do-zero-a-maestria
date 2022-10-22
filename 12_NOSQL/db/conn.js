const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/testemongodb";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log(`Successfully connected with MongoDB! ✅`);
  } catch (error) {
    console.log(`Cannot connect to database error: ${error}`);
  }
}

run();

module.exports = client;
