//I'll be documenting this project in Hinglish (Started on -> 09-01-2026)
/*
STRUCTURE OF THE FILE 

*/

//Basic SETUP====================================================
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const mongoose = require("mongoose");

//Models import
const Listing = require("./Models/Listing.js");
//Data import
const sampleListing = require("./init/data.js");

//method overrider
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//mongo connection---------------------------------------------
const mongodbUrl = "mongodb://127.0.0.1:27017/stayhunt";
//main is a async func, returns promise
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

//Routes-------------------------------------------------------
//show all listings
app.get("/listings", async (req, res) => {
    const alllistings = await Listing.find();
    res.render("alllistings.ejs", { alllistings }); //list of objects
});

//specific listing
app.get("/listings/:id", async (req, res) => {
    let id = req.params["id"];
    const specificlist = await Listing.find({ _id: id });
    res.render("listing.ejs", { specificlist }); //list of objects
});

//edit route
app.get("/listings/:id/edit", async (req, res) => {
    let id = req.params["id"];
    const specificlist = await Listing.findById(id);
    res.render("edit.ejs", { specificlist }); //list of objects
});

app.patch("/listings/:id/edit", async (req, res) => {
    let id = req.params["id"];
    const newupdate = req.body; //.body retuns object
    await Listing.updateOne({ _id: id }, { $set: newupdate });
    res.redirect("/listings");
});

//delete route
app.get("/listings/:id/delete", async (req, res) => {
    let id = req.params["id"];
    await Listing.deleteOne({ _id: id });
    res.redirect("/listings");
});

// app.get("/testlisting", async (req, res) => {
//     //importing data
//     const sampleListing = require("./init/data.js");
//     //mera
//     await Listing.insertMany(sampleListing);
//     //await sampleListing.save(); //used only if sample listing has one hardcoded doc
//     console.log("Sample was saved");
//     res.send("Successfully Saved.In database");
// });

//Boop
app.listen(8080, () => {
    console.log(`Server is listening`);
});
