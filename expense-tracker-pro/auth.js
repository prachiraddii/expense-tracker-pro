// If already logged in, skip login page
if (localStorage.getItem("loggedIn") === "true") {
    window.location.href = "index.html";
}

// Login function
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html";
    } else {
        alert("Invalid Username or Password");
    }
}

// Logout function
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}