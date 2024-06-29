import {UserService} from "../../service/usuario-service.js";

const userService = new UserService();

function observerSubmitForm() {
    const buttonRegister = document.getElementById("cadastro_form");
    buttonRegister.addEventListener('submit', handleRegister)
}

async function handleRegister(event) {
    event.preventDefault(); 
    try {
        const email = document.getElementById("email").value;
        const name = document.getElementById("name").value;
        const cellphone = document.getElementById("cellphone").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const radioButtons = document.getElementsByName("inlineRadioOptions");
        const radioButtonValue = getRadioButtonOption(radioButtons);

        validateFormFields(email, name, cellphone, password, confirmPassword, radioButtonValue)
        await verifyEmail(email, name);

        const userData = {
            email: email,
            name: name,
            password: password,
            userTypeId: radioButtonValue
        }

        const userCreated = await userService.postUser(userData);
        if(userCreated) window.location.href = 'index.html';

    } catch (error) {
        alert(error.message)
        console.error(error)
    }
}

function getRadioButtonOption(radioButtons) {
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            return radioButton.value;
        }
    }
}

function validateFormFields(email, name, cellphone, password, confirmPassword, radioButtonValue) {
    if (!email) throw new Error("O campo email é obrigatório.");
    if (!name) throw new Error("O campo nome é obrigatório.");
    if (!cellphone) throw new Error("O campo celular é obrigatório.");
    if (!password) throw new Error("O campo senha é obrigatório.");
    if (!confirmPassword) throw new Error("O campo confirmar senha é obrigatório.");
    if (!radioButtonValue) throw new Error("O campo de escolha de papel é obrigatório.");

    comparePassword(password,confirmPassword)
}

function comparePassword(pass, confirmPass) {
    if (pass != confirmPass) {
        throw new Error("Senhas não conferem")
    }
}

async function verifyEmail(email) {
    const existUserEmail = await userService.getUserByEmail(email);
    console.log(existUserEmail.length);
    if (existUserEmail.length > 0) throw new Error("Email já cadastrado");
}

window.addEventListener("load", observerSubmitForm);