export const postRating = async (rating) => {
  const response = await fetch('http://localhost:3000/ratings', {
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

export const getRatings = async () => {
  const response = await fetch('http://localhost:3000/ratings');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const ratings = await response.json();
  return ratings;
}

export const getRating = async (id) => {
  const response = await fetch(`http://localhost:3000/ratings/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const rating = await response.json();
  return rating;
}

export const putRating = async (rating) => {
  const response = await fetch(`http://localhost:3000/ratings/${rating.id}`, {
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

export const deleteRating = async (id) => {
  const response = await fetch(`http://localhost:3000/ratings/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}