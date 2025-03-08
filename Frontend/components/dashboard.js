const role = localStorage.getItem("userRole");
const token = localStorage.getItem("token");

// 🔄 Redirect if not logged in
if (!role || !token) {
  window.location.href = "index.html";
}

// 🛠 Fetch Doctors
async function fetchDoctors() {
  try {
    const response = await fetch(
      "http://localhost:5500/api/admin/viewDoctors",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.doctors || []; // Extract the doctors array
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

// 🛠 Fetch Patients
async function fetchPatients() {
  try {
    const response = await fetch(
      "http://localhost:5500/api/admin/viewPatients",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.patients || []; // Extract the patients array
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
}

// 🚀 Load Dashboard Based on Role
document.addEventListener("DOMContentLoaded", async function () {
  document.getElementById("user-role").innerText = role;

  const menu = document.getElementById("menu");

  if (role === "Admin") {
    menu.innerHTML = `
          <li onclick="displayDoctors()">Manage Doctors</li>
          <li onclick="displayPatients()">Manage Patients</li>
      `;
    displayDoctors();
  } else if (role === "Doctor") {
    menu.innerHTML = `
          <li onclick="displayPatients()">View Patients</li>
          <li onclick="editDoctorProfile()">Edit Profile</li>
      `;
    displayPatients();
  } else if (role === "Patient") {
    menu.innerHTML = `
          <li onclick="displayDoctors()">View Doctors</li>
          <li onclick="editPatientProfile()">Edit Profile</li>
      `;
    displayDoctors();
  }
});

// 🟢 **Admin: Display Doctors**
async function displayDoctors() {
  const doctors = await fetchDoctors();

  if (!Array.isArray(doctors)) {
    console.error("Error: doctors data is not an array", doctors);
    return;
  }

  let tableHtml = `<h2>Doctors</h2>
  <button onclick="showAddDoctorForm()" style="font-size:1.2rem; margin-bottom:1.2rem;"> + Add Doctor</button>
  <table>
      <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Birthdate</th>
          <th>Gender</th>
          <th>Photo</th>
          <th>Action</th>
      </tr>`;

  console.log(doctors);

  doctors.forEach((d) => {
    tableHtml += `
      <tr>
          <td>${d.user.fullname}</td>
          <td>${d.user.email}</td>
          <td stye="width:"10px;">${d.user.phoneNumber}</td>
          <td>${
            new Date().getFullYear() - new Date(d.user.birthdate).getFullYear()
          }</td>
          <td>${d.user.gender}</td>
          <td><img src="https://randomuser.me/api/portraits/men/${
            d.user._id[11]
          }.jpg" width="50"></td>
          <td><button onclick="removeDoctor('${d._id}')">Retire</button></td>
      </tr>`;
  });

  tableHtml += `</table>`;
  document.getElementById("dashboard-content").innerHTML = tableHtml;
}

// 🟢 **Admin: Display Patients**
async function displayPatients() {
  const patients = await fetchPatients();

  if (!Array.isArray(patients)) {
    console.error("Error: patients data is not an array", patients);
    return;
  }

  let tableHtml = `<h2>Patients</h2><table>
      <tr><th>Name</th><th>Age</th><th>Phone</th><th>Action</th></tr>`;

  console.log(patients);
  patients
    .filter((p) => p && p.user)
    .forEach((p) => {
      tableHtml += `<tr>
          <td>${p.user.fullname}</td>
          <td>${
            new Date().getFullYear() - new Date(p.user.birthdate).getFullYear()
          }</td>
          <td>${p.user.phoneNumber}</td>
          <td><button onclick="removePatient('${
            p.user._id
          }')">Remove</button></td>
      </tr>`;
    });

  tableHtml += `</table>`;
  document.getElementById("dashboard-content").innerHTML = tableHtml;
}
async function removeDoctor(id) {
  if (!id) {
    console.error("Error: Doctor ID is missing!");
    alert("Doctor ID is invalid.");
    return;
  }

  if (confirm("Are you sure you want to retire this doctor?")) {
    try {
      const response = await fetch(
        `http://localhost:5500/api/admin/retireDoctor/${id}`, // 🔹 Fixed API route
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.msg || "Failed to remove doctor");
      }

      alert("Doctor retired successfully!");
      displayDoctors(); // 🔄 Refresh doctor list
    } catch (error) {
      console.error("Error removing doctor:", error);
      alert("Failed to retire doctor. Try again.");
    }
  }
}

// 🟠 **Remove Patient**
async function removePatient(id) {
  if (confirm("Are you sure you want to remove this patient?")) {
    try {
      const response = await fetch(
        `http://localhost:5500/api/admin/removePatient/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove patient");
      }

      alert("Patient removed successfully!");
      displayPatients(); // 🔄 Refresh the patients list
    } catch (error) {
      console.error("Error removing patient:", error);
      alert("Failed to remove patient. Try again.");
    }
  }
}

// 🟢 **Patient: Edit Profile**
function editPatientProfile() {
  document.getElementById("dashboard-content").innerHTML = `
      <h2>Edit Profile</h2>
      <input type="text" id="patient-name" placeholder="Full Name">
      <input type="email" id="patient-email" placeholder="Email">
      <input type="text" id="patient-phone" placeholder="Phone Number">
      <input type="date" id="patient-birthdate">
      <button onclick="savePatientProfile()">Save Changes</button>
  `;
}

// 🟢 **Save Updated Patient Profile**
async function savePatientProfile() {
  const name = document.getElementById("patient-name").value;
  const email = document.getElementById("patient-email").value;
  const phone = document.getElementById("patient-phone").value;
  const birthdate = document.getElementById("patient-birthdate").value;

  if (!name || !email || !phone || !birthdate) {
    alert("All fields are required!");
    return;
  }

  const updatedPatient = { name, email, phone, birthdate };

  try {
    const response = await fetch("http://localhost:5500/api/patient/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPatient),
    });

    if (!response.ok) throw new Error("Failed to update profile");
    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Error updating patient profile:", error);
    alert("Error updating profile. Please try again.");
  }
}

async function addDoctor() {
  const fullname = document.getElementById("doctor-name").value;
  const email = document.getElementById("doctor-email").value;
  const phoneNumber = document.getElementById("doctor-phone").value;
  const birthdate = document.getElementById("doctor-birthdate").value;
  const gender = document.getElementById("doctor-gender").value;
  const password = "DefaultPass123"; // Default password (should be hashed)

  if (!fullname || !email || !phoneNumber || !birthdate || !gender) {
    alert("All fields are required!");
    return;
  }

  const newDoctor = {
    fullname,
    email,
    phoneNumber,
    birthdate: new Date().getFullYear(),
    gender,
    password,
  };

  try {
    const response = await fetch("http://localhost:5500/api/admin/addDoctor", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDoctor),
    });

    const result = await response.json();
    console.log("API Response:", result);

    if (!response.ok) throw new Error(result.msg || "Failed to add doctor");

    alert("Doctor added successfully!");
    displayDoctors();
  } catch (error) {
    console.error("❌ Error adding doctor:", error);
    alert("Error adding doctor. Try again.");
  }
}
function showAddDoctorForm() {
  document.getElementById("dashboard-content").innerHTML = `
      <h2>Add New Doctor</h2>
      <input type="text" id="doctor-name" placeholder="Full Name">
      <input type="email" id="doctor-email" placeholder="Email">
      <input type="text" id="doctor-phone" placeholder="Phone Number">
      <input type="date" id="doctor-birthdate">
      <select id="doctor-gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
      </select>
      <button onclick="addDoctor()">Add Doctor</button>
  `;
}
