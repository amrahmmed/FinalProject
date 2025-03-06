const fakeDatabase = {
  doctors: [
    {
      id: 1,
      name: "Dr. John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      photo: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      email: "janesmith@example.com",
      phone: "987-654-3210",
      photo: "https://randomuser.me/api/portraits/men/20.jpg",
    },
  ],
  patients: [
    { id: 1, name: "Alice Johnson", age: 30, phone: "111-222-3333" },
    { id: 2, name: "Bob Williams", age: 45, phone: "444-555-6666" },
  ],
  users: {
    "admin@example.com": { role: "Admin", token: "admin-token" },
    "doctor@example.com": { role: "Doctor", token: "doctor-token" },
    "patient@example.com": { role: "Patient", token: "patient-token" },
  },
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

function fakeApiRemoveDoctor(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fakeDatabase.doctors = fakeDatabase.doctors.filter((d) => d.id !== id);
      resolve(true);
    }, 500);
  });
}

function fakeApiRemovePatient(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fakeDatabase.patients = fakeDatabase.patients.filter((p) => p.id !== id);
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
  let tableHtml = `<h2>Doctors</h2><table><tr><th>Name</th><th>Email</th><th>Phone</th><th>Photo</th><th>Action</th></tr>`;
  doctors.forEach((d) => {
    tableHtml += `<tr style="width:10px ;">
          <td>${d.name}</td>
          <td>${d.email}</td>
          <td>${d.phone}</td>
          <td><img src="${d.photo}" width="50"></td>
          <td><button onclick="removeDoctor(${d.id})">Remove</button></td>
      </tr>`;
  });
  tableHtml += `</table>`;
  document.getElementById("dashboard-content").innerHTML = tableHtml;
}

async function removeDoctor(id) {
  await fakeApiRemoveDoctor(id);
  manageDoctors(); // Refresh doctor list
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

// 🔵 Doctor: Edit Profile
function editDoctorProfile() {
  document.getElementById("dashboard-content").innerHTML = `
      <h2>Edit Profile</h2>
      <input type="text" id="doctor-birthdate" placeholder="Birth Date">
      <input type="email" id="doctor-email" placeholder="Email">
      <input type="text" id="doctor-phone" placeholder="Phone">
      <button onclick="saveDoctorProfile()">Save</button>
  `;
}

function saveDoctorProfile() {
  alert("Profile updated!");
}

// 🟠 Patient: View Doctors
async function viewDoctors() {
  const doctors = await fakeApiGetDoctors();
  let tableHtml = `<h2>Doctors</h2><table><tr><th>Name</th><th>Phone</th></tr>`;
  doctors.forEach((d) => {
    tableHtml += `<tr><td>${d.name}</td><td>${d.phone}</td></tr>`;
  });
  tableHtml += `</table>`;
  document.getElementById("dashboard-content").innerHTML = tableHtml;
}

// 🟠 Patient: Edit Profile
function editPatientProfile() {
  document.getElementById("dashboard-content").innerHTML = `
      <h2>Edit Profile</h2>
      <input type="text" id="patient-name" placeholder="Name">
      <input type="email" id="patient-email" placeholder="Email">
      <input type="text" id="patient-phone" placeholder="Phone">
      <button onclick="savePatientProfile()">Save</button>
  `;
}

function savePatientProfile() {
  alert("Profile updated!");
}
