export const postResiduo = async (residuo) => {
  const response = await fetch('http://localhost:3000/residues', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(residuo),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export const getResiduos = async () => {
  const response = await fetch('http://localhost:3000/residues');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const residuos = await response.json();
  return residuos;
}

export const getResiduo = async (id) => {
  const response = await fetch(`http://localhost:3000/residues/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const residuo = await response.json();
  return residuo;
}

export const putResiduo = async (residuo) => {
  const response = await fetch(`http://localhost:3000/residues/${residuo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(residuo),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export const alocarColetor = async (residueId, coletorId) => {
  const response = await fetch(`http://localhost:3000/residues/${residueId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({collectorId: coletorId}),
  });
  console.log(response)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data)
  return data;
}


export const deleteResiduo = async (id) => {
  const response = await fetch(`http://localhost:3000/residues/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}