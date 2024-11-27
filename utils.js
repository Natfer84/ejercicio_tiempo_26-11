// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
//import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration

// configuro los datos con la BD que he creado
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
  const firebaseConfig = {
    apiKey: "AIzaSyCQZ_kaAFlYG0QMtVuFBFbY7zyxn6xlg30",
    authDomain: "ejercicio-con-tiempo-26-11.firebaseapp.com",
    projectId: "ejercicio-con-tiempo-26-11",
    storageBucket: "ejercicio-con-tiempo-26-11.firebasestorage.app",
    messagingSenderId: "610766481122",
    appId: "1:610766481122:web:d42e4e5cfe6d42f8fd20bb"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getTasks() {
    const querySnapshot = await getDocs(collection(db, "trabajo"));
    querySnapshot.forEach((doc) => {
        createCard(doc.id, doc.data());
    });
}

function createCard(id, trabajo) {
    const principalDiv = document.createElement('div');
    principalDiv.setAttribute("class", "card bg-light mb-3");
    principalDiv.style = "max-width: 20rem;";
    principalDiv.setAttribute("name", id);

    const headerDiv = document.createElement('div');
    const contentDiv = document.createTextNode("Id: " + id);
    headerDiv.setAttribute("class", "card-header");
    headerDiv.appendChild(contentDiv);
    principalDiv.appendChild(headerDiv);

    const bodyDiv = document.createElement('div');
    const pTitle = document.createElement("p");
    const pTitleText = document.createTextNode("Titulo: " + trabajo.titulo);
    const hr = document.createElement('hr');
    const pDesc = document.createElement("p");
    const pDescText = document.createTextNode("Description: " + trabajo.descripcion);

    pTitle.appendChild(pTitleText);
    bodyDiv.appendChild(pTitle);
    bodyDiv.appendChild(hr);
    pDesc.appendChild(pDescText);
    bodyDiv.appendChild(pDesc);
    bodyDiv.appendChild(hr);

    const input = document.createElement("input");
    input.type = "button";
    input.value = "Borrar Tarea";
    input.setAttribute("name", "delete");
    input.setAttribute("id", id);
    bodyDiv.appendChild(input);

    principalDiv.appendChild(bodyDiv);
    document.body.appendChild(principalDiv);
    const br = document.createElement("br");
    document.body.appendChild(br);
}

function generateRandomIdTask(num) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export async function insertTask(trabajo) {
    await setDoc(doc(db, "trabajo", generateRandomIdTask(20)), trabajo);
    alert("Insertada la tarea: " + trabajo.titulo);
}

export async function deleteTask(id) {
    await deleteDoc(doc(db, "trabajo", id));
    alert("Borrada la tarea: " + id);
}
