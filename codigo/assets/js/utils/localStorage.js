export const getIdsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('ids'));
}

export const saveIdToLocalStorage = (usuarioId, demandaId) => {
  const ids = { usuario: usuarioId, demanda: demandaId };
  localStorage.setItem('ids', JSON.stringify(ids));
}