import { postRating } from "../../service/avaliacao-service.js";

let apiData = "../../db/demandas.json"

fetch(apiData)
    .then(response => response.json())
    .then(dados => {
        dados.demanda.forEach(dadosDemanda => {
            const nomeProdutorDemanda = document.getElementById('titulo-coletador');
            const tipoResiduo = document.getElementById('tipoResiduo');
            const descricaoDemanda = document.querySelector('#caixa-descricao p');
            const enderecoDemanda = document.querySelector('ul > li:first-child');
            const horarioDemanda = document.querySelector('.horarioData');
            const imagemDemanda = document.getElementById('imagemDemanda');

            console.log(imagemDemanda)

            imagemDemanda.src = `${dadosDemanda.image}`
            nomeProdutorDemanda.innerHTML = `${dadosDemanda.produtor.nome}`;
            tipoResiduo.innerHTML = `${dadosDemanda.tipoResiduo} - ${dadosDemanda.quantidade}`
            descricaoDemanda.innerHTML = `${dadosDemanda.descricaoDemanda}`;
            enderecoDemanda.innerHTML = `${dadosDemanda.enderecoDemanda}`;
            horarioDemanda.innerHTML = `${dadosDemanda.programacaoColeta}`;
        });
    })
/*-------------------------------------------------*/
const concluirDemanda = document.querySelector("#btnConcluir");
const modal = document.querySelector(".divModal");
const modalInput = document.querySelector(".modal")

concluirDemanda.addEventListener("click", function () {
    modal.classList.add('open')
    modalInput.classList.add('open')

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'divModal') {
            modal.classList.remove('open')
        }
    })
}, false);
/*-------------------------------------------------*/

let stars = document.querySelectorAll('.star-icon');
                  
document.addEventListener('click', function(e){
  let classStar = e.target.classList;
  if(!classStar.contains('ativo')){
    stars.forEach(function(star){
      star.classList.remove('ativo');
    });
    classStar.add('ativo');
    let avaliacaFinal = e.target.getAttribute('data-avaliacao')
    console.log(avaliacaFinal);
  }
});

// como criar um rating
// const rating = {
//   collectorId: numero,
//   producerId: numero,
//   rating: numero
// }
// postRating(rating);
