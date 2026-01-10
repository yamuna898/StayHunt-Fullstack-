//Iss model me place (house, appartment, flat, villa, hotel)
//related details (Image, title, description, price, location, country, place added for rent on date,added by person)

const mongoose = require("mongoose");
const schema = mongoose.Schema;
const listSchema = new schema({
    place: { type: String, required: true },
    image: {
        filename: { type: String },
        url: {
            type: String,
            default: "./img.jpg",
            set: (v) => (v === "" ? "./img.jpg" : v),
        },
    },
    title: String,
    description: String,
    price: Number,
    location: String,
    country: String,
    Query: Number,
    email: String,
    dateadded: { type: Date, default: Date.now },
});
const Listing = mongoose.model("Listing", listSchema);
module.exports = Listing;
