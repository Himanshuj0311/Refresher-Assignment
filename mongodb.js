use ToDoList_DB // switches to or creates the database


db.createCollection("tasks") // creates the tasks collection


db.tasks.find({ status: "pending" })


db.tasks.insertMany([
  {
    task_id: 1,
    task_name: "Complete Assignment",
    description: "Finish the JavaScript assignment",
    status: "pending",
    due_date: new Date("2025-06-10")
  },
  {
    task_id: 2,
    task_name: "Grocery Shopping",
    description: "Buy vegetables and fruits",
    status: "completed",
    due_date: new Date("2025-06-05")
  },
  {
    task_id: 3,
    task_name: "Project Meeting",
    description: "Discuss project milestones",
    status: "in-progress",
    due_date: new Date("2025-06-09")
  },
  {
    task_id: 4,
    task_name: "Read a Book",
    description: "Read 50 pages of a novel",
    status: "pending",
    due_date: new Date("2025-06-08")
  },
  {
    task_id: 5,
    task_name: "Workout",
    description: "Go for a morning run",
    status: "completed",
    due_date: new Date("2025-06-06")
  }
])


db.tasks.find()

db.tasks.find({ status: "pending" })


const today = new Date();
const nextWeek = new Date();
nextWeek.setDate(today.getDate() + 7);

db.tasks.find({
  due_date: {
    $gte: today,
    $lte: nextWeek
  }
})
