function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${taskInput.value}</span>
        <button class="complete-button" onclick="completeTask(this)">Complete</button>
        <button class="delete-button" onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(li);
    taskInput.value = "";
}

function completeTask(button) {
    const taskItem = button.parentElement;
    taskItem.classList.add("completed");
    const taskText = taskItem.querySelector(".task-text");
    taskText.style.textDecoration = "line-through";
    taskText.style.color = "#777"; 
}


function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}
