import { Schema, model } from "mongoose";

const employeesSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 100
  },
  birthday: {
    type: String,
    required: true,
    maxLength: 100
  },
  email: {
    type: String,
    required: true,
    maxLength: 100
  },
  password: {
    type: String,
    required: true,
    maxLength: 100
  },
  telephone: {
    type: Number,
    required: true
  },
  dui: {
    type: String,
    required: true,
    maxLength: 10
  },
  isVerified: {
    type: Boolean
  }
}, {
  timestamps: true,
  strict: false
});

export default model("employeesModel", employeesSchema);
