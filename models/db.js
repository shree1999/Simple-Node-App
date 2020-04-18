const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Blog-App", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set("useFindAndModify", true);

var schema = new mongoose.Schema({
    title: String,
    url: {
        type: String,
        default: "https://www.blackbeltkaratestudio.com/wp-content/uploads/2017/04/default-image.jpg"
    },
    body: String,
    created: {
        type: Date,
        default: Date.now()
    }
});

var blog = mongoose.model("blog", schema);

module.exports = {
    blog: blog
}