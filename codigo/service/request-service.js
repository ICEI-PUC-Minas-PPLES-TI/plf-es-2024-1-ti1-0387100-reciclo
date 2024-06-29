export class RequestService {

  constructor(){
    // this.urlBase = "http://localhost:3000/requests";
    this.urlBase = "https://jsonserverreciclo.onrender.com/requests";
  }

  async postRequest(request){
    const response = await fetch(this.urlBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  async getRequests() {
    const response = await fetch(this.urlBase);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const requests = await response.json();
    return requests;
  }

  async getRequest(id) {
    const response = await fetch(`${this.urlBase}/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const request = await response.json();
    return request;
  }

  async getRequestsByResidueId(residueId) {
    const response = await fetch(`${this.urlBase}?residue=${residueId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const request = await response.json();
    return request;
  }

  async putRequest(request) {
    const response = await fetch(`${this.urlBase}/${request.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  async deleteRequest(id) {
    const response = await fetch(`${this.urlBase}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  }
}