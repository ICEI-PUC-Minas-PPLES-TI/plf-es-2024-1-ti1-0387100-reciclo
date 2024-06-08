import { getResiduo } from '../../service/residuos-service.js';
import { getTipoResiduo } from '../../service/tiposResiduos-service.js';
import { getDelivery } from '../../service/entrega-service.js';

let coletor = null;
let demanda = null;
let tipoResiduo = null;
let delivery = null;

async function fetchUsuario(id) {
  const response = await fetch(`http://localhost:3000/users/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  coletor = await response.json();
}

async function fetchDemanda(id) {
  const response = await getResiduo(id);
  console.log(response);
  demanda = await response;
  tipoResiduo = await getTipoResiduo(demanda.residuesTypesId);
  delivery = await getDelivery(demanda.deliveryId);
}

async function populateHTML() {
  document.getElementById('titulo-coletador').textContent = coletor.name;
  document.querySelector('#caixa-descricao h2').textContent = `${tipoResiduo.name} - ${demanda.quantity}${demanda.unity}`;
  document.querySelector('#caixa-descricao p').textContent = demanda.descricao;
  document.querySelector('.outras-infos ul').innerHTML = `
      <li>${delivery.address}</li>
      <li>${delivery.scheduleDate}</li>
  `;
}

const button = document.getElementById('botao-aceitar');
button.addEventListener('click', function() {
  if (coletor.ocupado) {
    alert('Entregue sua coleta antes de aceitar outra demanda');
    return;
  }
  if (demanda.idColetor) {
    alert('Demanda já foi aceita por outro coletor');
    return;
  }
  coletor.ocupado = true; 
  demanda.idColetor = coletor.id;
  coletores = coletores.map(user => user.id === coletor.id ? coletor : user);
  demandas = demandas.map(dem => dem.id === demanda.id ? demanda : dem);
  saveDbToLocalStorage(coletores, demandas);
  alert('Demanda aceita com sucesso!');
});

window.onload = function() {
  async function fetchData() {
    const path = window.location.pathname;
    const id = path.split('/').pop();
  
    await fetchDemanda(1);
    await fetchUsuario(1);
    populateHTML();
  }
  fetchData();
}