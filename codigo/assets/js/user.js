import {UserService} from "../../service/usuario-service.js";

const userService = new UserService();
const inputFields = ["name", "email", "password", "cellphone"]

async function setupPageUserProfile() {
    const userId = getUserId();
    const user = await userService.getUser(userId);

    const userTypeId = getUserTypeId();

    if (userTypeId === "2") {
        updateToolBarForTypeUser()
    }
    
    for (let i = 0; i < inputFields.length; i++) {
        changeInputValue(inputFields[i], user[inputFields[i]]);
    }

    document.getElementById('edit-button').addEventListener('click', handleEditFields);
    document.getElementById('save-button').addEventListener('click', handleSaveFields);
    document.getElementById('cancel-button').addEventListener('click', handleCancelFields);
}

function getUserId(){
    return localStorage.getItem("id");
}

function getUserTypeId(){
    return localStorage.getItem("userTypeId");
}

function changeInputValue(inputId, newValue) {
    const inputElement = document.getElementById(inputId);
    inputElement.value = newValue;
}

function handleEditFields() {
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach((input) => {
        input.classList.remove('form-control-plaintext');
        input.classList.add('form-control');
        input.removeAttribute('readonly');
    });

    const saveButtonElement = document.getElementById("save-button");
    saveButtonElement.classList.remove("d-none");
    
    const cancelButtonElement = document.getElementById("cancel-button");
    cancelButtonElement.classList.remove("d-none");

    const editButtonElement = document.getElementById("edit-button");
    editButtonElement.classList.add("d-none");

}

async function handleSaveFields() {
    const userId = getUserId();
    const userData = await userService.getUser(userId);

    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(function(input) {
        userData[input.id] = input.value;
    });
    
    await userService.putUser(userData);
    window.location.reload();
}

function handleCancelFields(){
    window.location.reload();
}

function updateToolBarForTypeUser() {
    const linkElement1 = document.getElementById("link_1");
    const linkElement2 = document.getElementById("link_2");

    linkElement1.href = './coletador/lista-demandas.html';
    linkElement2.href = './coletador/minhas-demandas.html';

    linkElement1.textContent = 'Coletas Disponíveis';
    linkElement2.textContent = 'Minhas Coletas';
}

window.addEventListener("load", setupPageUserProfile);