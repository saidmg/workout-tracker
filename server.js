const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const db = require("./models");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));



app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
});

app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            }
        }
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
            console.log('[dbWorkout]', dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        },
    ])
        .sort({ _id: -1 })
        .limit(7)
        .then((dbWorkouts) => {
            console.log(dbWorkouts);
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        });
})

app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

app.put("/api/workouts/:id", (req, res) => {
    let id = req.params.id
    console.log('[id]', id)
    console.log('[req.body]', req.body)
    db.Workout.findOneAndUpdate({ _id: id }, { $push: { exercises: req.body } }, { new: true, runValidators: true, context: 'query'  })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});
mongoose.connect("mongodb+srv://saidmg:skotkalb@cluster0.94zt9.mongodb.net/workout?retryWrites=true&w=majority" || 'mongodb://localhost/workout', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
});
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});