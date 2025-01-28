let tasks = [];
let editingTaskIndex = null;

function todoManager() {
  const tasksContainer = document.getElementById("tasksContainer");
  tasksContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskCard = `
      <div class="card bg-opacity-50 mt-3" data-task-id="${index}">
        <div class="card-body row">
          <div class="col-lg-10 col-12">
            <h4 class="card-text mb-0">${task.text}</h4>
          </div>
          <div class="col-lg-2 col-12 mt-lg-0 mt-3 text-right">
            <button class="btn btn-success rounded-circle me-2" onclick="toggleComplete(${index})">
              <i class="bi bi-check-lg"></i>
            </button>
            <button class="btn btn-warning rounded-circle ml-2" onclick="editTask(${index})">
              <i class="bi bi-pencil"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    tasksContainer.innerHTML += taskCard;
  });
}

document
  .getElementById("taskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const taskInput = document.getElementById("toDOText");
    const taskText = taskInput.value.trim();

    if (taskText) {
      if (editingTaskIndex !== null) {
        tasks[editingTaskIndex].text = taskText;
        editingTaskIndex = null;
      } else {
        tasks.push({ text: taskText, completed: false });
      }

      taskInput.value = "";
      todoManager();
      $("#exampleModal").modal("hide");
    }
  });

// btn toogling for complterd
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  const taskCard = document.querySelector(`[data-task-id="${index}"]`);
  const toggleButton = taskCard.querySelector(".btn-success, .btn-danger");

  if (tasks[index].completed) {
    //green tick
    taskCard.classList.add("card-complete");
    toggleButton.innerHTML = '<i class="bi bi-x-lg"></i>';
    toggleButton.classList.remove("btn-success");
    toggleButton.classList.add("btn-danger");
  } else {
    //red tick
    taskCard.classList.remove("card-complete");
    toggleButton.innerHTML = '<i class="bi bi-check-lg"></i>';
    toggleButton.classList.remove("btn-danger");
    toggleButton.classList.add("btn-success");
  }
}

//edot task
function editTask(index) {
  const task = tasks[index];
  const taskInput = document.getElementById("toDOText");
  taskInput.value = task.text;
  editingTaskIndex = index;
  const modalTitle = document.getElementById("exampleModalLabel");
  modalTitle.textContent = "Edit Task";
  $("#exampleModal").modal("show");
}

todoManager();
