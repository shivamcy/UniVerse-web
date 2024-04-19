document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    // You can add your login validation logic here
    if (username === "user" && password === "password") {
        alert("Login successful");
        // Redirect to another page or do something else upon successful login
    } else {
        document.getElementById("error-message").innerText = "Invalid username or password";
    }
});

//sign-up
document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var fullname = document.getElementById("fullname").value;
    var college = document.getElementById("college").value;
    var newusername = document.getElementById("newusername").value;
    var newpassword = document.getElementById("newpassword").value;
    
    // You can add server-side validation and handling here
    
    // For demonstration purposes, simply display a success message
    document.getElementById("signup-message").innerText = "Your account has been created successfully!";
});

