export const getIdsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('ids'));
}

export const saveIdToLocalStorage = (usuarioId, demandaId) => {
  const ids = { usuario: usuarioId, demanda: demandaId };
  localStorage.setItem('ids', JSON.stringify(ids));
}

export const getDbFromLocalStorage = () => {
  return {
    usuarios: JSON.parse(localStorage.getItem('usuarios')),
    demandas: JSON.parse(localStorage.getItem('demandas'))
  };
}

export const saveDbToLocalStorage = (usuarios, demandas) => {
  if (usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
  if (demandas) {
    localStorage.setItem('demandas', JSON.stringify(demandas));
  }
}
