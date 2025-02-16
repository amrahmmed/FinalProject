const mainDiv = document.querySelector("#id");

const user = {
  fullName: "Amr Ahmed",
  role: "admin",
  email: "amr@gmail.com",
  birthDate: 2004,
  gender: "male",
  phoneNumber: "0115443431",
  password: 544545455,
};

const patients = [
  {
    name: "John Doe",
    age: 34,
    phoneNumber: "123-456-7890",
    email: "amr@gmail.com",
  },
  {
    name: "Jane Smith",
    age: 28,
    phoneNumber: "987-654-3210",
    email: "amr@gmail.com",
  },
  {
    name: "Alice Johnson",
    age: 45,
    phoneNumber: "555-555-5555",
    email: "amr@gmail.com",
  },
];

const doctors = [
  { name: "John Doe", phoneNumber: "123-456-7890", email: "amr@gmail.com" },
  { name: "Jane Smith", phoneNumber: "987-654-3210", email: "amr@gmail.com" },
  {
    name: "Alice Johnson",
    phoneNumber: "555-555-5555",
    email: "amr@gmail.com",
  },
];

if (user.role === "admin") {
  mainDiv.innerHTML = `
    <div class="signup-container" style="width: 1200px">
    <h2>Add doctor</h2>
    <form class="signup-form">
      <div class="input-group">
        <label for="name">Full Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your full name" required>
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required>
      </div>
      <div class="input-group">
        <label for="phoneNumber">phoneNumber</label>
        <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" required>
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required>
      </div>
      <div class="input-group">
        <label for="password">Birth date</label>
        <input type="date" id="password" name="password" placeholder="Enter your password" required>
      </div>

      <div class="input-group">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your password" required>
      </div>
      <div class="input-group">
        <label for="Role">Role</label>
        <select name="Role" id="Role" style="height: 40px; width: 100%; value="doctor">
          <option value="doctor">Doctor</option>
        </select>
      </div>
      <div class="input-group">
        <label for="gender">Gender</label>
        <select name="gender" id="gender" style="height: 40px; width: 100%;">
          <option value="male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <button type="submit" class="signup-button">Add doctor</button>
    </form>
  </div>
            
  <div>
  <h1 style="margin-top:60px">Doctors</h1>
      <div class="doctors">
      </div>
  </div>

  <div>
  <h1 style="margin-top:60px">Patients</h1>
      <div class="patients">
      </div>
  </div>

    </div>


    `;

  // Create a table element
  const table = document.createElement("table");
  const patientDiv = document.querySelector(".doctors");

  // Create the table header
  const headerRow = document.createElement("tr");
  const headers = ["Name", "email", "Age", "Phone Number", ""];
  headers.forEach((headerText) => {
    const header = document.createElement("th");
    header.textContent = headerText;
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);

  // Create table rows for each patient
  patients.forEach((patient) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = patient.name;
    row.appendChild(nameCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = patient.email;
    row.appendChild(emailCell);

    const ageCell = document.createElement("td");
    ageCell.textContent = patient.age;
    row.appendChild(ageCell);

    const phoneCell = document.createElement("td");
    phoneCell.textContent = patient.phoneNumber;
    row.appendChild(phoneCell);

    const btn = document.createElement("button");
    btn.className = "btn-delete";
    btn.textContent = "Delete";
    row.appendChild(btn);

    table.appendChild(row);
  });

  // Append the table to the container div
  patientDiv.appendChild(table);
}

if (user.role === "doctor") {
  mainDiv.innerHTML = `
    <h1>Hello Dr.${user.fullName}!</h1>
    
    
    
    <main>
    <div class="signup-container">
    <h2>Edit</h2>
    <form class="signup-form">
    <div class="input-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" placeholder="Enter your email" value="${user.email}" required>
    </div>
    
    <div class="input-group">
    <label for="phoneNumber">phoneNumber</label>
    <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" value="${user.password}" required>
    </div>
    
    <div class="input-group">
    <label for="password">Birth date</label>
    <input type="date" id="password" name="password" placeholder="Enter your password" required>
    </div>
    
    <button type="submit" class="signup-button">Confirm</button>
    </form>
    </div>
    
    <div class="patients--container">
    <h2>Patients</h2>
    
    <div class="doctors">
    </div>
    </div>
    
    </main>
    
    `;

  // Create a table element
  const table = document.createElement("table");
  const patientDiv = document.querySelector(".doctors");

  // Create the table header
  const headerRow = document.createElement("tr");
  const headers = ["Name", "Age", "Phone Number"];
  headers.forEach((headerText) => {
    const header = document.createElement("th");
    header.textContent = headerText;
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);

  // Create table rows for each patient
  patients.forEach((patient) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = patient.name;
    row.appendChild(nameCell);

    const ageCell = document.createElement("td");
    ageCell.textContent = patient.age;
    row.appendChild(ageCell);

    const phoneCell = document.createElement("td");
    phoneCell.textContent = patient.phoneNumber;
    row.appendChild(phoneCell);

    table.appendChild(row);
  });

  // Append the table to the container div
  patientDiv.appendChild(table);
}

if (user.role === "patient") {
  mainDiv.innerHTML = `
    <h1>Hello ${user.fullName}!</h1>
    
    
    
    <main>
    <div class="signup-container">
    <h2>Edit</h2>
    <form class="signup-form">
      <div class="input-group">
        <label for="name">Full Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your full name" required>
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required>
      </div>
      <div class="input-group">
        <label for="phoneNumber">phoneNumber</label>
        <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" required>
      </div>
      <div class="input-group">
      <label for="password">Birth date</label>
      <input type="date" id="password" name="password" placeholder="Enter your password" required>
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required>
      </div>
 
    <button type="submit" class="signup-button">Confirm</button>
    </form>
    </div>
    
    <div class="patients--container">
    <h2>Doctor</h2>
    
    <div class="patients">
    </div>
    </div>
    
    </main>
    
    `;

  // Create a table element
  const table = document.createElement("table");
  const patientDiv = document.querySelector(".patients");

  // Create the table header
  const headerRow = document.createElement("tr");
  const headers = ["Name", "Phone Number"];
  headers.forEach((headerText) => {
    const header = document.createElement("th");
    header.textContent = headerText;
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);

  // Create table rows for each patient
  doctors.forEach((patient) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = patient.name;
    row.appendChild(nameCell);

    const phoneCell = document.createElement("td");
    phoneCell.textContent = patient.phoneNumber;
    row.appendChild(phoneCell);

    table.appendChild(row);
  });

  // Append the table to the container div
  patientDiv.appendChild(table);
}
