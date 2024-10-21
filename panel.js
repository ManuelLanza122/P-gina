// panel.js / scripts.js

// Manejo del formulario de inicio de sesión
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "admin") {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('approval-section').style.display = 'block';
        loadPendingRequests();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Cargar solicitudes pendientes
function loadPendingRequests() {
    const pendingRequests = JSON.parse(localStorage.getItem('pendingRequests')) || [];
    const solicitudesList = document.getElementById('solicitudes-list');
    solicitudesList.innerHTML = '';

    pendingRequests.forEach((request, index) => {
        const li = document.createElement('li');
        li.textContent = `${request.nombre} - ${request.categoria}`;
        const approveButton = document.createElement('button');
        approveButton.textContent = 'Aceptar';
        approveButton.onclick = () => approveRequest(index);
        li.appendChild(approveButton);
        solicitudesList.appendChild(li);
    });
}

// Aprobar una solicitud
function approveRequest(index) {
    const pendingRequests = JSON.parse(localStorage.getItem('pendingRequests')) || [];
    const approvedGroups = JSON.parse(localStorage.getItem('approvedGroups')) || [];

    approvedGroups.push(pendingRequests[index]);
    localStorage.setItem('approvedGroups', JSON.stringify(approvedGroups));

    pendingRequests.splice(index, 1);
    localStorage.setItem('pendingRequests', JSON.stringify(pendingRequests));

    loadPendingRequests();
}

// Cargar los grupos aprobados en el index.html
function loadApprovedGroups() {
    const approvedGroups = JSON.parse(localStorage.getItem('approvedGroups')) || [];
    const approvedList = document.getElementById('approved-list');
    approvedList.innerHTML = '';

    approvedGroups.forEach(group => {
        const li = document.createElement('li');
        li.textContent = `${group.nombre} - ${group.categoria}`;
        approvedList.appendChild(li);
    });
}

// Llamar a la función para cargar los grupos aprobados cuando se cargue la página
document.addEventListener('DOMContentLoaded', loadApprovedGroups);
