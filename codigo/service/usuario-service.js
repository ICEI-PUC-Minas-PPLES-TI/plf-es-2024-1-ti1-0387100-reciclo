export const postUsuario = async (usuario) => {
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export const getUsuarios = async () => {
  const response = await fetch('http://localhost:3000/users');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const usuarios = await response.json();
  return usuarios;
}

export const getUsuario = async (id) => {
  const response = await fetch(`http://localhost:3000/users/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const usuario = await response.json();
  return usuario;
}

export const putUsuario = async (usuario) => {
  const response = await fetch(`http://localhost:3000/users/${usuario.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export const deleteUsuario = async (id) => {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}