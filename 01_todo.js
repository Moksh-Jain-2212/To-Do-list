document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("task")) || [];
    tasks.forEach(t => {
        renderTask(t);
    });

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim(); //trim -> cut the spaces at the last
    if (taskText === "") return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    console.log(tasks);
    todoInput.value = "";
  });

  function renderTask(task) {
    const temp = document.createElement("li");
    if (task.completed) temp.classList.add("completed");
    temp.innerHTML = `
    ${task.text}
    <button>Delete</button>`;

    temp.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      temp.classList.toggle("completed");
    //   saveTasks();
    });

    temp.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      temp.remove();
      saveTasks();
    });

    todoList.appendChild(temp);
  }

  function saveTasks() {
    localStorage.setItem("task", JSON.stringify(tasks));
  }
});
