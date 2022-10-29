const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/testemongoosedb");
  console.log("MongoDB connected with mongoose! ✅");
}

main().catch((error) => console.log(error));

module.exports = mongoose;
