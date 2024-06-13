import {UserService} from "../../service/usuario-service.js";

const userService = new UserService();

function observerSubmitForm() {
    const formLogin = document.getElementById("login_form");
    formLogin.addEventListener('submit', handleLogin)
}

async function handleLogin(event) {
    event.preventDefault(); 
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        validateFormFields(email, password)
        
        const userLogin = {
            email: email,
            password: password,
        }

        const user = (await userService.getUserByEmail(userLogin.email))[0];

        if (user && userLogin.password === user.password) {
            localStorage.setItem("id", user.id);
            localStorage.setItem("userTypeId", user.userTypeId);
            if (user.userTypeId === "1") {
                console.log("produtor")
                window.location.href = "produtor/meus-residuos.html";
                } else if (user.userTypeId === "2") {
                console.log("coletor")
                window.location.href = "coletador/lista-demandas.html";
            }
        } else {
            throw new Error("Usuario ou Senha invalidos");
        }
    } catch (error) {
        alert(error.message)
        console.error(error)
    }
}

function validateFormFields(email, password) {
    if (!email) throw new Error("O campo email é obrigatório.");
    if (!password) throw new Error("O campo senha é obrigatório.");
}


window.addEventListener("load", observerSubmitForm);