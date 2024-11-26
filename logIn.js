import { collection,query,where,getDocs, orderBy, startAt, endAt, doc, documentId } from "firebase/firestore";
import { db } from "./server";

document.getElementById('id_Usuario').addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        const idUser = document.getElementById('id_Usuario').value;
        login(idUser);
    }
});

export async function login(id) {
    const q = query(
        collection(db, "employees"),
        orderBy("id")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const employee = doc.data();
        console.log(employee.id)

        if(employee.id == id) {
            const divPassword = document.getElementById('sesionContrasenia');
            divPassword.style.display = "flex";
            const divId = document.getElementById('userId');
            divId.style.display = "none";

            document.getElementById('contra_Usuario').addEventListener('keydown', (event) => {
                if (event.key === "Enter") {
                    const passwordUser = document.getElementById('contra_Usuario').value;
                    
                    if(employee.password == passwordUser){
                        localStorage.setItem('employeeId', id);
                        window.location.href = "/sales.html";
                    }
                    else{
                        alert("Id o contraseña incorrecta, vuelve a intentarlo");
                        window.location.href = "/index.html";
                    }
                }
            });
        }else {
            alert("Debes ingresar un numero de empleado valido!");
        }
    });
}