// getting required modules
const blog = require("./models/db");
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// setting middlewares...
const app = express();
const PORT = process.env.PORT || 3000;

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
});

app.get("/more/:id", (req, res) => {
    db.findById(req.params.id, (error, blog) => {
        error ? res.redirect("/") : res.render("fullBlog", { blog: blog });
    });
});

app.get("/blog/edit/:id", (req, res) => {
    db.findById(req.params.id, (error, blog) => {
        if (error) {
            console.log(error);
        } else {
            res.render("edit", { blog: blog });
        }
    });
});

app.put("/blog/:id", (req, res) => {
    db.findByIdAndUpdate(req.params.id, req.body, (error) => {
        if (error) {
            res.redirect("/");
        } else {
            res.redirect("/more/" + req.params.id);
        }
    });
});

app.delete("/blog/:id", (req, res) => {
    db.findByIdAndRemove(req.params.id, req.body, (error, blog) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect("/");
        }
    });
});


app.listen(PORT, () => {
    console.log("Server up and running at port: " + PORT);
});