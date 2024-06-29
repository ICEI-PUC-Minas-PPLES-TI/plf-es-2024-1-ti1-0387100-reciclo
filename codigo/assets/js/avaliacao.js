import { RatingService } from "../../service/avaliacao-service.js";
import { ResidueService } from "../../service/residuos-service.js";

const ratingService = new RatingService()
const residueService = new ResidueService();

const confirmarAvaliacaoButton = document.getElementById("btnConfirmarAvaliacao");
confirmarAvaliacaoButton.addEventListener("click", sendRating)

async function sendRating() {
  const rating = await ratingDTO()
  await ratingService.postRating(rating);
  window.location.reload();
}

async function ratingDTO(){
  const rating = {
    collectorId: getUserId(),
    producerId: await getProducerId(),
    rating: ratingFinish()
  }

  return rating;
}

async function getProducerId(){
  const residue = await residueService.getResiduo(getResidueId());
  return residue.producerId;
}

const stars = document.querySelectorAll('.star-icon');

stars.forEach(function(star){
  star.addEventListener("click", (e) => handleRating(e.target));
});

function ratingFinish() {
  let avaliacaFinal

  stars.forEach(function(star){
    if (star.classList.contains("ativo")) {
      avaliacaFinal = star.getAttribute('data-avaliacao')
    }
  });
  
  return avaliacaFinal;
}

function handleRating(el){
  resetClasslistStar() 
  el.classList.add("ativo")
}

function resetClasslistStar() {
  stars.forEach(function(star){
    star.classList.remove("ativo");
  });
}

function getResidueId(){
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

function getUserId(){
  return localStorage.getItem("id");
}
