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
        date = new Date();
    else
        date = new Date(req.body.date);

    let newExercise = await models.Exercise.create({
        user: userId,
        description: description,
        duration: duration,
        date: date
    });


    newExercise = await newExercise.populate('user', 'username');

    res.json({
        _id: newExercise.user._id,
        username: newExercise.user.username,
        description: newExercise.description,
        duration: newExercise.duration,
        date: date.toDateString()
    });
});

router.get("/users/:_id/logs",async (req, res) => {
    const userId = req.params._id;
    const limit = (req.query.limit) ? req.query.limit : 0;
    const from = (req.query.from) ? req.query.from : 0;
    const to = (req.query.to) ? req.query.to : 0;


    const username = (await models.User.findById(userId)).username;
    const results = await models.Exercise.find({"user": userId}, {"_id": 0, "description": 1, "duration": 1, "date": 1})
    .limit(limit);

    const formattedResults = results.map((val, i) => {
        if (from && to)
        {
            const fromDate = new Date(from);
            const toDate = new Date(to);
            // console.log(`[fromdate]: ${fromDate}, [date]: ${(new Date(val.date))}, [todate]: ${toDate}\n[Values, LS, VL, MR]: ${fromDate.valueOf()}<->${(new Date(val.date)).valueOf()}<->${toDate.valueOf()}`);
            if ((fromDate <= (new Date(val.date))) && ((new Date(val.date)) <= toDate))
            {
                const originalDate = (new Date(val.date)).toDateString();
                return {"description": val.description, "duration": val.duration, "date": originalDate};
            }
            else
            {
                return null;
            }
        }
        const originalDate = (new Date(val.date)).toDateString();
        return {"description": val.description, "duration": val.duration, "date": originalDate}
    }).filter((result) => result !== null);;

    // console.log(formattedResults)

    res.json({
        _id: userId,
        username: username,
        ...((from != 0 && to != 0) ? { from: (new Date(from)).toDateString(), to: (new Date(to)).toDateString() } : {}),
        count: results.length,
        log: formattedResults
    })
});

module.exports = router;