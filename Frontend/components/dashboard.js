// Fetch doctors from the API
function fakeApiGetDoctors() {
  return fetch("http://localhost:5500/api/doctors")
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching doctors:", error);
      return [];
    });
}

// Fetch patients from the API
function fakeApiGetPatients() {
  return fetch("http://localhost:5500/api/patients")
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching patients:", error);
      return [];
    });
}

// Add a new doctor using the API
function fakeApiAddDoctor(newDoctor) {
  return fetch("http://localhost:5500/api/doctors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDoctor),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to add doctor");
      return response.json();
    })
    .catch((error) => {
      console.error("Error adding doctor:", error);
      return null;
    });
}

// Remove a doctor using the API
function fakeApiRemoveDoctor(id) {
  return fetch(`http://localhost:5500/api/doctors/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to remove doctor");
      return true;
    })
    .catch((error) => {
      console.error("Error removing doctor:", error);
      return false;
    });
}

// Remove a patient using the API
function fakeApiRemovePatient(id) {
  return fetch(`http://localhost:5500/api/patients/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to remove patient");
      return true;
    })
    .catch((error) => {
      console.error("Error removing patient:", error);
      return false;
    });
}

// Load Dashboard based on User Role
document.addEventListener("DOMContentLoaded", async function () {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("user-role").innerText = userRole;

  const menu = document.getElementById("menu");

  if (userRole === "Admin") {
    menu.innerHTML = `
          <li onclick="manageDoctors()">Manage Doctors</li>
          <li onclick="managePatients()">Manage Patients</li>
      `;
    manageDoctors();
  } else if (userRole === "Doctor") {
    menu.innerHTML = `
          <li onclick="viewPatients()">View Patients</li>
          <li onclick="editDoctorProfile()">Edit Profile</li>
      `;
    viewPatients();
  } else if (userRole === "Patient") {
    menu.innerHTML = `
          <li onclick="viewDoctorspatients()">View Doctors</li>
          <li onclick="editPatientProfile()">Edit Profile</li>
      `;
    viewDoctorspatients();
  }
});

// 🟢 Admin: Manage Doctors
async function manageDoctors() {
  const doctors = await fakeApiGetDoctors();
  let tableHtml = `
  <h2>Doctors</h2>
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

  doctors.forEach((d) => {
    tableHtml += `
      <tr>
          <td>${d.name}</td>
          <td>${d.email}</td>
          <td>${d.phone}</td>
          <td>${d.birthdate}</td>
          <td>${d.gender}</td>
          <td><img src="${d.photo}" width="50"></td>
          <td><button onclick="removeDoctor(${d.id})">Retire</button></td>
      </tr>`;
  });

  tableHtml += `</table>`;
  document.getElementById("dashboard-content").innerHTML = tableHtml;
}

// 🟢 Admin: Manage Doctors
async function manageDoctorspatients() {
  const doctors = await fakeApiGetDoctors();
  let tableHtml = `
  <h2>Doctors</h2>
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

  doctors.forEach((d) => {
    tableHtml += `
      <tr>
          <td>${d.name}</td>
          <td>${d.email}</td>
          <td>${d.phone}</td>
          <td>${d.birthdate}</td>
          <td>${d.gender}</td>
          <td><img src="${d.photo}" width="50"></td>
          <td><button onclick="removeDoctor(${d.id})">Retire</button></td>
      </tr>`;
  });

  tableHtml += `</table>`;
  document.getElementById("dashboard-content").innerHTML = tableHtml;
}

// Show Add Doctor Form
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

// Add Doctor
async function addDoctor() {
  const name = document.getElementById("doctor-name").value;
  const email = document.getElementById("doctor-email").value;
  const phone = document.getElementById("doctor-phone").value;
  const birthdate = document.getElementById("doctor-birthdate").value;
  const gender = document.getElementById("doctor-gender").value;

  if (!name || !email || !phone || !birthdate || !gender) {
    alert("All fields are required!");
    return;
  }

  const newDoctor = {
    name,
    email,
    phone,
    birthdate,
    gender,
    photo:
      gender === "Male"
        ? "https://randomuser.me/api/portraits/men/22.jpg"
        : "https://randomuser.me/api/portraits/women/22.jpg",
  };

  await fakeApiAddDoctor(newDoctor);
  alert("Doctor added successfully!");
  manageDoctors();
}

// Remove Doctor
async function removeDoctor(id) {
  if (confirm("Are you sure you want to retire this doctor?")) {
    await fakeApiRemoveDoctor(id);
    alert("Doctor retired successfully!");
    manageDoctors();
  }
}

// 🟠 Admin: Manage Patients
async function managePatients() {
  const patients = await fakeApiGetPatients();
  let tableHtml = `<h2>Patients</h2><table><tr><th>Name</th><th>Age</th><th>Phone</th><th>Action</th></tr>`;

  patients.forEach((p) => {
    tableHtml += `<tr>
          <td>${p.name}</td>
          <td>${p.age}</td>
          <td>${p.phone}</td>
          <td><button onclick="removePatient(${p.id})">Remove</button></td>
      </tr>`;
  });

  tableHtml += `</table>`;
  document.getElementById("dashboard-content").innerHTML = tableHtml;
}

// Remove Patient
async function removePatient(id) {
  if (confirm("Are you sure you want to remove this patient?")) {
    await fakeApiRemovePatient(id);
    managePatients();
  }
}

// 🔵 Doctor: View Patients
async function viewPatients() {
  const patients = await fakeApiGetPatients();
  let tableHtml = `<h2>Patients</h2><table><tr><th>Name</th><th>Age</th><th>Phone</th></tr>`;

  patients.forEach((p) => {
    tableHtml += `<tr><td>${p.name}</td><td>${p.age}</td><td>${p.phone}</td></tr>`;
  });

  tableHtml += `</table>`;
  document.getElementById("dashboard-content").innerHTML = tableHtml;
}

// 🔵 Patient: View Doctors
async function viewDoctors() {
  const doctors = await fakeApiGetDoctors();
  manageDoctors();
}
// 🔵 Patient: View Doctors
async function viewDoctorspatients() {
  const doctors = await fakeApiGetDoctors();
  manageDoctorspatients();
}

// 🟢 Patient: Edit Profile
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

// 🟢 Save Updated Patient Profile
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

async function editDoctorProfile() {
  // Fetch the current doctor's data (assuming the logged-in doctor)
  const doctorId = localStorage.getItem("userId"); // Store the doctor's ID in local storage after login
  if (!doctorId) {
    alert("Doctor ID not found!");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5500/api/doctors/${doctorId}`
    );
    if (!response.ok) throw new Error("Failed to fetch doctor details");

    const doctor = await response.json();

    // Load the form with existing doctor details
    document.getElementById("dashboard-content").innerHTML = `
        <h2>Edit Doctor Profile</h2>
        <input type="text" id="doctor-name" placeholder="Full Name" value="${doctor.name}">
        <input type="email" id="doctor-email" placeholder="Email" value="${doctor.email}">
        <input type="text" id="doctor-phone" placeholder="Phone Number" value="${doctor.phone}">
        <button onclick="saveDoctorProfile(${doctorId})">Save Changes</button>
    `;
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    alert("Error loading profile.");
  }
}
