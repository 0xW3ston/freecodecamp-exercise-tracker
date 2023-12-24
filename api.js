const router = require("express").Router();
const models = require("./models/index");

router.post("/users",async (req, res) => {
    const Username = req.body.username;
    const newUser = await models.User.create({
        username: Username
    });
    res.json({
        "username": newUser.username,
        "_id": newUser._id
    });
});

router.get("/users",async (req, res) => {
    const allUsers = await models.User.find();
    res.send(allUsers).end();
});

router.post("/users/:_id/exercises",async (req, res) => {
    const userId = req.params._id;
    const description = req.body.description;
    const duration = req.body.duration;
    let date = req.body.date;

    if (!date)
        date = new Date().toDateString()

    let newExercise = await models.Exercise.create({
        user: userId,
        description: description,
        duration: duration,
        date: date
    });


    newExercise = await newExercise.populate('user', 'username');

    res.json({
        _id: newExercise._id,
        username: newExercise.user.username,
        description: newExercise.description,
        duration: newExercise.duration,
        date: date
    });
});

router.get("/users/:_id/logs",async (req, res) => {
    
});

module.exports = router;