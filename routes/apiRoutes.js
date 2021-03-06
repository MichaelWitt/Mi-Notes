const fs = require('fs');
var notesData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

//Exporting our api routes
module.exports = function (app) {

    // Getting our notes data
    app.get("/api/notes", function (req, res) {
        res.json(notesData);
    });
    app.get("/api/notes/:id", function (req, res) {
        res.json(notesData[Number(req.params.id)]);
    });

    // Writing our notes data to our db
    app.post("/api/notes", function (req, res) {

        var newNotes = req.body;
        var idNumber = (notesData.length).toString();
        newNotes.id = idNumber;
        notesData.push(newNotes);

        fs.writeFileSync("./db/db.json", JSON.stringify(notesData), function (err) {
            if (err) throw (err);
        });

        res.json(notesData);
    });

    // Deleting our notes data from our db
    app.delete("/api/notes/:id", function (req, res) {
        var chosen = req.params.id;
        var noteId = 0;

        notesData = notesData.filter(presentNote => {
            return presentNote.id != chosen;
        });

        for (presentNote of notesData) {
            presentNote.id = noteId.toString();
            noteId++;
        }

        fs.writeFileSync('./db/db.json', JSON.stringify(notesData));
        res.json(notesData);
    });
}
