import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "EMPLOYEES";
const schema = new Schema(
  {
    employee_name: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
      required: [true, "Employee Name is Required"],
      minlength: [3, "Employee Name must be at least 3 characters."],
      maxlength: [20, "Employee Name must not exceed 20 characters."],
    },
  },
  { timestamps: true }
);

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, "EMPLOYEES");
