export class UserService {

  constructor(){
    // this.urlBase = "http://localhost:3000/users";
    this.urlBase = "https://jsonserverreciclo.onrender.com/users";
  }

  async postUser(user){
    const response = await fetch(this.urlBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  async getUsers() {
    const response = await fetch(this.urlBase);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    return users;
  }

  async getUser(id) {
    const response = await fetch(`${this.urlBase}/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const user = await response.json();
    return user;
  }

  async getUserByEmail(email) {
    const response = await fetch(`${this.urlBase}?email=${email}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const user = await response.json();
    return user;
  }

  async putUser(user) {
    const response = await fetch(`${this.urlBase}/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  async deleteUser(id) {
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