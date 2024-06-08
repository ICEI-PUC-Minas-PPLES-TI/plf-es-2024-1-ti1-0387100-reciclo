let selectedItemValues = []; // Array para armazenar os valores dos itens selecionados

const jsonData = '{ "idDemanda": 1, "tipo-lixo": "plástico", "quantidade": "10kg", "horário": "17:00 as 19:00", "demandaAcepted": false }'; // Or any other unique name
const demandaObject = JSON.parse(jsonData);

// Using dot notation
const idDemanda = demandaObject.idDemanda;
const tipoLixo = demandaObject["tipo-lixo"];
const quantidade = demandaObject["quantidade"];
const horario = demandaObject["horário"];
const demandaAcepted = demandaObject["demandaAcepted"];




function gerarElementoGridItem(numeroItem) {
  const elementoGridItem = document.createElement('div');
  elementoGridItem.classList.add('grid-item');

  const elementoConteudoItem = document.createElement('div');
  elementoConteudoItem.classList.add('grid-item-content');

  const elementoEtiquetaItem = document.createElement('label');
  elementoEtiquetaItem.classList.add('data-demand-id');
  elementoEtiquetaItem.textContent = numeroItem;

  const elementoInput = document.createElement('input');
  elementoInput.type = 'checkbox';
  elementoInput.hidden = true;

  const elementoEtiqueta = document.createElement('label');
  elementoEtiqueta.for = `adicionar${numeroItem}`;
  elementoEtiqueta.id = `adicionar${numeroItem}`;

  const elementoIcone = document.createElement('i');
  elementoIcone.classList.add('fa-solid', 'fa-square-plus');
  elementoIcone.style.color = '#16294b';

  // Anexar elementos à estrutura
  elementoEtiqueta.appendChild(elementoIcone);
  elementoConteudoItem.appendChild(elementoEtiquetaItem);
  elementoGridItem.appendChild(elementoInput);
  elementoGridItem.appendChild(elementoEtiqueta);
  elementoGridItem.appendChild(elementoConteudoItem);

  const iconeDeAdicionar = elementoGridItem.querySelector('.fa-solid.fa-square-plus');


  // Inserir o ID da Demanda com o número do item
  demandaObject.idDemanda = numeroItem;

  console.log(`ID da Demanda: ${demandaObject.idDemanda}`);
  console.log(`Tipo de Lixo: ${demandaObject["tipo-lixo"]}`);
  console.log(`Quantidade: ${demandaObject.quantidade}`);
  console.log(`Horário: ${demandaObject.horário}`);
  console.log(`Demanda Aceita: ${demandaObject.demandaAcepted}`);
   // Criar e inserir elementos para cada propriedade do JSON
   const elementoDemandId = document.createElement('div');
   elementoDemandId.classList.add('data-demand-id');
   elementoDemandId.style.display = 'none'; // Inicialmente oculto
   elementoGridItem.appendChild(elementoDemandId);
 
   const elementoTipoLixo = document.createElement('div');
   elementoTipoLixo.classList.add('data-tipo-lixo');
   elementoTipoLixo.textContent = `Tipo de Lixo: ${demandaObject["tipo-lixo"]}`;
   elementoTipoLixo.style.display = 'none'; // Inicialmente oculto
   elementoGridItem.appendChild(elementoTipoLixo);
 
   const elementoQuantidade = document.createElement('div');
   elementoQuantidade.classList.add('data-quantidade');
   elementoQuantidade.textContent = `Quantidade: ${demandaObject["quantidade"]}`;
   elementoQuantidade.style.display = 'none'; // Inicialmente oculto
   elementoGridItem.appendChild(elementoQuantidade);
  

   const elementoHorario = document.createElement('div');
   elementoHorario.classList.add('data-horario');
   elementoHorario.textContent =  `Horário: ${demandaObject["horário"]}`;
   elementoHorario.style.display = 'none'; // Inicialmente oculto
   elementoGridItem.appendChild(elementoHorario);

   const elementoDemandaAceita = document.createElement('div');
   elementoDemandaAceita.classList.add('data-demanda-aceita');
   elementoDemandaAceita.textContent =  `Demanda aceita: ${demandaObject["demandaAcepted"]}`;
   elementoDemandaAceita.style.display = 'none'; // Inicialmente oculto
   elementoGridItem.appendChild(elementoDemandaAceita);
 

  // Atribuir evento de clique ao elemento pai (grid-item)
  elementoGridItem.addEventListener('click', function() {
    const itemNumber = parseInt(this.querySelector('.data-demand-id').textContent);
    selectedItemNumber = itemNumber; // Armazenar o número do item selecionado
    alert(`Item ${itemNumber} selecionado com sucesso!`);
    if (iconeDeAdicionar.classList.contains('fa-square-plus')) {
      iconeDeAdicionar.classList.remove('fa-square-plus');
      iconeDeAdicionar.classList.add('fa-square-check');
      elementoDemandId.style.display = 'block';
      elementoTipoLixo.style.display = 'block'; 
      elementoQuantidade.style.display = 'block'; 
      elementoHorario.style.display = 'block';
      elementoDemandaAceita.style.display = 'block'; 
    } else {
      iconeDeAdicionar.classList.remove('fa-square-check');
      iconeDeAdicionar.classList.add('fa-square-plus');
    }
    
    if (!selectedItemValues.includes(itemNumber)) {
      selectedItemValues.push(itemNumber); // Adicionar o valor ao array
      alert(`Item ${itemNumber} selecionado com sucesso!`);
      console.log(selectedItemValues);
    } else {
      alert(`O item ${itemNumber} já está selecionado.`);
    }
  });
  return elementoGridItem;
}

// Obter o número de repetições da variável
const numeroDeItens = 9; // Substitua por sua variável

// Gerar dinamicamente os elementos HTML
const elementoContainer = document.getElementById('grid-container'); // Substitua pelo seu elemento container

for (let numeroItem = 1; numeroItem <= numeroDeItens; numeroItem++) {
  const elementoGridItem = gerarElementoGridItem(numeroItem);
  elementoContainer.appendChild(elementoGridItem);
}




