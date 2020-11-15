const fs = require('fs');
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));


module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        res.json(data);
    });
    app.get("/api/notes/:id", function (req, res) {
        res.json(data[Number(req.params.id)]);
    });

    app.post("/api/notes", function (req, res) {

        var newNotes = req.body;
        var idNumber = (data.length).toString();
        newNotes.id = idNumber;
        data.push(newNotes);

        fs.writeFileSync("./db/db.json", JSON.stringify(data), function (err) {
            if (err) throw (err);
        });

        res.json(data);
    });

    app.delete("/api/notes/:id", function (req, res) {
        var chosen = req.params.id;
        var currentId = 0;

        data = data.filter(presentNote => {
            return presentNote.id != chosen;
        });

        for (presentNote of data) {
            presentNote.id = currentId.toString();
            currentId++;
        }

        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        res.json(data);
    });

}
