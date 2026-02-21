// REGISTER FUNCTION
function registerUser() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Basic Validation
    if (name === "" || email === "" || password === "") {
        alert("All fields are required!");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    // Store user in localStorage
    let user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful!");
    window.location.href = "login.html";
}


// LOGIN FUNCTION
function loginUser() {
    let loginEmail = document.getElementById("loginEmail").value;
    let loginPassword = document.getElementById("loginPassword").value;

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser === null) {
        alert("No user found. Please register first.");
        return;
    }

    if (loginEmail === storedUser.email && loginPassword === storedUser.password) {
        alert("Login Successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid Email or Password");
    }
}
