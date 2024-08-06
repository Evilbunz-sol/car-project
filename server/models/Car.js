const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, "Please provide car make"],
    trim: true,
  },
  model: {
    type: String,
    required: [true, "Please provide car model"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Please provide car year"],
  },
  price: {
    type: Number,
    required: [true, "Please provide car price"],
  },
  fuelType: {
    type: String,
    required: [true, "Please provide fuel type"],
    enum: ["Gasoline", "Diesel", "Electric", "Hybrid"],
  },
  engineType: { type: String },
  transmission: { type: String, enum: ["Automatic", "CVT", "Manual", "Single-speed"], },
  seatingCapacity: { type: Number },
  mpg: { type: String },
  safetyRating: { type: String },
  techFeatures: [String],  // Array of strings
  primaryUse: { type: String, enum: ["Commuting", "Family use", "Long-distance travel", "Mixed", "Off-road adventures"] },
  drivingEnvironment: [String],  // Array of strings,
  carSize: {
    type: String,
    required: [true, "Please provide car size"],
    enum: ["Coupe", "Sedan", "Wagon", "SUV", "Truck"],
  },
  imageURL: { type: String },
  mustHaveFeature: { type: String },
  additionalConsideration: { type: String },
  externalLinks: [String],  // Array of strings
  styleRating: { type: Number, min: 1, max: 5 },
  luxuryRating: { type: Number, min: 1, max: 5 },
  performanceRating: { type: Number, min: 1, max: 5 },
  maintenanceCost: { type: String, enum: ['Low', 'Medium', 'High'] },
  resaleValueRating: { type: Number, min: 1, max: 5 }
});

module.exports = mongoose.model("Car", CarSchema);