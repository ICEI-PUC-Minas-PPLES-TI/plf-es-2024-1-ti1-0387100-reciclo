export class ResidueTypeService {

  constructor(){
    // this.urlBase = "http://localhost:3000/residuesTypes";
    this.urlBase = "https://jsonserverreciclo.onrender.com/residuesTypes";
  }

  async getTiposResiduos() {
    const response = await fetch(this.urlBase);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const tiposResiduos = await response.json();
    return tiposResiduos;
  }

  async getTipoResiduo(id){
  const response = await fetch(`${this.urlBase}/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const tiposResiduos = await response.json();
    return tiposResiduos;
  }
}