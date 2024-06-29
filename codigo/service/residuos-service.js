export class ResidueService {

  constructor(){
    // this.urlBase = "http://localhost:3000/residues";
    this.urlBase = "https://jsonserverreciclo.onrender.com/residues";
  }

  async postResiduo(residuo){
    const response = await fetch(this.urlBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(residuo),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  async getResiduos(){
    const response = await fetch(this.urlBase);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const residuos = await response.json();
    return residuos;
  }

  async getResiduo(id){
    const response = await fetch(`${this.urlBase}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const residuo = await response.json();
    return residuo;
  }

  async putResiduo(residuo){
    const response = await fetch(`${this.urlBase}/${residuo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(residuo),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  async deleteResiduo(id){
    const response = await fetch(`${this.urlBase}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  async alocarColetor(residueId, coletorId) {
    const response = await fetch(`${this.urlBase}/${residueId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({collectorId: coletorId}),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  async getResidueByProducerId(producerId) {
    const response = await fetch(`${this.urlBase}?producerId=${producerId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const residuesList = await response.json();
    return residuesList;
  }

}