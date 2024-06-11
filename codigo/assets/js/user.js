import {getUsuario, putUsuario} from "../../service/usuario-service.js";

const inputFields = ["name", "email", "password", "cellphone"]

async function setupPageUserProfile() {
    const userId = getQueryParams();
    const user = await getUsuario(userId);
    console.log(user);
    
    for (let i = 0; i < inputFields.length; i++) {
        changeInputValue(inputFields[i], user[inputFields[i]]);
    }

    document.getElementById('edit-button').addEventListener('click', handleEditFields);
    document.getElementById('save-button').addEventListener('click', handleSaveFields);
}

function getQueryParams() {
    const search = window.location.search;
    const urlParams = new URLSearchParams(search);
    return urlParams.get('id');
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
    saveButtonElement.classList.remove("d-none")

    const editButtonElement = document.getElementById("edit-button");
    editButtonElement.classList.add("d-none")

}

async function handleSaveFields() {
    const userId = getQueryParams();
    const userData = await getUsuario(userId);

    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(function(input) {
        userData[input.id] = input.value;
    });
    console.log(userData)
    
    await putUsuario(userData);
    window.location.reload();
}

window.addEventListener("load", setupPageUserProfile);