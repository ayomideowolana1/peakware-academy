const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: String,
  id: String,
});
const CourseSchema = new mongoose.Schema({
  title: String,
  category: String,
  id: String,
  description: String,
  attendees: String,
  introduction: String,
});

const FaqSchema = new mongoose.Schema({
  question: String,
  answer: String
});

const Course = mongoose.model("Course", CourseSchema);
const Category = mongoose.model("Category", CategorySchema);
const Faq = mongoose.model("Faq", FaqSchema);

const db = async function main() {
  try {
    await mongoose
      .connect(
        "mongodb+srv://ayomideowolana:iloveNif5.1@school-db.6t9q1.mongodb.net/?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log("connected to db");
      });
  } catch (errr) {
    console.log(err);
  }
};

module.exports = { db, Course, Category, Faq };
