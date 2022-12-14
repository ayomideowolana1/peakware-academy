const addCourseBtn = document.querySelector("#add-course");
const addCatBtn = document.querySelector("#add-catergory");

let categories = [];
let courses = [];

class Category {
  constructor(name, list) {
    this.name = name;
    this.list = list;
  }
}
class Course {
  constructor(name, description, introduction, attendees) {
    this.name = name;
    this.description = description;
    this.introduction = introduction;
    this.attendees = attendees;
  }
}

class Event {
  constructor(event, node) {
    this.event = event;
    this.node = node;
  }
}

const addCourse = () => {
  let form = document.querySelector("#create-course");
  let submit = document.querySelector("#create-course #submit");
  let content = document.querySelector(".courses .content");
  form.classList.toggle("hide")
  content.classList.toggle("hide")

  if(form.classList.contains("hide")){
    addCourseBtn.innerText = "Add new course"
  }else{
    addCourseBtn.innerText = "Cancel"
  }

};
const addCat = () => {
  let form = document.querySelector("#create-category");
  let submit = document.querySelector("#create-category #submit");

  submit.addEventListener("click", () => {
    form.classList.add("hide");
    form.classList.remove("show");
  });

  form.classList.add("show");
  form.classList.remove("hide");
};

const eventObject = [
  new Event(addCourse, addCourseBtn),
  new Event(addCat, addCatBtn)
];

eventObject.forEach(e => {
  e.node.addEventListener("click", e.event);
});
