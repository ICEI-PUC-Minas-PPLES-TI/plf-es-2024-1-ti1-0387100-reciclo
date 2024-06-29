export class RatingService {

  constructor(){
    this.urlBase = "http://localhost:3000/ratings";
  }

  async postRating(rating){
    const response = await fetch(this.urlBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rating),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  async getRatings() {
    const response = await fetch(this.urlBase);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const ratings = await response.json();
    return ratings;
  }

  async getRating(id){
    const response = await fetch(`${this.urlBase}/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rating = await response.json();
    return rating;
  }

  async putRating(rating){
    const response = await fetch(`${this.urlBase}/${rating.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rating),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  async deleteRating(id){
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