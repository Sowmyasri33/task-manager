console.log("auth.js loaded successfully");


const API = "http://localhost:5000/api";

function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json().then(data => ({ status: res.status, data })))
    .then(({ status, data }) => {
        if (status === 200) {
            alert("Login successful");
            window.location.href = "dashboard.html";
        } else {
            alert(data.message || "Login failed");
        }
    })
    .catch(() => {
        alert("Server error");
    });
}

/* ---------- REGISTER ---------- */
function register(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("All fields are required");
        return;
    }

    
    fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password })
})

    .then(res => res.json().then(data => ({ status: res.status, data })))
    .then(({ status, data }) => {
        if (status === 201 || data.message.toLowerCase().includes("success")) {
            alert(data.message || "Registration successful!");
            setTimeout(() => {
                window.location.href = "index.html"; // back to login page
            }, 100);
        } else {
            alert(data.message || "Registration failed");
        }
    })
    .catch(err => {
        console.error(err);
        alert("Server error during registration");
    });
}
