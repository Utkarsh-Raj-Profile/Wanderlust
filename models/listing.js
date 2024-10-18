const mongoose = require("mongoose");
const Review = require("./review.js");

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    url: {
      type: String,
      default:
        "https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg",
      set: (v) =>
        v === ""
          ? "https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg"
          : v,
    },
    filename: {
      type: String,
      default: "filename",
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Review",
    },
  ],
  owner : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
  },
  geometry : {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing){
    await Review.deleteMany({_id : {$in : listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;