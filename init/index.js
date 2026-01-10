const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/Listing.js");

const mongodbUrl = "mongodb://127.0.0.1:27017/stayhunt";
main()
    .then((res) => {
        console.log("Mongo is Successfully Connected.");
    })
    .catch((err) => {
        console.log(err);
    });
//connection is asynchronus
async function main() {
    await mongoose.connect(mongodbUrl);
}

const initDB = async () => {
    await Listing.deleteMany({}); //Initialize database
    //After initialization, adding data
    await Listing.insertMany(initData.data); //module.exports = { data: sampleListing }; thus, initData.data
    console.log("Data has been Initialized");
};

initDB();
