var tasks = [];

function addTask() {
  var taskInput = document.getElementById("taskInput");

  if (taskInput.value === "") {
    alert("Please enter a task.");
    return;
  }

  var task = {
    id: Date.now(),
    name: taskInput.value,
    completed: false
  };

  tasks.push(task);

  renderTasks();

  taskInput.value = "";
}

function renderTasks() {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(function(task) {
    var listItem = document.createElement("li");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function() {
      toggleTaskCompleted(task.id);
    });

    var taskText = document.createElement("span");
    taskText.innerText = task.name;
    if (task.completed) {
      taskText.classList.add("completed");
    }

    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", function() {
      editTask(task.id);
    });

    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function() {
      deleteTask(task.id);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
}

function toggleTaskCompleted(id) {
  var task = tasks.find(function(task) {
    return task.id === id;
  });

  task.completed = !task.completed;

  renderTasks();
}

function editTask(id) {
  var task = tasks.find(function(task) {
    return task.id === id;
  });

  var newName = prompt("Enter the new task name:", task.name);

  if (newName && newName.trim() !== "") {
    task.name = newName.trim();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(function(task) {
    return task.id !== id;
  });

  renderTasks();
}

