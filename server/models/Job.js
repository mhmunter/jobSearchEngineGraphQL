const { Schema, model } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedJobs` array in User.js
const jobSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  catagory: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Job = model("Job", jobSchema);

module.exports = Job;
