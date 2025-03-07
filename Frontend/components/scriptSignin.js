
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
        console.log(data.user.role);
        console.log("✅ Login successful!");
        alert(`Login successful! Welcome, ${data.user.role}`);
        

        
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("token", data.token);

        
        if (data.user.role === "Admin") {
          window.location.href = "adminDashboard.html";
        } else if (data.user.role === "Doctor") {
          window.location.href = "doctorDashboard.html";
        } else if (data.user.role === "Patient") {
          window.location.href = "patientDashboard.html";
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
