export const getDelivery = async (id) => {
  const response = await fetch(`http://localhost:3000/deliveries/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const delivery = await response.json();
  return delivery;
}