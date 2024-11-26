let logged = localStorage.getItem('isLogged');
console.log(logged);

if(!logged) {
    alert("Primero debes iniciar sesión!!");
    window.location.href = "/index.html";
}else {
    console.log(localStorage.getItem('employeeId'));
}

document.getElementById("menuHamburguesa").addEventListener('click', () => {
    const sideBar = document.getElementById('menuDezplegable');
    sideBar.classList.toggle('active');
    
    const hambur = document.getElementById("menuHamburguesa");
    hambur.classList.toggle('clicked');
});

document.getElementById('empleados').addEventListener('click', () => {
    const employees = document.getElementById('empleados');
    employees.style.backgroundColor = "#ebebeb";

    const divEmployees = document.getElementById('contenidoE');
    divEmployees.style.display = "flex";
    divEmployees.style.backgroundColor = "#ebebeb";
})