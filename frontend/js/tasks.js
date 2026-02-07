const API = "/tasks";

function loadTasks() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("taskList");
            list.innerHTML = "";
            data.forEach(task => {
                list.innerHTML += `
                    <div class="task">
                        <span>${task.title}</span>
                        <div>
                            <button class="edit" onclick="editTask(${task.id})">Edit</button>
                            <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                        </div>
                    </div>`;
            });
        });
}

function addTask() {
    const title = document.getElementById("taskInput").value;
    if (!title) return;

    fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title})
    }).then(() => {
        document.getElementById("taskInput").value = "";
        loadTasks();
    });
}

function editTask(id) {
    const newTitle = prompt("Edit task:");
    if (!newTitle) return;

    fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title: newTitle})
    }).then(loadTasks);
}

function deleteTask(id) {
    fetch(`${API}/${id}`, {method: "DELETE"})
        .then(loadTasks);
}

loadTasks();
