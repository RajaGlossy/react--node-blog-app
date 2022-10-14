const express = require("express");
const cors = require("cors");
const Blog = require("./models/blog");
const SignIn = require("./models/SignIn");
const app = express();

const mongoose = require("mongoose");

app.use(cors());

app.use(express.json());

mongoose.connect(
  "mongodb+srv://raja:qwerty123@mern.9yjhtiv.mongodb.net/blog?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  let mailAlreadyExist = await SignIn.findOne({ email: email });
  if (mailAlreadyExist) {
    res.status(404).json({ success: false, data: "Mail Already Exist" });
  } else {
    try {
      const SignInData = await SignIn({
        email: email,
        password: password,
        name: name,
      });
      await SignInData.save();
      res.status(200).json({ success: true, data: SignInData });
    } catch (error) {
      res.status(404).json({ success: false });
      console.log(error);
    }
  }
});

app.get("/signInData", async (req, res) => {
  SignIn.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json({ success: true, data: result });
  });
});

app.post("/insert", async (req, res) => {
  try {
    console.log(req.body);
    const blogTitle = req.body.title;
    const blogContent = req.body.blog;
    const createdBy = req.body.loginId;
    const blogImage = req.body.image;
    console.log(createdBy);

    const blog = await Blog({
      blogTitle: blogTitle,
      blogContent: blogContent,
      createdBy: createdBy,
      blogImage: blogImage,
    });

    await blog.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false });
    console.log(error);
  }
});

app.get("/read", async (req, res) => {
  Blog.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json({ result });
  });
});

app.get("/read/:id", async (req, res) => {
  Blog.findById(req.params.id, (err, result) => {
    if (err) {
      console.log(err.message);
    }
    res.status(200).json({ result });
  });
});

app.put("/update/:id", async (req, res) => {
  const blogContent = req.body;
  const id = req.params.id;
  try {
    const a = await Blog.findByIdAndUpdate(id, blogContent, {
      new: true,
    });
    res.status(200).json({ success: true, data: a });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndRemove(id).exec();
  res.status(200).json({ success: true, data: "deleted" });
});

app.listen(5000, () => {
  console.log("app listening");
});
