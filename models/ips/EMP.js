import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "EMPLOYEES";
const schema = new Schema({
  emp: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Employee Name is Required"],
    minlength: [3, "Employee Name must be at least 3 characters."],
  },
});

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, "EMPLOYEES");
