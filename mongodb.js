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

// 1. Switch to (or create) the database
use Library_DB;

// 2. Create the books collection (optional, will be auto-created on insert)
db.createCollection("books");

// 3. Insert sample book data
db.books.insertMany([
  {
    book_id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "thriller",
    available: true
  },
  {
    book_id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "fiction",
    available: false
  },
  {
    book_id: 3,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "non-fiction",
    available: true
  },
  {
    book_id: 4,
    title: "1984",
    author: "George Orwell",
    genre: "fiction",
    available: true
  },
  {
    book_id: 5,
    title: "Educated",
    author: "Tara Westover",
    genre: "non-fiction",
    available: false
  }
]);

// 4. Retrieve all books
print("\n📚 All Books:");
db.books.find().forEach(printjson);

// 5. Retrieve books of genre 'fiction'
print("\n📘 Fiction Books:");
db.books.find({ genre: "fiction" }).forEach(printjson);
