// Configura el usuario y contraseña permitidos
const ADMIN_USER = "admin";
const ADMIN_PASS = "1234"; // Cambia esta contraseña por seguridad

// Referencias a elementos del DOM
const loginForm = document.getElementById("login-form");
const approvalSection = document.getElementById("approval-section");
const solicitudesList = document.getElementById("solicitudes-list");

// Manejo del inicio de sesión
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        alert("Inicio de sesión exitoso.");
        mostrarPanel();
    } else {
        alert("Credenciales incorrectas.");
    }
});

function mostrarPanel() {
    // Ocultamos la sección de login y mostramos la de aprobación
    document.getElementById("login-section").style.display = "none";
    approvalSection.style.display = "block";

    // Cargamos las solicitudes desde el LocalStorage
    const solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
    solicitudesList.innerHTML = "";

    solicitudes.forEach((grupo, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${grupo.nombre}</strong> - ${grupo.categoria} <br>
            <a href="${grupo.link}" target="_blank">Visitar Grupo</a> <br>
            País: ${grupo.pais} <br>
            <button onclick="aprobarGrupo(${index})">Aprobar</button>
            <button onclick="rechazarGrupo(${index})">Rechazar</button>
        `;
        solicitudesList.appendChild(li);
    });
}

function aprobarGrupo(index) {
    let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
    let grupos = JSON.parse(localStorage.getItem("grupos")) || [];

    // Mover el grupo aprobado a la lista de grupos publicados
    grupos.push(solicitudes[index]);
    localStorage.setItem("grupos", JSON.stringify(grupos));

    // Eliminar del listado de solicitudes
    solicitudes.splice(index, 1);
    localStorage.setItem("solicitudes", JSON.stringify(solicitudes));

    alert("Grupo aprobado y publicado.");
    mostrarPanel();
}

function rechazarGrupo(index) {
    let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];

    // Eliminar del listado de solicitudes
    solicitudes.splice(index, 1);
    localStorage.setItem("solicitudes", JSON.stringify(solicitudes));

    alert("Grupo rechazado.");
    mostrarPanel();
}
