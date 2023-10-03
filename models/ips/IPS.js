import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "IPS";
const schema = new Schema({
  ip: {
    type: String,
    required: [true, "IP is Required"],
    unique: true,
    trim: true,
  },
  location: {
    type: String,
    uppercase: true,
    trim: true,
    required: [true, "location is Required"],
  },
  device_type: {
    type: String,
    trim: true,
    required: [true, "device Type is Required"],
  },

  added_date: {
    type: String,
    trim: true,
    default: Date.now(),
    required: [true, "Added Date is Required"],
  },
  added_by: {
    uppercase: true,
    type: String,
    trim: true,
    required: [true, "Added By is Required"],
  },

  notes: {
    type: String,
    default: "No Notes",
  },
});

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, "IPS");
