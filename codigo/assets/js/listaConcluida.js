let selectedItemValues = []; // Array to store selected item values

fetch('listaConcluida.json')
  .then(response => response.json())
  .then(jsonData => {

    // Function to generate grid item elements
    function gerarElementoGridItem(demandaObject) {
      const elementoGridItem = document.createElement('div');
      elementoGridItem.classList.add('grid-item');

      const elementoConteudoItem = document.createElement('div');
      elementoConteudoItem.classList.add('grid-item-content');

      const elementoInput = document.createElement('input');
      elementoInput.type = 'checkbox';
      elementoInput.hidden = true;

      elementoConteudoItem.appendChild(elementoInput);
      elementoGridItem.appendChild(elementoInput);
      elementoGridItem.appendChild(elementoConteudoItem);

      const elementoCabecalho = document.createElement('div');
      elementoCabecalho.classList.add('data-cabecalho');

      const elementoTipoLixoData = document.createElement('span');
      elementoTipoLixoData.classList.add('data-tipo-lixo-data');
      elementoTipoLixoData.textContent = `${demandaObject["tipo-lixo"]} - ${demandaObject.data}`;
      elementoCabecalho.appendChild(elementoTipoLixoData);

      elementoGridItem.appendChild(elementoCabecalho);

      const elementoQuantidade = document.createElement('div');
      elementoQuantidade.classList.add('data-quantidade');
      elementoQuantidade.textContent = `Quantidade: ${demandaObject.quantidade}`;
      elementoGridItem.appendChild(elementoQuantidade);

      const elementoStatus = document.createElement('div');
      elementoStatus.classList.add('data-status');
      if (demandaObject.demandaStatus === "Concluído") {
        elementoStatus.classList.add('Concluído');
        elementoStatus.textContent = demandaObject.demandaStatus;
      }
      elementoGridItem.appendChild(elementoStatus);

      elementoGridItem.addEventListener('click', function() {
        const isSelected = elementoInput.checked;
        if (isSelected) {
          selectedItemValues.push(demandaObject.tipoLixo); 
        } else {
          selectedItemValues = selectedItemValues.filter(item => item !== demandaObject.tipoLixo);
        }
       
      });

      return elementoGridItem;
    }

    //  Elemento do container
    const elementoContainer = document.getElementById('grid-container');

    
    jsonData.forEach(demandaObject => {
      const elementoGridItem = gerarElementoGridItem(demandaObject);
      elementoContainer.appendChild(elementoGridItem);
    });
  })
  .catch(error => console.error('Error fetching JSON data:', error));
