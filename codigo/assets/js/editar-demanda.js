let demandas = [];
let demanda = {};


const form = document.querySelector("#demandaForm");
const pesoInput = document.querySelector("#peso");
const localInput = document.querySelector("#localColeta");
const descricaoInput = document.querySelector("#descricaoResiduo");
const dataInput = document.querySelector("#dataColeta");
const horarioInput = document.querySelector("#horarioColeta");
const tipoResiduo = document.querySelector("#tipoResiduo");
const buttonInput = document.querySelector("#adicionar");

function carregarDadosFormulario(){

    const id = JSON.parse(localStorage.getItem("id"));
    console.log(id);
    demandas = JSON.parse(localStorage.getItem("demandas")) || [];
    console.log(demandas);
    demanda = demandas.find((d) => { return d.id == id; });
    console.log(demanda);


    pesoInput.value = demanda.peso;
    localInput.value = demanda.local;
    descricaoInput.value = demanda.descicao;
    dataInput.value = demanda.data;
    horarioInput.value = demanda.horario;
    tipoResiduo.value = demanda.tipo;

}

function atualizarDemanda(){
    demanda.peso = pesoInput.value.trim();
    demanda.local = localInput.value.trim();
    demanda.descricao = descricaoInput.value.trim();
    demanda.data = dataInput.value.trim();
    demanda.horario = horarioInput.value.trim();
    demanda.tipo = tipoResiduo.value

    demandas.push(demanda);

    localStorage.setItem("demandas", JSON.stringify(demandas));
    window.location.href = "../../pages/produtor/visualizar-demanda-criada.html";

}

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita o envio do formulário
    atualizarDemanda(); // Chama a função para atualizar a demanda
});

window.addEventListener("load", () => {carregarDadosFormulario();});