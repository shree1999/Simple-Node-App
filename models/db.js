const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Blog-App', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set("useFindAndModify", false);

const schema = new mongoose.Schema({
    title: {
        type: String,
        default: "Please Provide Name",
    },
    urlImage: {
        type: String,
        default: "https://www.blackbeltkaratestudio.com/wp-content/uploads/2017/04/default-image.jpg",
    },
    body: {
        type: String,
        default: "Please Provide a good description."
    },
});

const blog = mongoose.model("blog", schema);

module.exports = {
    blog: blog
};