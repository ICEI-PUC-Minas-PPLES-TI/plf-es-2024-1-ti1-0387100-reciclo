import { getIdsFromLocalStorage } from "./utils/localStorage.js";
import { mockIdsInLocalStorage } from "./utils/mocks.js";

function fetchUsuarios() {
  return fetch('../../db/usuarios.json')
      .then(response => response.json());
}

function fetchDemandas() {
  return fetch('../../db/demandas.json')
      .then(response => response.json());
}

function populateHTML(usuario, demanda) {
  document.getElementById('titulo-coletador').textContent = usuario.nome;
  document.querySelector('#caixa-descricao h2').textContent = `${demanda.tipoResiduo} - ${demanda.quantidade}`;
  document.querySelector('.outras-infos ul').innerHTML = `
      <li>${demanda.endereco}</li>
      <li>${demanda.programacaoColeta}</li>
  `;
}

window.onload = function() {
  mockIdsInLocalStorage();
  Promise.all([fetchUsuarios(), fetchDemandas()])
    .then(([{ usuarios }, { demandas }]) => {
      console.log(usuarios, demandas)
      const id = getIdsFromLocalStorage();
      const usuario = usuarios.find(usuario => usuario.id == id.usuario);
      const demanda = demandas.find(demanda => demanda.id == id.demanda);

      populateHTML(usuario, demanda);
  });
}