const router = require("./htmlRoutes");
var notesData = require("../db/db.json");

router.get("/api/notes", function (req, res) {
    return res.json(notesData);
});

router.post("/notes", function (req, res) {

    var newNotes = req.body;

    notesData.push(newNotes);

    res.json(newNotes);
});

router.delete("/notes/:id", function (req, res) {
    var chosen = req.params.notesData;

    console.log(chosen);

    for (var i = 0; i < notesData.length; i++) {
        if (chosen === notesData[i].routeName) {
            return res.json(notesData[i]);
        }
    }

    return res.json(false);
});

module.exports = router;