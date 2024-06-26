

function exibirDemanda() {

    const id = JSON.parse(localStorage.getItem("id"));

    let demandas = JSON.parse(localStorage.getItem("demandas")) || [];

    let demanda = demandas.find((d) => { return d.id == id; });


    const tipoH2 = document.createElement("h2");
    tipoH2.innerText = demanda.tipo;

    const pesoP = document.createElement("p");
    pesoP.innerText = demanda.peso;

    const descricaoP = document.createElement("p");
    descricaoP.innerText = demanda.descricao;

    const localLi = document.createElement("li");
    localLi.innerText = demanda.local;

    const dataLi = document.createElement("li");
    dataLi.innerText = demanda.data;

    const horarioLi = document.createElement("li");
    horarioLi.innerText = demanda.horario;

    const divCardBody = document.querySelector("#card-body");
    divCardBody.appendChild(tipoH2);
    divCardBody.appendChild(pesoP);
    divCardBody.appendChild(descricaoP);

    const lista = document.querySelector("#lista");
    lista.appendChild(localLi);
    lista.appendChild(dataLi);
    lista.appendChild(horarioLi);

}

function removeDemanda() {
    if (confirm("Deseja remover a demanda?")) {
        const id = JSON.parse(localStorage.getItem("id"));
        let demandas = JSON.parse(localStorage.getItem("demandas")) || [];

        const demandaIndex = demandas.findIndex((d) => d.id === id);

        if (demandaIndex !== -1) {
            demandas.splice(demandaIndex, 1);
            localStorage.setItem("demandas", JSON.stringify(demandas));

        } else {
            console.error('Demanda não encontrada');
        }
    }
}

window.addEventListener("load", () => {

    exibirDemanda();

});

