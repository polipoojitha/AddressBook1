// script.js

// Contact form creation
document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector(".main-content");

    // Create form and table containers
    const formContainer = document.createElement("div");
    const tableContainer = document.createElement("div");
    formContainer.className = "form-container";
    tableContainer.className = "table-container";

    // Contact form HTML
    formContainer.innerHTML = `
        <h3>Add New Contact</h3>
        <form id="contactForm">
            <input type="text" id="name" placeholder="Name" required />
            <input type="text" id="phone" placeholder="Phone" required />
            <input type="email" id="email" placeholder="Email" required />
            <button type="submit" class="btn">Save Contact</button>
        </form>
    `;

    // Contact table HTML
    tableContainer.innerHTML = `
        <h3>Saved Contacts</h3>
        <table id="contactTable" border="1">
            <thead>
                <tr>
                    <th>Name</th><th>Phone</th><th>Email</th><th>Actions</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;

    // Append to page
    main.appendChild(formContainer);
    main.appendChild(tableContainer);

    // Form submit logic
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!name || !phone || !email) {
            alert("Please fill all fields!");
            return;
        }

        const contact = { name, phone, email };
        saveContact(contact);
        form.reset();
        renderContacts();
    });

    renderContacts();
});

// Save contact to localStorage
function saveContact(contact) {
    const contacts = getContacts();
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Get contacts from localStorage
function getContacts() {
    return JSON.parse(localStorage.getItem("contacts")) || [];
}

// Render contacts to table
function renderContacts() {
    const contacts = getContacts();
    const tbody = document.querySelector("#contactTable tbody");
    tbody.innerHTML = "";

    contacts.forEach((contact, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td><button class="btn delete-btn" onclick="deleteContact(${index})">Delete</button></td>
        `;

        tbody.appendChild(row);
    });
}

// Delete contact
function deleteContact(index) {
    const contacts = getContacts();
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    renderContacts();
}
