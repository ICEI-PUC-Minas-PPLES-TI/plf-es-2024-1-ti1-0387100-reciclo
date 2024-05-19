

function exibirDemanda() {

    const id = JSON.parse(localStorage.getItem("id"));
    console.log(id);
    let demandas = JSON.parse(localStorage.getItem("demandas")) || [];
    console.log(demandas);
    let demanda = demandas.find((d) => { return d.id == id; });
    console.log(demanda);

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




window.addEventListener("load", () => {

    exibirDemanda();

});

    // tipoH2.innerText = demanda.tipo;
    // pesoP.innerText = demanda.peso;
    // descricaoP.innerText = demanda.descricao;
    // localLi.innerText = demanda.local;
    // dataLi.innerText = demanda.data;
    // horarioLi.innerText = demanda.horario;