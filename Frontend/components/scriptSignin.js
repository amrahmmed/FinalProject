document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(document.getElementById("login-form"));

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email);
    console.log(password);

    // Simulating an API call
    const users = {
      "admin@example.com": { role: "Admin", token: "admin-token" },
      "doctor@example.com": { role: "Doctor", token: "doctor-token" },
      "patient@example.com": { role: "Patient", token: "patient-token" },
    };

    if (users[email] && password === "password") {
      localStorage.setItem("userRole", users[email].role);
      localStorage.setItem("token", users[email].token);
      window.location.href = "profile.html";
    } else {
      document.getElementById("error-message").innerText =
        "Invalid credentials!";
    }
  });
