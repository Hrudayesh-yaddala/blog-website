
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Diary writing is the practice of recording personal thoughts, experiences, and emotions in a written format. It serves as a private outlet for self-expression and reflection. By maintaining a diary, individuals can document their daily activities, share their innermost thoughts and feelings, and track personal growth over time. It provides a safe space to explore ideas, seek clarity, and gain perspective on one's life. ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname,'/public')));
mongoose.connect("mongodb+srv://Hrudayesh:Hrudayesh22@e-diary.19t8elh.mongodb.net/E-diary", {useNewUrlParser: true,useUnifiedTopology: true,w:"majority"});

const postSchema = {
  title: String,
  content: String,
};
const contactSchema={
  name:String,
  email:String,
  message:String,
};

const Post = mongoose.model("Post", postSchema);
const Contact=mongoose.model("Contact",contactSchema);
app.get("/", async function(req, res) {
  try {
    const posts = await Post.find({});
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  } catch (err) {
    // Handle any errors that occur during the query
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/compose", function(req, res){
  res.render("compose");
});


app.post("/compose", async function(req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  try {
    await post.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    // Handle any errors that occur during the save operation
    res.status(500).send("Internal Server Error in composing data");
  }
});
app.post("/contact", async function(req, res) {
  const newContact = new Contact({
    name: req.body.postName,
    email: req.body.postEmail,
    message:req.body.postMessage,
  });

  try {
    await newContact.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    // Handle any errors that occur during the save operation
    res.status(500).send("Internal Server Error in contact data");
  }
});



app.get("/posts/:postId", async function(req, res) {
  const requestedPostId = req.params.postId;

  try {
    const post = await Post.findOne({ _id: requestedPostId });
    res.render("post", {
      title: post.title,
      content: post.content
    });
  } catch (error) {
    console.error(error);
    // Handle any errors that occur during the query
    res.status(500).send("Internal Server Error");
  }
});

app.post("/contact", async function(req, res) {
  res.redirect("/");
});


app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(5000, function() {
  console.log("Server started on port 5000");
});





