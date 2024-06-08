
export const getTipoResiduo = async (id) => {
  const response = await fetch(`http://localhost:3000/residuesTypes/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const tiposResiduos = await response.json();
  return tiposResiduos;
}