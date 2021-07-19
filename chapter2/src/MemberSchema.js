const mongoose = require('mongoose')
const { Schema } = mongoose

const memberSchema = new Schema({
  name: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  note: { type: String },
  joinDt: { type: Date },
})

module.exports = memberSchema
