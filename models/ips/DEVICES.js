import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "DEVICES";
const schema = new Schema({
  device_type: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Device Type is Required"],
    minlength: [3, "Device Type must be at least 3 characters."],
  },
});

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, "DEVICES");
