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
const paises = [
    "Afganistán", "Alemania", "Argentina", "Australia", "Brasil",
    "Canadá", "Chile", "Colombia", "España", "Estados Unidos",
    "Francia", "India", "Japón", "México", "Perú", "Reino Unido",
    "Rusia", "Sudáfrica"
];

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

// Cargar los grupos aprobados en index.html
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
        groupedByCategory[categoria].forEach((group, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${group.nombre} (${group.pais}) - 
                <a href="${group.link}" target="_blank" onclick="incrementView(${index})">
                Enlace</a> (Vistas: ${group.views})`;
            ul.appendChild(li);
        });
        section.appendChild(ul);
        approvedList.appendChild(section);
    });
}

// Incrementar las vistas de un grupo
function incrementView(index) {
    const approvedGroups = JSON.parse(localStorage.getItem('approvedGroups')) || [];
    approvedGroups[index].views = (approvedGroups[index].views || 0) + 1;
    localStorage.setItem('approvedGroups', JSON.stringify(approvedGroups));
}

// Agrupar grupos por categoría
function groupByCategory(groups) {
    return groups.reduce((acc, group) => {
        (acc[group.categoria] = acc[group.categoria] || []).push(group);
        return acc;
    }, {});
}

// Función de búsqueda de grupos por categoría
function searchByCategory(category) {
    const approvedGroups = JSON.parse(localStorage.getItem('approvedGroups')) || [];
    const filteredGroups = approvedGroups
        .filter(group => group.categoria.toLowerCase() === category.toLowerCase())
        .sort((a, b) => (b.views || 0) - (a.views || 0));

    displaySearchResults(filteredGroups);
}

// Mostrar los resultados de la búsqueda
function displaySearchResults(groups) {
    const approvedList = document.getElementById('approved-list');
    approvedList.innerHTML = '';

    if (groups.length === 0) {
        approvedList.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    const ul = document.createElement('ul');
    groups.forEach(group => {
        const li = document.createElement('li');
        li.innerHTML = `${group.nombre} (${group.pais}) - 
            <a href="${group.link}" target="_blank">Enlace</a> (Vistas: ${group.views || 0})`;
        ul.appendChild(li);
    });

    approvedList.appendChild(ul);
}

document.addEventListener('DOMContentLoaded', loadApprovedGroups);
