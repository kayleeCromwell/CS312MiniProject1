//CONSTANTS
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//MEMORY
let posts = [];
let idCounter = 1;

//ACTIONS

//get on home page
app.get("/", (req, res) => {
  res.render("home", { posts });
});

//add post
app.post("/add", (req, res) => {
  const { author, title, content } = req.body;
  const newPost = {
    id: idCounter++,
    author,
    title,
    content,
    date: new Date().toLocaleString()
  };
  posts.push(newPost);
  res.redirect("/");
});

//get to edit
app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.send("Post not found!");
  res.render("edit", { post });
});

//add edits
app.post("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
  }
  res.redirect("/");
});

//remove a post
app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect("/");
});

// start/create a server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
