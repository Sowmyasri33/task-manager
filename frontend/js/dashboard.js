const API = "http://localhost:5000";

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const task = document.getElementById("taskInput").value;

    fetch(`${API}/tasks`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
    }).then(() => {
        document.getElementById("taskInput").value = "";
        loadTasks();
    });
}

function loadTasks() {
    fetch(`${API}/tasks`, { credentials: "include" })
        .then(res => res.json())
        .then(tasks => {
            const list = document.getElementById("taskList");
            list.innerHTML = "";

            tasks.forEach(t => {
                list.innerHTML += `
                    <li>
                        ${t.task}
                        <button onclick="editTask(${t.id})">Edit</button>
                        <button onclick="deleteTask(${t.id})">Delete</button>
                    </li>
                `;
            });
        });
}

function editTask(id) {
    const newTask = prompt("Edit task:");
    fetch(`${API}/tasks/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask })
    }).then(loadTasks);
}

function deleteTask(id) {
    fetch(`${API}/tasks/${id}`, {
        method: "DELETE",
        credentials: "include"
    }).then(loadTasks);
}

function logout() {
    fetch(`${API}/logout`, {
        method: "POST",
        credentials: "include"
    }).then(() => {
        window.location.href = "login.html";
    });
}
