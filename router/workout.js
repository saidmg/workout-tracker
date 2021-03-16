var express = require("express")
var router = express.Router()
const db = require("./../models");

router.get("/api/workouts", (req, res) => {
    db.workout.aggregate([
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

router.get("/api/workouts/range", (req, res) => {
    db.workout.aggregate([
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

router.post("/api/workouts", (req, res) => {
    db.workout.create({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    let id = req.params.id
    console.log('[id]', id)
    console.log('[req.body]', req.body)
    db.workout.findOneAndUpdate({ _id: id }, { $push: { exercises: req.body } }, { new: true, runValidators: true, context: 'query'  })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;