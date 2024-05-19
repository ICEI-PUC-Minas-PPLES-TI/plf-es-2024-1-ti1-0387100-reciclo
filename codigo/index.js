// window alert 
// mudar icone 
// função setOnClick 
 var Item1 = document.getElementById("adicionar1");

// Item1.addEventListener('click', function() {
// alert('Selecionado com sucesso!');


//         if (icon.classList.contains('fa-square-plus')) {
//             icon.classList.remove('fa-square-plus');
//             icon.classList.add('fa-square-check');
//         } else {
//             icon.classList.remove('fa-square-check');
//             icon.classList.add('fa-square-plus');
//         }
// });

const gridItems = document.querySelectorAll('.grid-item');
    console.log(gridItems);
gridItems.forEach(gridItem => {
    var icon = Item1.querySelector('i');
  console.log(icon);
  const existingContentElement = gridItem.querySelector('.grid-item-content'); // Supondo uma classe 'grid-item-content' para o conteúdo existente
    console.log('teste nullo: '+existingContentElement);
  const demandDetailsElement = document.createElement('div'); // Crie um contêiner para os detalhes da demanda

  
  icon.addEventListener('click',  function () {
    // Extraia o ID da demanda do gridItem (supondo um atributo 'data-demand-id')
    const demandId = parseInt(gridItem.dataset.demandId);
    console.log(demandId)

    // Busque os dados da demanda em um arquivo JSON ou API (substitua 'demands.json' pela sua URL)
    fetch('/arquivo.json')
      .then(response => response.json())
      .then(demandsData => {
        const demandData = demandsData.find(demand => demand.idDemanda === demandId);

        if (demandData) {
          // Crie e anexe elementos de detalhes da demanda
          const demandTitle = document.createElement('h3');
          demandTitle.textContent = `Demanda de Reciclagem de ${demandData['tipo-lixo']}`;

          const demandDetails = document.createElement('p');
          demandDetails.textContent = `Quantidade: ${demandData['quantidade']}, Horário: ${demandData['horário']}`;

          demandDetailsElement.appendChild(demandTitle);
          demandDetailsElement.appendChild(demandDetails);

          // Anexe os detalhes da demanda ao elemento de conteúdo existente (ou crie-o se não existir)
          if (existingContentElement) {
            existingContentElement.appendChild(demandDetailsElement);
          } else {
            const newContentElement = document.createElement('div');
            newContentElement.classList.add('grid-item-content'); // Adicione a classe para formatação
            newContentElement.appendChild(demandDetailsElement);
            gridItem.appendChild(newContentElement);
          }
        } else {
          console.error('Dados da demanda não encontrados para ID:', demandId);
        }
      });
  });
});
