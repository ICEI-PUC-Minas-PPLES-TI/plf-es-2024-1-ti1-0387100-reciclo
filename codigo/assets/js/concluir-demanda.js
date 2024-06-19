let apiData = "../../db/demandas.json"

fetch(apiData)
    .then(response => response.json())
    .then(dados => {
        dados.demanda.forEach(dadosDemanda => {
            const nomeProdutorDemanda = document.getElementById('titulo-coletador');
            const tipoResiduo = document.getElementById('tipoResiduo');
            const descricaoDemanda = document.querySelector('#caixa-descricao p');
            const enderecoDemanda = document.querySelector('ul > li:first-child');
            const horarioDemanda = document.querySelector('.horarioData');
            const imagemDemanda = document.getElementById('imagemDemanda');

            console.log(imagemDemanda)

            imagemDemanda.src = `${dadosDemanda.image}`
            nomeProdutorDemanda.innerHTML = `${dadosDemanda.produtor.nome}`;
            tipoResiduo.innerHTML = `${dadosDemanda.tipoResiduo} - ${dadosDemanda.quantidade}`
            descricaoDemanda.innerHTML = `${dadosDemanda.descricaoDemanda}`;
            enderecoDemanda.innerHTML = `${dadosDemanda.enderecoDemanda}`;
            horarioDemanda.innerHTML = `${dadosDemanda.programacaoColeta}`;
        });
    })

/*-------------------Abertura do Modal--------------------*/

const concluirDemanda = document.querySelector("#btnConcluir");
const modal = document.querySelector(".divModal");
const modalInput = document.querySelector(".modal")

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
const modalConcluido = document.querySelector(".modalConcluido");
const acaoColeta = document.getElementById('acaoColeta');

const input1 = document.getElementById("inpt1");
const input2 = document.getElementById("inpt2");
const input3 = document.getElementById("inpt3");
const input4 = document.getElementById("inpt4");

function submit() {
    fetch(apiData)
        .then(response => response.json())
        .then(dados => {
            dados.demanda.forEach(dadosDemanda => {

                const confirmCode = dadosDemanda.codigoDemanda;
                codigo = parseInt(`${input1.value}${input2.value}${input3.value}${input4.value}`);

                const colorInput1 = document.querySelector(".input1");
                const colorInput2 = document.querySelector(".input2");
                const colorInput3 = document.querySelector(".input3");
                const colorInput4 = document.querySelector(".input4");

                if (codigo == confirmCode) {
                    modalInput.classList.remove('open')
                    modalConcluido.classList.add('open')

                    modal.addEventListener('click', (e) => {
                        if (e.target.id == 'divModal') {
                            modalInput.classList.remove('open')
                            blockAcao.classList.add('cancelarColeta');

                            const msgConcluida = document.createElement('h2')
                            msgConcluida.classList.add('acaoColeta')
                            msgConcluida.innerText = "Coleta concluída com sucesso!!!"
                            acaoColeta.appendChild(msgConcluida);
                        }
                    })
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

            })
        })
}
submitBtn.addEventListener('click', submit)

/*------------------Cancelar coleta--------------------*/

const cancelar = document.getElementById("btnCancelar");
const blockAcao = document.querySelector(".acaoColeta");
const divSolicitar = document.querySelector(".btnSolicitarColeta");

cancelar.addEventListener('click', function () {
    blockAcao.classList.add('cancelarColeta');
    divSolicitar.classList.add('solicitation');
    codigo = "";
})

/*----------------Solicita coleta--------------------*/

const btnSolicita = document.getElementById("btnSolicitar")

btnSolicita.addEventListener('click', function () {
    blockAcao.classList.remove('cancelarColeta');
    divSolicitar.classList.remove('solicitation');
})

