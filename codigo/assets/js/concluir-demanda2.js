import { DeliveryService } from "../../service/entrega-service.js";
import { ResidueService } from "../../service/residuos-service.js";

const residueService = new ResidueService();
const deliveryService = new DeliveryService();
/*-------------------Abertura do Modal--------------------*/
const concluirDemanda = document.querySelector("#btnConcluir");
const modal = document.querySelector(".divModal");
const modalInput = document.querySelector(".modal1")

concluirDemanda.addEventListener("click", function () {
    modal.classList.add('open')
    modalInput.classList.add('open')

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'divModal') {
            modal.classList.remove('open')
        }
    })
}, false);

/*------------------Dinamicidade Modal------------------*/

const inputs = document.querySelectorAll("input")

inputs.forEach((inputs, index) => {
    inputs.dataset.index = index;
    inputs.addEventListener("keyup", handleOtp);
});

function handleOtp(e) {
    const input = e.target;
    let value = input.value;
    input.value = "";
    input.value = value ? value[0] : "";

    let fieldIndex = input.dataset.index;

    if (value.length > 0 && fieldIndex < inputs.length - 1) {
        input.nextElementSibling.focus();
    }

    if (e.key === "Backspace" && fieldIndex > 0) {
        input.previousElementSibling.focus();
    }

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'divModal') {
            input1.value = "";
            input2.value = "";
            input3.value = "";
            input4.value = "";
        }
    })
}

/*-------------------Submit Modal-------------------------*/
let codigo = "";
const submitBtn = document.getElementById("btnConfirmarCodigo");

const input1 = document.getElementById("inpt1");
const input2 = document.getElementById("inpt2");
const input3 = document.getElementById("inpt3");
const input4 = document.getElementById("inpt4");

function getResidueId(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function getDelivery(){
    const residue = await residueService.getResiduo(getResidueId());
    const deliveryResidue  = await deliveryService.getDelivery(residue.deliveryId);
    return deliveryResidue
}

async function submit() {
    const colorInput1 = document.querySelector(".input1");
    const colorInput2 = document.querySelector(".input2");
    const colorInput3 = document.querySelector(".input3");
    const colorInput4 = document.querySelector(".input4");
    
    codigo = parseInt(`${input1.value}${input2.value}${input3.value}${input4.value}`);
    const delivery = await getDelivery();
    const confirmCode = delivery.securityCode;

    if (codigo == confirmCode) {
        delivery.concluded = true;
        await deliveryService.putDelivery(delivery)

        const modalCodigo = document.getElementById("modalInput")
        modalCodigo.classList.add('d-none')
        const modalAvaliacao = document.getElementById("modal_rating")
        modalAvaliacao.classList.remove('d-none')
    }
    if (codigo != confirmCode) {
        colorInput1.classList.add('invalid')
        colorInput2.classList.add('invalid')
        colorInput3.classList.add('invalid')
        colorInput4.classList.add('invalid')

        modal.addEventListener('click', (e) => {
            if (e.target.id == 'divModal') {
                colorInput1.classList.remove('invalid')
                colorInput2.classList.remove('invalid')
                colorInput3.classList.remove('invalid')
                colorInput4.classList.remove('invalid')
            }
        })
    }
}

submitBtn.addEventListener('click', submit)