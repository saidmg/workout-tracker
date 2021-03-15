const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: true
        },
        name: {
            type: String,
            trim: true,
            required: true
        },
        weight: {
            type: Number,
        },
        sets: {
            type: Number,
        },
        reps: {
            type: Number,
        },
        duration: {
            type: Number,
            required: true
        },
        distance: {
            type: Number,
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
    ],
    day: {
        type: Date,
        default: ()=> new Date()
    }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
