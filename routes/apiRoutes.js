const router = require("./htmlRoutes");

// Displays all characters
router.get("/notes", function (req, res) {
    return res.json(characters);
});

// Displays a single character, or returns false
router.delete("/notes/:id", function (req, res) {
    var chosen = req.params.character;

    console.log(chosen);

    for (var i = 0; i < characters.length; i++) {
        if (chosen === characters[i].routeName) {
            return res.json(characters[i]);
        }
    }

    return res.json(false);
});

// Create New Characters - takes in JSON input
router.post("/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newCharacter = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newCharacter);

    characters.push(newCharacter);

    res.json(newCharacter);
});

module.exports = router;