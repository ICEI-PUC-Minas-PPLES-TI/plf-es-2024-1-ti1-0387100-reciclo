import { DeliveryService } from '../../service/entrega-service.js';
import {ResidueService} from '../../service/residuos-service.js';

const deliveryService = new DeliveryService();
const residueService = new ResidueService();

function observerSubmitForm() {
    const formAddResidue = document.getElementById("add_residue_form");
    formAddResidue.addEventListener('submit', handleAddResidue);
    const buttonCancelResidue = document.getElementById("cancel_button");
    buttonCancelResidue.addEventListener('click', handleCancelResidue);
}

async function handleAddResidue(event) {
    event.preventDefault(); 
    try {
        if (!isUserProducer()) throw new Error("Voce não pode adicionar um Residuo");
        const address = document.getElementById("address_field").value
        const date = document.getElementById("date_field").value
        const quantity = document.getElementById("quantity_field").value
        const unity = document.getElementById("unity_field").value
        const residueType = document.getElementById("residueType_field").value
        const description = document.getElementById("description_field").value

        validateFormFields(address, date, quantity, unity, residueType, description)

        const deliveryData = {
            address: address,
            scheduleDate: date,
            securityCode: generateSecurityCode(),
            concluded: false,
        }

        const deliveryCreated = await deliveryService.postDelivery(deliveryData);

        const residueData = {
            collectorId: null,
            producerId: getUserId(),
            residuesTypesId: residueType,
            deliveryId: deliveryCreated.id,
            unity: unity,
            quantity: quantity,
            description: description
        }

        const residueCreated = await residueService.postResiduo(residueData);

        if(residueCreated) window.location.href = `visualizar-demanda.html?id=${residueCreated.id}`;

    } catch (error) {
        alert(error.message)
        console.error(error)
    }
}

function validateFormFields(address, date, quantity, unity, residueType, description) {
    if (!address) throw new Error("O campo endereço é obrigatório.");
    if (!date) throw new Error("O campo data é obrigatório.");
    if (!quantity) throw new Error("O campo quantidade é obrigatório.");
    if (!unity) throw new Error("O campo unidade é obrigatório.");
    if (!residueType) throw new Error("O campo tipo do resíduo é obrigatório.");
    if (!description) throw new Error("O campo descrição é obrigatório.");
}

function getUserId(){
    return localStorage.getItem("id");
}

function isUserProducer(){
    const userTypeId = localStorage.getItem("userTypeId");
    if (parseInt(userTypeId) === 1) {
        return true;
    }
    return false;
}

function generateSecurityCode() {
    const randomNumber = Math.random();
    return Math.floor(1000 + randomNumber * 9000);
}

function handleCancelResidue() {
    window.location.href = 'meus-residuos.html';
}

window.addEventListener("load", observerSubmitForm);