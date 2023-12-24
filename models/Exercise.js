const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    description: String,
    duration: Number,
    date: String
  });

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = {
    Exercise
}