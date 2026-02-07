const API = "http://localhost:5000/api";
const taskList = document.getElementById("taskList");

/* Load tasks on page load */
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    fetch(`${API}/tasks`, { credentials: "include" })
        .then(res => res.json())
        .then(tasks => {
            taskList.innerHTML = "";
            tasks.forEach(task => renderTask(task));
        });
}

/* Add Task */
function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();
    if (!title) return alert("Enter a task");

    fetch(`${API}/tasks`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    })
    .then(res => res.json())
    .then(task => {
        renderTask(task);
        input.value = "";
    });
}

/* Render Task */
function renderTask(task) {
    const li = document.createElement("li");
    li.className = "list-group-item";

    li.innerHTML = `
        <div class="d-flex align-items-center gap-2">
            <input type="checkbox" ${task.completed ? "checked" : ""}
                onchange="toggleComplete(${task.id}, this.checked)">
            
            <span class="task-text ${task.completed ? "completed" : ""}"
                ondblclick="enableEdit(this, ${task.id})">
                ${task.title}
            </span>

            <input type="text" class="form-control edit-input d-none"
                onblur="saveEdit(this, ${task.id})"
                onkeydown="if(event.key==='Enter') saveEdit(this, ${task.id})">
        </div>

        <div>
            <button class="btn btn-edit btn-sm"
                onclick="editTask(this, ${task.id})">Edit</button>
            <button class="btn btn-delete btn-sm"
                onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;

    taskList.appendChild(li);
}

/* Toggle Complete */
function toggleComplete(id, completed) {
    fetch(`${API}/tasks/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed })
    }).then(loadTasks);
}

/* Enable Inline Edit */
function editTask(btn, id) {
    const li = btn.closest("li");
    const text = li.querySelector(".task-text");
    const input = li.querySelector(".edit-input");

    input.value = text.innerText;
    text.classList.add("d-none");
    input.classList.remove("d-none");
    input.focus();
}

/* Save Inline Edit */
function saveEdit(input, id) {
    const title = input.value.trim();
    if (!title) return;

    fetch(`${API}/tasks/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    }).then(loadTasks);
}

/* Delete Task */
function deleteTask(id) {
    fetch(`${API}/tasks/${id}`, {
        method: "DELETE",
        credentials: "include"
    }).then(loadTasks);
}

/* Logout */
function logout() {
    fetch(`${API}/logout`, {
        method: "POST",
        credentials: "include"
    }).then(() => window.location.href = "login.html");
}
