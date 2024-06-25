import { ResidueService } from "../../service/residuos-service.js";
import { tipoResiduos } from "./utils/tipo-residuos.js";
import { DeliveryService } from '../../service/entrega-service.js';

const deliveryService = new DeliveryService();
const residueService = new ResidueService();

async function setupPageListDemands() {
  const residueListTotal = await residueService.getResiduos();
  const selectElement = document.getElementById('materialType');
  let tipoSelecionado = 'Todos';

  selectElement.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    tipoSelecionado = selectedValue;
    console.log('Selected material type:', tipoSelecionado);
    let residueList = residueListTotal.filter(residuo => !residuo.collectorId);
    const list_demands = document.getElementById('list_demands');
    list_demands.innerHTML = '';

    populateDemandas(residueList, tipoSelecionado); 
  });

  populateDemandas(residueListTotal, tipoSelecionado); 
}

async function populateDemandas(residueListTotal, tipoSelecionado) {
  let residueList = residueListTotal.filter(residuo => !residuo.collectorId);

  if (tipoSelecionado !== 'Todos') {
    residueList = residueList.filter(demanda => tipoResiduos[demanda.residuesTypesId] === tipoSelecionado);
  }

  if (residueList.length > 0) {
    const emptyList = document.getElementById('empty_demands');
    emptyList.classList.add('d-none')

    const list_demands = document.getElementById('list_demands');
    list_demands.classList.remove('d-none')
    list_demands.classList.add('d-flex')
  }

  for (let i = 0; i < residueList.length; i++) {
    const residue = residueList[i];
    const deliveryResidue  = await deliveryService.getDelivery(residue.deliveryId);
    const cardResidueData = createCardResidueData(residue, deliveryResidue)
    createCardResidueComponent(cardResidueData)
  }
}

function createCardResidueData(residue, deliveryResidue) {
    const cardResidueData = {}
    cardResidueData.type = tipoResiduos[residue.residuesTypesId];
    cardResidueData.address = deliveryResidue.address;
    cardResidueData.residueId = residue.id;

    return cardResidueData;
}

function isUserCollector(){
    const userTypeId = localStorage.getItem("userTypeId");
    if (parseInt(userTypeId) === 2) {
        return true;
    }
    return false;
}

window.addEventListener("load", setupPageListDemands);

function createCardResidueComponent(cardData) {
    var cardContainer = document.getElementById('list_demands');
    
    var card = document.createElement('div');
    card.className = 'card';

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body card_style';

    var flexDiv = document.createElement('div');
    flexDiv.className = 'd-flex justify-content-between';

    var textDiv = document.createElement('div');

    var titleDiv = document.createElement('div');
    titleDiv.className = 'title_card';
    var titleSpan1 = document.createElement('span');
    titleSpan1.textContent = cardData.type;
    var titleSpan2 = document.createElement('span');

    titleDiv.appendChild(titleSpan1);
    titleDiv.appendChild(titleSpan2);

    var addressDiv = document.createElement('div');
    var addressSpan = document.createElement('span');
    addressSpan.textContent = cardData.address;
    addressDiv.appendChild(addressSpan);

    textDiv.appendChild(titleDiv);
    textDiv.appendChild(addressDiv);

    var buttonDiv = document.createElement('div');
    buttonDiv.className = 'd-flex align-items-center';
    var button = document.createElement('button');

    button.type = 'button';
    button.style.all = 'unset';
    button.addEventListener('click', function() {
    window.location.href =  `visualizar-coleta.html?id=${cardData.residueId}`;
    });
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '28');
    svg.setAttribute('height', '28');
    svg.setAttribute('fill', 'currentColor');
    svg.classList.add('bi', 'bi-info-square-fill', 'text-primary');
    svg.setAttribute('viewBox', '0 0 16 16');
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2');
    svg.appendChild(path);
    button.appendChild(svg);
    buttonDiv.appendChild(button);

    flexDiv.appendChild(textDiv);
    flexDiv.appendChild(buttonDiv);

    cardBody.appendChild(flexDiv);

    card.appendChild(cardBody);

    cardContainer.appendChild(card);
}