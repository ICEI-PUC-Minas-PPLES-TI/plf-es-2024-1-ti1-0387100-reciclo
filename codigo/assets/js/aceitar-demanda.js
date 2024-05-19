import { getDbFromLocalStorage, getIdsFromLocalStorage, saveDbToLocalStorage } from "./utils/localStorage.js";
import { mockIdsInLocalStorage } from "./utils/mocks.js";

let demandas = null;
let usuarios = null;
let usuario = null;
let demanda = null;

async function fetchUsuarios() {
  const usuariosLocal = getDbFromLocalStorage().usuarios;
  if (usuariosLocal) {
    usuarios = usuariosLocal;
    return;
  }
  const response = await fetch('../../db/usuarios.json');
  const data = await response.json();
  usuarios = data.usuarios;
  saveDbToLocalStorage(usuarios, null);
}

async function fetchDemandas() {
  const demandasLocal = getDbFromLocalStorage().demandas;
  if (demandasLocal) {
    demandas = demandasLocal;
    return;
  }
  const response = await fetch('../../db/demandas.json');
  const data = await response.json();
  demandas = data.demandas;
  saveDbToLocalStorage(null, demandas);
}

function populateHTML() {
  document.getElementById('titulo-coletador').textContent = usuario.nome;
  document.querySelector('#caixa-descricao h2').textContent = `${demanda.tipoResiduo} - ${demanda.quantidade}`;
  document.querySelector('#caixa-descricao p').textContent = demanda.descricao;
  document.querySelector('.outras-infos ul').innerHTML = `
      <li>${demanda.endereco}</li>
      <li>${demanda.programacaoColeta}</li>
  `;
}

const button = document.getElementById('botao-aceitar');
button.addEventListener('click', function() {
  if (usuario.ocupado) {
    alert('Entregue sua coleta antes de aceitar outra demanda');
    return;
  }
  if (demanda.idColetor) {
    alert('Demanda já foi aceita por outro coletador');
    return;
  }
  usuario.ocupado = true;
  demanda.idColetor = usuario.id;
  usuarios = usuarios.map(user => user.id === usuario.id ? usuario : user);
  demandas = demandas.map(dem => dem.id === demanda.id ? demanda : dem);
  saveDbToLocalStorage(usuarios, demandas);
  alert('Demanda aceita com sucesso!');
});

window.onload = function() {
  mockIdsInLocalStorage();
  const ids = getIdsFromLocalStorage();

  async function fetchData() {
    await fetchUsuarios();
    await fetchDemandas();
    usuario = usuarios.find(usuario => usuario.id == ids.usuario);
    demanda = demandas.find(demanda => demanda.id == ids.demanda);
    populateHTML();
  }
  fetchData();
}