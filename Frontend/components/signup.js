console.log("JavaScript Connected");

document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.getElementById("signup-form");

  if (!signUpForm) {
    console.error("Error: Form with id 'signup-form' not found!");
    return;
  }

  signUpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNumber = document.getElementById("phonenumber").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const birthDate = document.getElementById("Birhtdate").value;
    const gender = document.getElementById("gender").value;

    
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
      fullname: fullName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      birthdate: birthDate,
      gender: gender,
    };
    console.log(JSON.stringify(userData, null, 2));

    try {
      const response = await fetch("http://localhost:5500/api/patient/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    
      console.log("Response status:", response.status); 
      console.log("Response headers:", response.headers);  
    
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        alert("Server returned invalid JSON.");
        return;
      }
    
      console.log("API Response:", result); 
      if (response.ok) {
        alert("Sign-up successful! Redirecting to login...");
        window.location.href = "login.html";
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Server error. Please try again later.");
    }
    
  });
});
