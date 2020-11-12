var express = require("express");
const apiRoutes = require("./routes/apiRoutes")
const htmlRoutes = require("./routes/htmlRoutes")

var app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes)
app.use('/', htmlRoutes)

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
