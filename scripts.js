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

// Población del select de países
const selectPais = document.getElementById("pais");
const paises = ["Afganistán", "Alemania", "Argentina", "Australia", "Brasil", "Canadá", "Chile", "Colombia", "España", "Estados Unidos", "Francia", "India", "Japón", "México", "Perú", "Reino Unido", "Rusia", "Sudáfrica"];
paises.forEach(pais => {
    const option = document.createElement("option");
    option.value = pais;
    option.textContent = pais;
    selectPais.appendChild(option);
});

// Cargar solicitudes pendientes
function loadPendingRequests() {
    const pendingRequests = JSON.parse(localStorage.getItem('pendingRequests')) || [];
    const solicitudesList = document.getElementById('solicitudes-list');
    solicitudesList.innerHTML = '';

    pendingRequests.forEach((request, index) => {
        const li = document.createElement('li');
        li.textContent = `${request.nombre} - ${request.categoria} - ${request.pais}`;
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

    approvedGroups.push({ ...pendingRequests[index], views: 0 });
    localStorage.setItem('approvedGroups', JSON.stringify(approvedGroups));

    pendingRequests.splice(index, 1);
    localStorage.setItem('pendingRequests', JSON.stringify(pendingRequests));

    loadPendingRequests();
}

// Cargar grupos aprobados
document.addEventListener('DOMContentLoaded', loadApprovedGroups);
function loadApprovedGroups() {
    const approvedGroups = JSON.parse(localStorage.getItem('approvedGroups')) || [];
    const approvedList = document.getElementById('approved-list');
    approvedList.innerHTML = '';

    const groupedByCategory = groupByCategory(approvedGroups);
    Object.keys(groupedByCategory).forEach(categoria => {
        const section = document.createElement('section');
        const title = document.createElement('h3');
        title.textContent = categoria;
        section.appendChild(title);

        const ul = document.createElement('ul');
        groupedByCategory[categoria].forEach(group => {
            const li = document.createElement('li');
            li.innerHTML = `${group.nombre} (${group.pais}) - <a href="${group.link}" target="_blank">Enlace</a> (Vistas: ${group.views})`;
            ul.appendChild(li);
        });
        section.appendChild(ul);
        approvedList.appendChild(section);
    });
}

// Agrupar por categoría
function groupByCategory(groups) {
    return groups.reduce((acc, group) => {
        (acc[group.categoria] = acc[group.categoria] || []).push(group);
        return acc;
    }, {});
}

// Registrar grupo
document.getElementById('registro-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const newGroup = {
        nombre: document.getElementById('nombre').value,
        link: document.getElementById('link').value,
        categoria: document.getElementById('categoria').value,
        descripcion: document.getElementById('descripcion').value,
        pais: document.getElementById('pais').value,
    };

    const pendingRequests = JSON.parse(localStorage.getItem('pendingRequests')) || [];
    pendingRequests.push(newGroup);
    localStorage.setItem('pendingRequests', JSON.stringify(pendingRequests));

    alert('Grupo enviado para aprobación.');
    e.target.reset();
});
        
