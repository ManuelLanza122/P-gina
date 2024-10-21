// panel.js
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // Validación de usuario y contraseña (hardcodeado para este ejemplo)
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

// Función para cargar solicitudes pendientes
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

// Función para aprobar una solicitud
function approveRequest(index) {
    const pendingRequests = JSON.parse(localStorage.getItem('pendingRequests')) || [];
    const approvedGroups = JSON.parse(localStorage.getItem('approvedGroups')) || [];

    approvedGroups.push(pendingRequests[index]);
    localStorage.setItem('approvedGroups', JSON.stringify(approvedGroups));

    // Eliminar de solicitudes pendientes
    pendingRequests.splice(index, 1);
    localStorage.setItem('pendingRequests', JSON.stringify(pendingRequests));

    loadPendingRequests();
}
