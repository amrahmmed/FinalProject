console.log("Script loaded!");

document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Submitting login request...");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await fetch("http://localhost:5500/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response received:", response);

      const data = await response.json();
      console.log("Response Data:", data);

      if (response.ok) {
        console.log(data.user);
        console.log(data.user.role);
        console.log("✅ Login successful!");
        alert(`Login successful! Welcome, ${data.user.role}`);
        // Save userRole in localStorage
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("token", data.token);

        if (data.user.role === "Admin") {
          window.location.href = "profile.html";
        } else if (data.user.role === "Doctor") {
          window.location.href = "profile.html";
        } else if (data.user.role === "Patient") {
          window.location.href = "profile.html";
        } else {
          window.location.href = "profile.html";
        }
      } else {
        console.warn("❌ Login failed:", data.error);
        alert(`Login failed: ${data.error}`);
        document.getElementById("error-message").innerText = data.error;
      }
    } catch (error) {
      console.error("🚨 Error logging in:", error);
      alert("Server error! Please try again later.");
      document.getElementById("error-message").innerText = "Server error!";
    }
  });
const token = localStorage.getItem("token"); // Ensure token is stored in localStorage or cookies

fetch("http://localhost:5500/api/admin/viewPatients", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`, // Include token
    "Content-Type": "application/json",
  },
  credentials: "include", // Ensures cookies are sent if used
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Patients data:", data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
