import { getIdsFromLocalStorage } from "./utils/localStorage";
import { mockIdsInLocalStorage } from "./utils/mocks";

function fetchUsuarios() {
  return fetch('usuarios.json')
      .then(response => response.json());
}

function fetchDemandas() {
  return fetch('demandas.json')
      .then(response => response.json());
}

function populateHTML(usuario, demanda) {
  document.getElementById('titulo-coletador').textContent = usuario.nome;
  document.querySelector('#caixa-descricao h2').textContent = `${demanda.tipo} - ${demanda.peso}kg`;
  document.querySelector('.outras-infos ul').innerHTML = `
      <li>${demanda.endereco}</li>
      <li>${demanda.data} - ${demanda.horario}</li>
  `;
}

window.onload = function() {
  mockIdsInLocalStorage();
  Promise.all([fetchUsuarios(), fetchDemandas()])
    .then(([usuarios, demandas]) => {
      const id = getIdsFromLocalStorage();
      const usuario = usuarios.find(usuario => usuario.id === id.usuario);
      const demanda = demandas.find(demanda => demanda.id === id.demanda);

      populateHTML(usuario, demanda);
  });
}