import './style.css';
import { advancedSearch, searchInFirestore } from './components/search';
import './components/bill';
import { floatingCount, manageCerrar,pagarCuenta } from './components/bill';

document.getElementById('campoBusqueda').addEventListener('input', () => {
    const searchProduct = document.getElementById('campoBusqueda').value;
    searchInFirestore(searchProduct);
});

document.getElementById('iconoBuscar').addEventListener('click', () => {
    const searchProduct = document.getElementById('campoBusqueda').value;
    advancedSearch(searchProduct);
});

document.getElementById('campoBusqueda').addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        const searchProduct = document.getElementById('campoBusqueda').value;
        advancedSearch(searchProduct);
    }
;})

document.getElementById('botonPagar').addEventListener('click', () => {
    const divPagar = document.getElementById('flotantePagar');
    divPagar.style.display = "block";
    floatingCount();
});

document.getElementById('imgCerrar').addEventListener('click', () => {
    manageCerrar();
});

document.getElementById('pagarTarjeta').addEventListener('click', () => {
    const tarjeta = document.getElementById('pagarTarjeta');
    const efectivo = document.getElementById('pagarEfectivo');
    const applePay = document.getElementById('pagarApple');

    tarjeta.style.border = "3px solid #0066FF";
    efectivo.style.border = "1px solid black";
    applePay.style.border = "1px solid black";
});

document.getElementById('pagarEfectivo').addEventListener('click', () => {
    const tarjeta = document.getElementById('pagarTarjeta');
    const efectivo = document.getElementById('pagarEfectivo');
    const applePay = document.getElementById('pagarApple');

    tarjeta.style.border = "1px solid black";
    efectivo.style.border = "3px solid #0066FF";
    applePay.style.border = "1px solid black";
});

document.getElementById('pagarApple').addEventListener('click', () => {
    const tarjeta = document.getElementById('pagarTarjeta');
    const efectivo = document.getElementById('pagarEfectivo');
    const applePay = document.getElementById('pagarApple');

    tarjeta.style.border = "1px solid black";
    efectivo.style.border = "1px solid black";
    applePay.style.border = "3px solid #0066FF";
});

document.getElementById('pagarFinal').addEventListener('click', async () => {
    await pagarCuenta();
    location.reload();
});

document.getElementById('seccionDerecha').addEventListener("click", () => {
    const modificarCuentaEx = document.getElementsByClassName("productoAgregado");
    Array.from(modificarCuentaEx).forEach(div => {
        div.style.border = "none";  
    });

    const quantityModsLess = document.getElementsByClassName('botonesMenos');
    Array.from(quantityModsLess).forEach(divs => {
        divs.remove();
    });

    const quantityModsMore = document.getElementsByClassName('botonesMas');
    Array.from(quantityModsMore).forEach(divs => {
        divs.remove();
    })
});

console.log("App inicada correctamente");
