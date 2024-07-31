document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        text: taskInput.value,
        completed: false
    };

    const li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <button class="complete-button" onclick="completeTask(this)">Complete</button>
        <button class="delete-button" onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(li);
    taskInput.value = "";

    saveTask(task);
}

function completeTask(button) {
    const taskItem = button.parentElement;
    taskItem.classList.add("completed");
    const taskText = taskItem.querySelector(".task-text");
    taskText.style.textDecoration = "line-through";
    taskText.style.color = "#777"; 

    const taskIndex = Array.from(taskItem.parentNode.children).indexOf(taskItem);
    updateTaskCompletion(taskIndex, true);
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    const taskIndex = Array.from(taskItem.parentNode.children).indexOf(taskItem);
    taskItem.remove();
    deleteTaskFromStorage(taskIndex);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        const taskList = document.getElementById("taskList");
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <button class="complete-button" onclick="completeTask(this)">Complete</button>
            <button class="delete-button" onclick="deleteTask(this)">Delete</button>
        `;
        if (task.completed) {
            li.classList.add("completed");
            const taskText = li.querySelector(".task-text");
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "#777"; 
        }
        taskList.appendChild(li);
    });
}

function updateTaskCompletion(index, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTaskFromStorage(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
