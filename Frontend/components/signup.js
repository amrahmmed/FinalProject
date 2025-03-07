document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.getElementById("signup-form");

  signUpForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const fullName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const birthDate = document.getElementById("Birth").value;
    const gender = document.getElementById("gender").value;

    // Basic validation
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword ||
      !birthDate ||
      !gender
    ) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      name: fullName,
      email: email,
      phone: phoneNumber,
      password: password,
      birthdate: birthDate,
      gender: gender,
    };

    try {
      const response = await fetch(
        "http://localhost:5500/api/patient/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Sign-up successful! Redirecting to login...");
        window.location.href = "login.html";
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      alert("Server error. Please try again later.");
      console.error("Error:", error);
    }
  });
});
