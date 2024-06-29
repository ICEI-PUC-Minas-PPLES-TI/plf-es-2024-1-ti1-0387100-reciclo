import {ResidueService} from "../../service/residuos-service.js";
import {DeliveryService} from "../../service/entrega-service.js";
import {RequestService} from "../../service/request-service.js";
import {UserService} from "../../service/usuario-service.js";
import { tipoResiduos } from "./utils/tipo-residuos.js";

const residueService = new ResidueService();
const deliveryService = new DeliveryService();
const requestService = new RequestService();
const userService = new UserService();
const statusCollect = ["NAO_ENVIADA", "AGUARDANDO", "PENDENTE", "CONCLUIDA"]
var STATUS = "";

async function setupPagetResidue() {
    const residue = await residueService.getResiduo(getResidueId());
    const deliveryResidue  = await deliveryService.getDelivery(residue.deliveryId);
    const cardResidueData = createCardResidueData(residue, deliveryResidue)
    createCardResidueComponent(cardResidueData)

    const cancelarDemanda = document.querySelector("#btnCancelar");
    cancelarDemanda.addEventListener("click", ()=> cancelCollect(residue));

    await setStatus(residue, deliveryResidue)
    buildComponentByStatus()
}

function createCardResidueData(residue, deliveryResidue) {
    const cardResidueData = {}
    cardResidueData.type = tipoResiduos[residue.residuesTypesId];
    cardResidueData.description = residue.description;
    cardResidueData.date = deliveryResidue.scheduleDate;
    cardResidueData.address = deliveryResidue.address;
    return cardResidueData;
}

function getResidueId(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

window.addEventListener("load", setupPagetResidue);

function createCardResidueComponent(cardData) {
    const type= document.getElementById("residue-type");
    type.innerText = cardData.type;
    const description= document.getElementById("residue-description");
    description.innerText = cardData.description;
    const address= document.getElementById("residue-address");
    address.innerText = cardData.address;
    const date= document.getElementById("residue-date");
    date.innerText = formatDate(cardData.date);
    
}

function formatDate(date) {
    const partes = date.split('-');
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];
    
    return `${dia}/${mes}/${ano}`;
}

const buttonRequest = document.getElementById("button_request_collect");
buttonRequest.addEventListener("click", handleRequestCollect)

async function handleRequestCollect() {
    await requestService.postRequest(requestDTO());
    window.location.reload();
}

function requestDTO() {
    let request = {}
    request.collectorId = getUserId()
    request.residue = getResidueId()
    request.accept = null;
    return request;
}

function getUserId(){
    return localStorage.getItem("id");
}

async function isAlredyRequest() {
    const allRequests = await requestService.getRequests();

    for (const req of allRequests) {
        if (req.collectorId === getUserId() && req.residue === getResidueId() && req.accept === null) {
            return statusCollect[1];
        }
    }

    return statusCollect[0]
}

async function setStatus(residue, deliveryResidue){
    if (residue.collectorId === getUserId() && deliveryResidue.concluded === true) {
        STATUS = statusCollect[3]
    } else if (residue.collectorId === getUserId() && deliveryResidue.concluded === false) {
        STATUS = statusCollect[2]
    } else if (residue.collectorId !== getUserId()) {
        STATUS = await isAlredyRequest();
    }
}

function buildComponentByStatus(){
    switch (STATUS) {
        case statusCollect[0]:
            let buttonCollect = document.getElementById("button_request_collect");
            buttonCollect.classList.remove("d-none");
            buttonCollect.classList.add("d-flex");
            break;
        case statusCollect[1]:
            let boxKeep = document.getElementById("box_keep");
            boxKeep.classList.remove("d-none");
            break;
        case statusCollect[2]:
            let boxButtons = document.getElementById("box_buttons");
            boxButtons.classList.remove("d-none");
            boxButtons.classList.add("d-flex");
            break;
        case statusCollect[3]:
            let modalConcluido = document.getElementById("modalConcluido");
            modalConcluido.classList.remove("d-none");
            modalConcluido.classList.add("d-flex");
            break;
    }
}

async function cancelCollect(residue) {
    residue.collectorId = null;
    await residueService.putResiduo(residue);
}