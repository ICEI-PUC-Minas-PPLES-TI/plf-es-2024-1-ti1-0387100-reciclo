import {ResidueService} from "../../service/residuos-service.js";
import {DeliveryService} from "../../service/entrega-service.js";
import {RequestService} from "../../service/request-service.js";
import {UserService} from "../../service/usuario-service.js";
import { tipoResiduos } from "./utils/tipo-residuos.js";

const residueService = new ResidueService();
const deliveryService = new DeliveryService();
const requestService = new RequestService();
const userService = new UserService();
const statusDelivery = ["PENDENTE", "AGUARDANDO COLETA", "CONCLUIDO"]
let securityCode = 9999;

async function setupPagetResidue() {
    const residue = await residueService.getResiduo(getResidueId());
    const deliveryResidue  = await deliveryService.getDelivery(residue.deliveryId);

    const elementExcludeColect = document.getElementById("exclude_container");
    elementExcludeColect.addEventListener("click", ()=> excludeResidue(residue));
    
    securityCode = deliveryResidue.securityCode;
    const cardResidueData = createCardResidueData(residue, deliveryResidue)
    createCardResidueComponent(cardResidueData)
    
    if (residue.collectorId && !deliveryResidue.concluded){
        createCollectorCodeComponent()
        document.getElementById('button_cancel').addEventListener('click', ()=> handleCancelCollect());
    } else if (residue.collectorId && deliveryResidue.concluded){
        createConcludedComponent()
    } 
    else {
        await updateRequests();
    }
}

async function updateRequests() {
    const elementCardStatus = document.getElementById("card-status");
    const elementPedidoColeta = document.getElementById("pedido-coleta");
    const elementExcludeColect = document.getElementById("exclude_container");
    const requests  = await requestService.getRequestsByResidueId(getResidueId());
    const requestsPending = requests.filter(request => request.accept === null);
    if (requestsPending.length > 0) {
        elementCardStatus.classList.remove("d-none")
        elementPedidoColeta.classList.remove("d-none")
        elementPedidoColeta.classList.add("d-flex")
        const request = requestsPending[0];
        const collector = await userService.getUser(request.collectorId);

        const requestData = createCardRequestData(collector, request)
        createCardRequestComponent(requestData)

        document.getElementById('button_accept').addEventListener('click',()=> handleAcceptCollect(requestData));
        document.getElementById('button_reject').addEventListener('click',()=> handleRejectCollect(requestData));
        document.getElementById('button_cancel').addEventListener('click', ()=> handleCancelCollect());
    } else {
        elementCardStatus.classList.add("d-none")
        elementExcludeColect.classList.remove("d-none")
    }
}

function createCardResidueData(residue, deliveryResidue) {
    const cardResidueData = {}
    cardResidueData.type = tipoResiduos[residue.residuesTypesId];
    cardResidueData.description = residue.description;
    cardResidueData.date = deliveryResidue.scheduleDate;
    cardResidueData.address = deliveryResidue.address;

    if (!deliveryResidue.concluded && !residue.collectorId) {
        cardResidueData.status = statusDelivery[0];
    } else if (!deliveryResidue.concluded && residue.collectorId){
        cardResidueData.status = statusDelivery[1];
    } else if (deliveryResidue.concluded && residue.collectorId){
        cardResidueData.status = statusDelivery[2];
    }
    return cardResidueData;
}

function createCardRequestData(collector, request) {
    const cardRequestData = {}
    cardRequestData.collectorId = collector.id;
    cardRequestData.id = request.id;
    cardRequestData.collectorName = collector.name.trim().split(' ')[0];
    return cardRequestData;
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
    
function createCardRequestComponent(requestData){
    const nameCollector= document.getElementById("name_collector");
    nameCollector.innerText = requestData.collectorName;

}

async function handleAcceptCollect(requestData) {
    await requestService.putRequest(requestDTO(requestData, true))
    await residueService.alocarColetor(getResidueId(), requestData.collectorId)
    createCollectorCodeComponent();
}

function createCollectorCodeComponent() {
    let elementCardStatus =document.getElementById("card-status");
    elementCardStatus.classList.remove("d-none");
    let elementPedidoColeta =document.getElementById("pedido-coleta");
    elementPedidoColeta.classList.remove("d-flex");
    elementPedidoColeta.classList.add("d-none");
    let elementCodigoColeta =document.getElementById("codigo-coleta");
    elementCodigoColeta.classList.remove("d-none");
    elementCodigoColeta.classList.add("d-flex");
    const securityCodeElement = document.getElementById("security-code-element");
    securityCodeElement.innerHTML = securityCode;
}

async function handleRejectCollect(requestData) {
    await requestService.putRequest(requestDTO(requestData, false))
    await updateRequests();
}

async function handleCancelCollect() {
    await residueService.alocarColetor(getResidueId(), null);
    let elementCardStatus = document.getElementById("card-status");
    elementCardStatus.classList.add("d-none");
}

function formatDate(date) {
    const partes = date.split('-');
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    return `${dia}/${mes}/${ano}`;
}

function requestDTO(requestData, bool) {
    const request = {}
    request.id = requestData.id;
    request.collectorId = requestData.collectorId;
    request.residue = getResidueId();
    request.accept = bool;
    return request
}

function createConcludedComponent() {
    let elementCardStatus =document.getElementById("card-status");
    elementCardStatus.classList.remove("d-none");
    let elementCodigoColeta =document.getElementById("concluido-coleta");
    elementCodigoColeta.classList.remove("d-none");
    elementCodigoColeta.classList.add("d-flex");
}


async function excludeResidue(residue){
    await residueService.deleteResiduo(residue.id);
    await deliveryService.deleteDelivery(residue.deliveryId);
    window.location.href = "meus-residuos.html"
}
