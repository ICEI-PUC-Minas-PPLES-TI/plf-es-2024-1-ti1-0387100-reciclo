const postUsuario = async (usuario) => {
  const response = await fetch('http://localhost:3000/usuarios', {
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

const getUsuarios = async () => {
  const response = await fetch('http://localhost:3000/usuarios');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const usuarios = await response.json();
  return usuarios;
}

const getUsuario = async (id) => {
  const response = await fetch(`http://localhost:3000/usuarios/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const usuario = await response.json();
  return usuario;
}

const putUsuario = async (usuario) => {
  const response = await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
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

const deleteUsuario = async (id) => {
  const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}