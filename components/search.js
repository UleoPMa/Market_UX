import { collection,query,where,getDocs, orderBy, startAt, endAt, doc, documentId } from "firebase/firestore";
import { db } from "../server";
import { addProductToCart } from "./bill";

///Funcion de busqueda de productos al cambiar el input de la barra de busqueda
export async function searchInFirestore(searchProduct) {
    const q = query(
        collection(db, "productos"),
        orderBy("name"),
        startAt(searchProduct),
        endAt(searchProduct + '\uf8ff')
    );



    ///Recupera los documentos de la BD
    const querySnapshot = await getDocs(q);
    const resultsDiv = document.getElementById('resultadosBusqueda');
    resultsDiv.innerHTML = '';
    const okSearch = document.getElementById('resultadosBusqueda');
    okSearch.style.display = "block";

    if(querySnapshot.empty) {
        resultsDiv.innerHTML = "No se encontraron productos...";
        resultsDiv.style.borderBottom = "1px solid black";
        resultsDiv.style.borderLeft = "1px solid black";
        resultsDiv.style.borderRight = "1px solid black";
        resultsDiv.style.borderBottomLeftRadius = "8px";
        resultsDiv.style.borderBottomRightRadius = "8px";
    }
    else {
        if(searchProduct !== ""){
            resultsDiv.style.borderBottom = "1px solid black";
            resultsDiv.style.borderLeft = "1px solid black";
            resultsDiv.style.borderRight = "1px solid black";
            resultsDiv.style.borderBottomLeftRadius = "8px";
            resultsDiv.style.borderBottomRightRadius = "8px";
            querySnapshot.forEach((doc) => {
                const product = doc.data();

                ///Crea el elemento HTML, paso a paso para evitar inyecciones HTML, asignar clase y id al div creado
                const productDiv = document.createElement('div');
                productDiv.className = "productosS";
                productDiv.id = product.barCode;

                ///Definir el contenido en etiquetas html del div
                productDiv.innerHTML = `${product.name} ${product.description} $${product.price} pesos`;

                ///Anadir lo definido a la etiqueta
                resultsDiv.appendChild(productDiv);
            });
        }
        else {
            resultsDiv.style.border = "0px";
        }
    }
}


///Funcion de busqueda de productos al dar click en el icono de lupa en la barra de busqueda
export async function advancedSearch(searchProduct) {
    const q = query(
        collection(db, "productos"),
        orderBy("name"),
        startAt(searchProduct),
        
        endAt(searchProduct + '\uf8ff')
    );

    const querySnapshot = await getDocs(q);
    const resultsDiv = document.getElementById('busquedaAvanzada');
    resultsDiv.innerHTML = '';

    if (querySnapshot.empty) {
        resultsDiv.innerHTML = '<h1>No se encontraron productos con ese nombre...</h1>';
    } else {
        if (searchProduct !== "") {
            const okSearch = document.getElementById('resultadosBusqueda');
            okSearch.style.display = "none";

            querySnapshot.forEach((doc) => {
                const product = doc.data();
                if(product.stock < 1) {
                    const productDiv = document.createElement('div');
                    productDiv.className = "productosAS";
                    productDiv.id = product.barCode + "A";
                    productDiv.style.opacity = "0.8";
                    productDiv.style.pointerEvents = "none";

                    productDiv.innerHTML = `
                        <div><img src="${product.image}" style="filter:grayscale(90%);"></div>
                        <div style="color: grey;"><p>${product.name} ${product.description}</p></div>
                        <div style="color:white; background-color: grey; border-radius: 10px;">PRODUCTO NO DISPONIBLE</div>
                    `;
                    resultsDiv.appendChild(productDiv);
                } else {
                    const productDiv = document.createElement('div');
                    productDiv.className = "productosAS";
                    productDiv.id = product.barCode + "A";

                    productDiv.innerHTML = `
                        <div><img src="${product.image}"></div>
                        <div><p>${product.name} ${product.description}</p></div>
                        <div><p>$${product.price} pesos</p></div>
                    `;
                    resultsDiv.appendChild(productDiv);

                    productDiv.addEventListener('click', () => addProductToCart(product));
                }
            });
        }
    }
}