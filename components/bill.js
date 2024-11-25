import { collection,query,where,getDocs, orderBy, startAt, endAt, doc, documentId, count, updateDoc } from "firebase/firestore";
import { db } from "../server";
let total = 0;
let addedProducts = [];

export function addProductToCart(product) {
    const count = addedProducts.filter(num => num === product).length;
    console.log(addedProducts);

    if(count+1 > product.stock) {
        return alert("No es posible anadir el producto al carrito, ya que no hay suficiente stock disponible");
    } else {
        if(count < 1) {
            addedProducts.push(product);
    
            const productDiv = document.createElement('div');
            productDiv.className = "productoAgregado";
            productDiv.id = `producto${product.barCode}`
            productDiv.innerHTML = `
            <div id="cantidad-${product.barCode}" class="cantidadProducto">1</div>
            <div id="nombre-${product.barCode}" class="nombreProducto">${product.name} ${product.description}</div>
            <div id="precio-${product.barCode}" class="precioProducto">$${product.price}</div>`;
    
            document.getElementById('productos').appendChild(productDiv);
    
            productDiv.addEventListener('click', () => {
                modifyCount(product);
            });
        }
        else {
            addedProducts.push(product);
    
            const cantidadDiv = document.getElementById(`cantidad-${product.barCode}`);
            cantidadDiv.textContent = count+1;
    
            const precioDiv = document.getElementById(`precio-${product.barCode}`);
            precioDiv.textContent = product.price*(count+1);
        }
    
        total += product.price;
        document.getElementById('total').innerHTML = `<strong>Total: $${total} pesos</strong>`;
    }
}


export function floatingCount() {
    let uniqueProducts = [...new Set(addedProducts)];

    uniqueProducts.forEach(element => {
        const divProducts = document.createElement('div');
        divProducts.className = "productosFinal";
        divProducts.innerHTML = `<div class="cantidadFinal">${addedProducts.filter(value => value === element).length}</div>
        <div class="nombneFinal">${element.name} ${element.description}</div>
        <div class="precioUnitario">$${element.price} pesos</div>
        <div class="precioFinal">$${(addedProducts.filter(value => value === element).length)*element.price} pesos</div>`

        document.getElementById('cuentaItems').appendChild(divProducts);
    });
}

export function manageCerrar(){
    const divPagar = document.getElementById('flotantePagar'); 
    divPagar.style.display = "none";

    const tarjeta = document.getElementById('pagarTarjeta');
    const efectivo = document.getElementById('pagarEfectivo');
    const applePay = document.getElementById('pagarApple');

    tarjeta.style.border = "1px solid black";
    efectivo.style.border = "1px solid black";
    applePay.style.border = "1px solid black";

    const divsToDelete = document.querySelectorAll("div.productosFinal");
    divsToDelete.forEach((div) => div.remove());
}


export function modifyCount(product) { 
    const divsNotTo = document.getElementsByClassName('productoAgregado');
    Array.from(divsNotTo).forEach(div => {
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

    const divToModify = document.getElementById(`producto${product.barCode}`);
    divToModify.style.borderBottom = "2px solid #0066FF";
    divToModify.style.borderTop = "2px solid #0066FF";

    const modifyQuantity = document.getElementById(`cantidad-${product.barCode}`);
    modifyQuantity.innerHTML = `<div class="botonesMenos"><button id="decreaseBtn">-</button></div>
    ${addedProducts.filter(value => value === product).length}
    <div class="botonesMas"><button id="increaseBtn">+</button></div>`;

    document.getElementById('decreaseBtn').addEventListener('click', () => {
        if((addedProducts.filter(value => value === product).length)-1 == 0) {
            divToModify.remove();
            const index = addedProducts.indexOf(product);

            if(index > -1) {
                addedProducts.splice(index,1);
            }
        }
        else {
            const index = addedProducts.indexOf(product);

            if(index > -1) {
                addedProducts.splice(index,1);
            }
        }
    });

    document.getElementById('increaseBtn').addEventListener('click', () => {
        if(product.stock == addedProducts.filter(value => value === product).length) {
            alert("No hay suficiente stock...");
        }
        else {
            addProductToCart(product);
        }
    });
}

export async function pagarCuenta() {
    let uniqueProducts = [...new Set(addedProducts)];

    const refDoc = collection(db, "productos");

    for(const element of uniqueProducts) {
        const amountBill = addedProducts.filter(num => num === element).length;

        const q = query(refDoc, where("barCode", "==", element.barCode));

        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty) {
            const documento = querySnapshot.docs[0];
            const docReference = doc(db, "productos", documento.id);

            await updateDoc(docReference, {stock: `${element.stock-amountBill}`});
        }
    };
}
