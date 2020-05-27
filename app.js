//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners

todoButton.addEventListener(
  "click",
  (addTodo = (event) => {
    //Prevent form from submitting and refreshing the website
    event.preventDefault();

    //Create Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);

    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);

    //Clear todo inputValue
    todoInput.value = "";
  })
);

todoList.addEventListener(
  "click",
  (deleteCheck = (e) => {
    const item = e.target;

    //DELETE TODO
    if (item.classList[0] === "trash-btn") {
      const todo = item.parentElement;

      //Animation
      todo.classList.add("fall");
      removeLocalTodos(todo);
      todo.addEventListener("transitionend", function () {
        todo.remove();
      });
    }

    //CHECK MARK
    if (item.classList[0] === "complete-btn") {
      const todo = item.parentElement;
      todo.classList.toggle("completed");
    }
  })
);

filterOption.addEventListener(
  "click",
  (filterTodo = (e) => {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    });
  })
);

const saveLocalTodos = (todo) => {
  //CHECK -- HEY Do I already have anything in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Create Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
};

document.addEventListener("DOMContentLoaded", getTodos);

const removeLocalTodos = (todo) => {
  //CHECK -- HEY Do I already have anything in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //Get index of clicked todo and remove that index with splice function
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};
