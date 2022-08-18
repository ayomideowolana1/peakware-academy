const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Route } = require("./helpers");
const { db, Category, Course } = require("./mongoose/schemas");
const { v4: uuidv4 } = require("uuid");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded());

db().catch((err) => console.log(err));

let navGetObject = [
  new Route("/about", "about"),
  new Route("/contact", "contact"),
  new Route("/training-calendar", "training-calendar"),
  new Route("/clients", "clients"),
  new Route("/faqs", "faqs"),
  new Route("/gallery", "gallery"),
  new Route("/e-learning", "e-learning"),
  new Route("/reister", "register"),
  new Route("/lms-solution", "lms-solution"),
  new Route("/categories/:category", "category"),
];

app.get("/", async (req, res) => {
  const categories = await Category.find({});
  res.render("landing-page", { categories: categories });
});

app.post("/create-category", async (req, res) => {
  const { categoryName } = req.body;
  const category = new Category({ title: categoryName, id: "1234" });
  category.save().then(
    () => console.log("One entry added"),
    (err) => console.log(err)
  );

  // console.log(Category);
  res.redirect("/admin");
});

app.post("/create-course", async (req, res) => {
  const { title, category, introduction, description, attendees } = req.body;
  const course = new Course({
    title,
    category,
    introduction,
    description,
    attendees,
    id: uuidv4(),
  });
  course.save().then(() => {
    res.redirect("/admin");
  });
  // console.log(Category);
});

app.get("/courses/:action/:id", async (req, res) => {
  const { action, id } = req.params;
  if (action == "delete") {
    await Course.find({ id: id })
      .remove()
      .then(() => {
        res.redirect("/admin");
      });
  }
});

app.get("/categories/:id", async (req, res) => {
  const { id } = req.params;
  const category = await Category.find({id:id})
  const courses = await Course.find({category:category[0].title})

  console.log(courses)
  // console.log(category[0].title)

  res.render("category",{courses:courses,category:category})
});

app.get("/courses/:id", async (req, res) => {
  const { id } = req.params;
  const course = await Course.find({id:id})

  console.log(course)

  res.render("course",{course:course})
});

app.get("/data", async (req, res) => {
  const data = await Category.find();
  res.json(data);
});

app.get("/admin", async (req, res) => {
  const categories = await Category.find();
  const courses = await Course.find();

  res.render("admin", { categories, courses });
});

navGetObject.forEach((route) => {
  app.get(route.route, (req, res) => {
    res.render(route.page);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening......");
});




