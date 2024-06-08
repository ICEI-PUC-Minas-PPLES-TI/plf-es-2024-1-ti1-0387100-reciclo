export const postDelivery = async (delivery) => {
  const response = await fetch('http://localhost:3000/deliveries', {
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

export const getDeliveries = async () => {
  const response = await fetch('http://localhost:3000/deliveries');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const deliveries = await response.json();
  return deliveries;
}

export const getDelivery = async (id) => {
  const response = await fetch(`http://localhost:3000/deliveries/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const delivery = await response.json();
  return delivery;
}

export const putDelivery = async (delivery) => {
  const response = await fetch(`http://localhost:3000/deliveries/${delivery.id}`, {
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

export const deleteDelivery = async (id) => {
  const response = await fetch(`http://localhost:3000/deliveries/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}