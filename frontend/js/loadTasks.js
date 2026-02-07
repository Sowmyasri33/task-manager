function loadTasks() {
    fetch("/api/tasks", {
        method: "GET",
        credentials: "include"   // 🔥 REQUIRED
    })
    .then(res => {
        if (res.status === 401) {
            window.location.href = "index.html";
            return;
        }
        return res.json();
    })
    .then(tasks => {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = `<strong>${task.title}</strong><br>${task.description}`;
            taskList.appendChild(li);
        });
    });
}

loadTasks();
