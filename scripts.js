// scripts.js
document.getElementById('registro-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const link = document.getElementById('link').value;
    const categoria = document.getElementById('categoria').value;
    const descripcion = document.getElementById('descripcion').value;
    const pais = document.getElementById('pais').value;

    const newRequest = {
        nombre,
        link,
        categoria,
        descripcion,
        pais
    };

    // Almacenar la solicitud en pendingRequests
    const pendingRequests = JSON.parse(localStorage.getItem('pendingRequests')) || [];
    pendingRequests.push(newRequest);
    localStorage.setItem('pendingRequests', JSON.stringify(pendingRequests));

    alert('Solicitud enviada. Se revisará en el panel de aprobación.');
    document.getElementById('registro-form').reset();
});

// Cargar grupos aprobados al cargar index.html
function loadApprovedGroups() {
    const approvedGroups = JSON.parse(localStorage.getItem('approvedGroups')) || [];
    const gruposListado = document.getElementById('grupos-listado');
    gruposListado.innerHTML = '';

    approvedGroups.forEach(group => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${group.nombre}</strong> - ${group.categoria} <a href="${group.link}" target="_blank">Ir al grupo</a>`;
        gruposListado.appendChild(li);
    });
}

// Llamar a la función al cargar la página
if (window.location.pathname.endsWith('index.html')) {
    loadApprovedGroups();
}
