const form = document.getElementById("registration-form");
const message = document.getElementById("message");
const registrationsList = document.getElementById("registrations-list");
const clearButton = document.getElementById("clear-button");

let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

function displayRegistrations() {
    registrationsList.innerHTML = "";

    registrations.forEach(function(registration) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = registration.name;
        row.appendChild(nameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = registration.email;
        row.appendChild(emailCell);

        const phoneCell = document.createElement("td");
        phoneCell.textContent = registration.phone;
        row.appendChild(phoneCell);

        const eventCell = document.createElement("td");
        eventCell.textContent = registration.event;
        row.appendChild(eventCell);

        const sourceCell = document.createElement("td");
        sourceCell.textContent = registration.source;
        row.appendChild(sourceCell);

        registrationsList.appendChild(row);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const registration = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        event: document.getElementById("event").value,
        source: form.querySelector('input[name="source"]:checked').value
    };

    registrations.push(registration);

    localStorage.setItem("registrations", JSON.stringify(registrations));

    displayRegistrations();

    message.textContent = "Registration successful! Your information has been saved.";

    form.reset();
});

clearButton.addEventListener("click", function() {
    registrations = [];

    localStorage.removeItem("registrations");

    displayRegistrations();

    message.textContent = "All registrations have been cleared.";
});

displayRegistrations();