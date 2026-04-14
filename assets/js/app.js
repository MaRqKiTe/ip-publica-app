const ipElement = document.getElementById('ip');
const statusElement = document.getElementById('status');
const reloadBtn = document.getElementById('reloadBtn');

async function obtenerIP() {
  ipElement.textContent = 'Cargando...';
  statusElement.textContent = 'Consultando la API...';

  try {
    const response = await fetch('https://api.ipify.org/?format=json');

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    ipElement.textContent = data.ip;
    statusElement.textContent = 'IP cargada correctamente.';

    // 👇 Aquí se imprime en consola
    console.log('IP pública del cliente:', data.ip);

  } catch (error) {
    ipElement.textContent = 'No se pudo obtener la IP';
    statusElement.textContent = 'Ocurrió un error al consultar la API.';
    console.error('Error al obtener la IP pública:', error);
  }
}

reloadBtn.addEventListener('click', obtenerIP);
window.addEventListener('DOMContentLoaded', obtenerIP);