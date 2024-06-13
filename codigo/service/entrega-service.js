export class DeliveryService {

  constructor(){
    this.urlBase = "http://localhost:3000/deliveries";
  }

  async postDelivery(delivery) {
    const response = await fetch(this.urlBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(delivery),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  async getDeliveries() {
    const response = await fetch(this.urlBase);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const deliveries = await response.json();
    return deliveries;
  }

  async getDelivery(id) {
    const response = await fetch(`${this.urlBase}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const delivery = await response.json();
    return delivery;
  }
  
  async putDelivery(delivery) {
    const response = await fetch(`${this.urlBase}/${delivery.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(delivery),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  async deleteDelivery(id) {
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
