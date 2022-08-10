const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Route } = require("./helpers");
const { db, Category } = require("./mongoose/schemas");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded());

db().catch(err => console.log(err));

let navGetObject = [
  new Route("/", "landing-page"),
  new Route("/about", "about"),
  new Route("/contact", "contact"),
  new Route("/training-calendar", "training-calendar"),
  new Route("/clients", "clients"),
  new Route("/faqs", "faqs"),
  new Route("/gallery", "gallery"),
  new Route("/e-learning", "e-learning"),
  new Route("/reister", "register"),
  new Route("/lms-solution", "lms-solution"),
  new Route("/categories/:category", "category")
];

app.post("/create-category", async (req, res) => {
  const { categoryName } = req.body;
  const category = new Category({ title: categoryName, id: "1234" });
  category
    .save()
    .then(() => console.log("One entry added"), err => console.log(err));

  // console.log(Category);
  res.redirect("/admin");
});

app.get("/data", async (req, res) => {
  const data = await Category.find();
  res.json(data);
});

app.get("/admin",async (req,res)=>{
  const categories = await Category.find();
  console.log(typeof(categories))
  res.render("admin",{categories})
})

navGetObject.forEach(route => {
  app.get(route.route, (req, res) => {
    res.render(route.page);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening......");
});
