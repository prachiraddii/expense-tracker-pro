function signup() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "" || pass === "") {
        alert("Enter username and password");
        return;
    }

    localStorage.setItem("user", JSON.stringify({
        username: user,
        password: pass
    }));

    alert("Signup successful! Now login.");
}

function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        alert("No user found. Please signup first.");
        return;
    }

    if (user === storedUser.username && pass === storedUser.password) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html";
    } else {
        alert("Invalid Username or Password");
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}
