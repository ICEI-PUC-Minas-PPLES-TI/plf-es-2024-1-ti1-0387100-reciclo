const postResiduo = async (residuo) => {
  const response = await fetch('http://localhost:3000/residuos', {
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

const getResiduos = async () => {
  const response = await fetch('http://localhost:3000/residuos');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const residuos = await response.json();
  return residuos;
}

const getResiduo = async (id) => {
  const response = await fetch(`http://localhost:3000/residuos/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const residuo = await response.json();
  return residuo;
}

const putResiduo = async (residuo) => {
  const response = await fetch(`http://localhost:3000/residuos/${residuo.id}`, {
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

const deleteResiduo = async (id) => {
  const response = await fetch(`http://localhost:3000/residuos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}