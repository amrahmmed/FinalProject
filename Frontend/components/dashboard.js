const fakeDatabase = {
  doctors: [
    {
      id: 1,
      name: "Dr. John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      birthdate: "1980-05-15",
      gender: "Male",
      photo: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      email: "janesmith@example.com",
      phone: "987-654-3210",
      birthdate: "1975-08-22",
      gender: "Female",
      photo: "https://randomuser.me/api/portraits/women/20.jpg",
    },
  ],
  patients: [
    { id: 1, name: "Alice Johnson", age: 30, phone: "111-222-3333" },
    { id: 2, name: "Bob Williams", age: 45, phone: "444-555-6666" },
  ],
};

// Simulated API calls
function fakeApiGetDoctors() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(fakeDatabase.doctors), 500)
  );
}

function fakeApiGetPatients() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(fakeDatabase.patients), 500)
  );
}

function fakeApiAddDoctor(newDoctor) {
  return new Promise((resolve) => {
    setTimeout(() => {
      newDoctor.id = fakeDatabase.doctors.length + 1;
      fakeDatabase.doctors.push(newDoctor);
      resolve(newDoctor);
    }, 500);
  });
}

function fakeApiRemoveDoctor(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fakeDatabase.doctors = fakeDatabase.doctors.filter((d) => d.id !== id);
      resolve(true);
    }, 500);
  });
}

///////////////////
document.addEventListener("DOMContentLoaded", function () {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("user-role").innerText = userRole;

  const menu = document.getElementById("menu");
  const dashboardContent = document.getElementById("dashboard-content");

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
          <li onclick="viewDoctors()">View Doctors</li>
          <li onclick="editPatientProfile()">Edit Profile</li>
      `;
    viewDoctors();
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
      </tr>
      
      `;

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

// Form to add a doctor
function showAddDoctorForm() {
  document.getElementById("dashboard-content").innerHTML = `
      <h2>Add New Doctor</h2>
      <input type="text" id="doctor-name" placeholder="Full Name" required>
      <input type="email" id="doctor-email" placeholder="Email" required>
      <input type="text" id="doctor-phone" placeholder="Phone Number" required>
      <input type="password" id="doctor-password" placeholder="Password" required>
      <input type="password" id="doctor-confirm-password" placeholder="Confirm Password" required>
      <input type="date" id="doctor-birthdate" placeholder="Birthdate" required>
      <select id="doctor-gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
      </select>
      <button onclick="addDoctor()">Add Doctor</button>
  `;
}

// Add a new doctor
async function addDoctor() {
  const name = document.getElementById("doctor-name").value;
  const email = document.getElementById("doctor-email").value;
  const phone = document.getElementById("doctor-phone").value;
  const password = document.getElementById("doctor-password").value;
  const confirmPassword = document.getElementById(
    "doctor-confirm-password"
  ).value;
  const birthdate = document.getElementById("doctor-birthdate").value;
  const gender = document.getElementById("doctor-gender").value;

  if (
    !name ||
    !email ||
    !phone ||
    !password ||
    !confirmPassword ||
    !birthdate ||
    !gender
  ) {
    alert("All fields are required!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
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

// Remove doctor
async function removeDoctor(id) {
  const confirmDelete = confirm("Are you sure you want to retire this doctor?");
  if (confirmDelete) {
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

async function removePatient(id) {
  await fakeApiRemovePatient(id);
  managePatients();
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
