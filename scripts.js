const selectPais = document.getElementById("pais");
const paises = [
    "Afganistán", "Alemania", "Argentina", "Australia", "Brasil", 
    "Canadá", "Chile", "Colombia", "España", "Estados Unidos", 
    "Francia", "India", "Japón", "México", "Perú", "Reino Unido", 
    "Rusia", "Sudáfrica"
];

// Poblamos el select de países
paises.forEach(pais => {
    const option = document.createElement("option");
    option.value = pais;
    option.textContent = pais;
    selectPais.appendChild(option);
});

// Manejo del formulario
document.getElementById("registro-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const grupo = {
        nombre: document.getElementById("nombre").value,
        link: document.getElementById("link").value,
        categoria: document.getElementById("categoria").value,
        descripcion: document.getElementById("descripcion").value,
        pais: selectPais.value
    };

    let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
    solicitudes.push(grupo);
    localStorage.setItem("solicitudes", JSON.stringify(solicitudes));

    alert("Registro enviado para aprobación.");
    window.location.href = "index.html";
});
