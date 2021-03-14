const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
