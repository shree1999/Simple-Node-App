// getting required modules
const blog = require("./models/db");
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// setting middlewares...
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
var db = blog.blog;

// routes...
app.get("/", (req, res) => {
    db.find({}, (error, blogs) => {
        blogs ? res.render("index", { blogs: blogs }) : console.log(error);
    });
});

app.get("/new/blog", (req, res) => {
    res.render("create");
});

app.post("/blog", (req, res) => {
    db.create(req.body, (error, newBlog) => {
        error ? console.log("Error") : res.redirect("/");
    });
})


app.listen(PORT, () => {
    console.log("Server up and running at port: " + PORT);
});