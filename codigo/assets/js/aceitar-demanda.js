import {ResidueService} from '../../service/residuos-service.js';
import {getTipoResiduo} from '../../service/tiposResiduos-service.js';
import {DeliveryService} from '../../service/entrega-service.js';
import {UserService} from '../../service/usuario-service.js';

const userService = new UserService();
const residueService = new ResidueService();
const deliveryService = new DeliveryService();
let coletor = null;
let demanda = null;
let tipoResiduo = null;
let delivery = null;

async function fetchUsuario(id) {
  const response = await userService.getUser(id);
  coletor = response;
}

async function fetchDemanda(id) {
  const response = await residueService.getResiduo(id);
  demanda = await response;
  tipoResiduo = await getTipoResiduo(demanda.residuesTypesId);
  delivery = await deliveryService.getDelivery(demanda.deliveryId);
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
  // if (coletor.ocupado) {
  //   alert('Entregue sua coleta antes de aceitar outra demanda');
  //   return;
  // }
  if (demanda.collectorId) {
    alert('Demanda já foi aceita por outro coletor');
    return;
  }
  residueService.alocarColetor(demanda.id, coletor.id);
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