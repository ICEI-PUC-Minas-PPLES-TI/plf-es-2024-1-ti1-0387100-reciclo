const tipoH2 = document.querySelector("#tipo");
const pesoP = document.querySelector("#peso");
const descricaoP = document.querySelector("#descricao");
const localLi = document.querySelector("#endereco");
const dataLi = document.querySelector("#data");
const horarioLi = document.querySelector("#horario");

function exibirDemanda(){

    const id = sessionStorage.getItem(demanda.id);

    let demandas = JSON.parse(localStorage.getItem("demandas")) || [];
    let demanda = demandas.find((d) => { return d.id == id; } );

    tipoH2.innerText = demanda.tipo;
    pesoP.innerText = demanda.peso;
    descricaoP.innerText = demanda.descricao;
    localLi.innerText = demanda.local;
    dataLi.innerText = demanda.data;
    horarioLi.innerText = demanda.horario;
}


window.addEventListener("load", () => {

    exibirDemanda();

});