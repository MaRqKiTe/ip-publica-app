const ipElement = document.getElementById("ip");
const continentElement = document.getElementById("continent");
const cityElement = document.getElementById("city");
const statusElement = document.getElementById("status");
const btnActualizar = document.getElementById("btnActualizar");

const API_KEY = "2eec8cf34d034595b930d4845a026d54";

async function obtenerIPPublica() {
  const response = await fetch("https://api.ipify.org/?format=json");

  if (!response.ok) {
    throw new Error(`Error al obtener la IP pública: ${response.status}`);
  }

  return await response.json();
}

async function obtenerGeolocalizacion(ip) {
  const url = `https://api.ipgeolocation.io/v3/ipgeo?apiKey=${API_KEY}&ip=${ip}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error al obtener la geolocalización: ${response.status}`);
  }

  return await response.json();
}

async function cargarInformacionIP() {
  try {
    statusElement.textContent = "Consultando información...";
    ipElement.textContent = "Cargando...";
    continentElement.textContent = "Cargando...";
    cityElement.textContent = "Cargando...";

    const ipData = await obtenerIPPublica();
    const ip = ipData.ip;

    const geoData = await obtenerGeolocalizacion(ip);

    ipElement.textContent = geoData.ip;
    continentElement.textContent = geoData.location.country_name;
    cityElement.textContent = geoData.location.city;

    console.log("Respuesta completa de geolocalización:", geoData.time_zone.dst_start.utc_time, geoData.time_zone.name,);

    statusElement.textContent = "Información cargada correctamente.";
  } catch (error) {
    console.error("Error:", error);

    ipElement.textContent = "No disponible";
    continentElement.textContent = "No disponible";
    cityElement.textContent = "No disponible";

    statusElement.textContent = "Ocurrió un error al consultar las APIs.";
  }
}

btnActualizar.addEventListener("click", cargarInformacionIP);
window.addEventListener("DOMContentLoaded", cargarInformacionIP);