import express from "express";
const router = express.Router();



router.get("/hello-world", (req, res) => {
    res.send({message: "hello world"});
});


router.get("/teams/epic", (req, res) => {
    res.send([
        {
            name: "sid",
            age: "21"
        },
        {
            name: "caleb",
            age: "25"
        }
    ]);
});

router.get("/teams/:teamName", (req, res) => {

    const team = req.params.teamName;

    if(team.toLowerCase() === "arsenal") {
        res.send({message: team + " are the best team"});
    } else {
        res.send({message: team + " are ok i guess"})
    }
    
});


router.get("/fruits/:fruitId" , (req, res) => {

    const fruitId = req.params.fruitId;
    
    
    let fruits = [
        "apple",
        "orange",
        "banana"
    ];
    
    if(parseInt(fruitId) > fruits.length || parseInt(fruitId) < 1) {
        res.send({error: "fruit does not exist"});
    } else {
        res.send(fruits[fruitId - 1]);
    }
});

router.get("/meals", (req, res) => {

    let italianMeals = [
        "pizza",
        "risotto",
        "pasta"
    ];

    let globalMeals = [
        "burger",
        "meatballs",
        "steak"
    ];

    if (req.query.country !== "italy") return res.send(globalMeals);
    
    if (req.query.country === "italy") return res.send(italianMeals);
});


router.post("/add-note", (req, res) => {
    
    const note = req.body;

    res.send({
        status: 200,
        message: "added note",
        note: `${note}`
    });
});

export default router;