import { getDelivery } from "../../service/entrega-service.js";
import { getResiduos } from "../../service/residuos-service.js";
import { tipoResiduos } from "./utils/tipo-residuos.js";

async function populateDemandas(tipoSelecionado = 'Todos') {
  const todasDemandas = await getResiduos();
  let demandas = todasDemandas.filter(residuo => !residuo.collectorId);
  const listaDemanda = document.querySelector('.lista-demanda');
  listaDemanda.innerHTML = '';
  if (tipoSelecionado !== 'Todos') {
    console.log(demandas)
    demandas = demandas.filter(demanda => tipoResiduos[demanda.residuesTypesId] === tipoSelecionado);
  }

  demandas.forEach(async (demanda) => {
    const entrega = await getDelivery(demanda.deliveryId);
    const demandaDiv = document.createElement('div');
    demandaDiv.className = 'demanda mb-3';

    const demandaInfo = document.createElement('div');
    demandaInfo.className = 'demanda-info';

    const nameP = document.createElement('p');
    const strongName = document.createElement('strong');
    strongName.textContent = `${tipoResiduos[demanda.residuesTypesId]} - ${demanda.quantity}${demanda.unity}`; // Assuming 'name' is the property for the demanda's name
    nameP.appendChild(strongName);

    const addressP = document.createElement('p');
    addressP.textContent = entrega.address; // Assuming 'address' is the property for the demanda's address

    demandaInfo.appendChild(nameP);
    demandaInfo.appendChild(addressP);

    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'button';

    const addButton = document.createElement('button');
    addButton.id = 'adicionar'; // Note: IDs should be unique. Consider using a class or appending a unique identifier.
    addButton.textContent = '+';

    buttonDiv.appendChild(addButton);

    demandaDiv.appendChild(demandaInfo);
    demandaDiv.appendChild(buttonDiv);

    listaDemanda.appendChild(demandaDiv);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.getElementById('materialType');

  selectElement.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    console.log('Selected material type:', selectedValue);
    populateDemandas(selectedValue);
  });
  populateDemandas();
});