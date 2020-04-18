// getting required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// setting middlewares...
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// routes...
app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log("Server up and running at port: " + PORT);
});