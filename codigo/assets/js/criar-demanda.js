const form = document.querySelector("#demandaForm");
const pesoInput = document.querySelector("#peso");
const localInput = document.querySelector("#localColeta");
const descricaoInput = document.querySelector("#descricaoResiduo");
const dataInput = document.querySelector("#dataColeta");
const horarioInput = document.querySelector("#horarioColeta");
const tipoResiduo = document.querySelector("#tipoResiduo");
const buttonInput = document.querySelector("#adicionar");

// buttonInput.addEventListener('submit', function(event) {
//     event.preventDefault(); 

// })

function salvarDados(){
    let demanda = new Object();
    demanda.id = obterID();
    demanda.peso = pesoInput.value.trim();
    demanda.local = localInput.value.trim();
    demanda.descricao = descricaoInput.value.trim();
    demanda.data = dataInput.value.trim();
    demanda.horario = horarioInput.value.trim();
    demanda.tipo = tipoResiduo.value

    let demandas = JSON.parse(localStorage.getItem("demandas")) || [];
    demandas.push(demanda);
    localStorage.setItem("demandas", JSON.stringify(demandas));

    form.reset();
    window.location.href = "../../pages/produtor/visualizar-demanda-criada.html";


}

function obterID(){
    let id = parseInt(localStorage.getItem("id")) || 0;
    id++;
    localStorage.setItem("id",id);
    return id;
}