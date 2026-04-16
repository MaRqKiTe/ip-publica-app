const ipElement = document.getElementById("ip");
const officialCountryElement = document.getElementById("officialCountry");
const countryElement = document.getElementById("country");
const capitalElement = document.getElementById("capital");
const cityElement = document.getElementById("city");
const longitudeElement = document.getElementById("longitude");
const latitudeElement = document.getElementById("latitude");
const timezoneElement = document.getElementById("timezone");
const currencyElement = document.getElementById("currency");
const countryFlagElement = document.getElementById("countryFlag");
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

function limpiarPantalla() {
  ipElement.textContent = "Cargando...";
  officialCountryElement.textContent = "Cargando...";
  countryElement.textContent = "Cargando...";
  capitalElement.textContent = "Cargando...";
  cityElement.textContent = "Cargando...";
  longitudeElement.textContent = "Cargando...";
  latitudeElement.textContent = "Cargando...";
  timezoneElement.textContent = "Cargando...";
  currencyElement.textContent = "Cargando...";
  countryFlagElement.src = "";
  countryFlagElement.alt = "Bandera del país";
}

function mostrarError() {
  ipElement.textContent = "No disponible";
  officialCountryElement.textContent = "No disponible";
  countryElement.textContent = "No disponible";
  capitalElement.textContent = "No disponible";
  cityElement.textContent = "No disponible";
  longitudeElement.textContent = "No disponible";
  latitudeElement.textContent = "No disponible";
  timezoneElement.textContent = "No disponible";
  currencyElement.textContent = "No disponible";
  countryFlagElement.src = "";
}

async function cargarInformacionIP() {
  try {
    limpiarPantalla();
    statusElement.textContent = "Consultando información...";

    const ipData = await obtenerIPPublica();
    const ip = ipData.ip;

    const geoData = await obtenerGeolocalizacion(ip);

    ipElement.textContent = geoData.ip;
    officialCountryElement.textContent = geoData.location.country_name_official;
    countryElement.textContent = geoData.location.country_name;
    capitalElement.textContent = geoData.location.country_capital;
    cityElement.textContent = geoData.location.city;
    longitudeElement.textContent = geoData.location.longitude;
    latitudeElement.textContent = geoData.location.latitude;
    timezoneElement.textContent = geoData.time_zone.name;
    currencyElement.textContent = `${geoData.currency.name} (${geoData.currency.code}) - ${geoData.currency.symbol}`;

    countryFlagElement.src = geoData.location.country_flag;
    countryFlagElement.alt = `Bandera de ${geoData.location.country_name}`;

    console.log("Respuesta completa de geolocalización:", geoData);

    statusElement.textContent = "Información cargada correctamente.";
  } catch (error) {
    console.error("Error:", error);
    mostrarError();
    statusElement.textContent = "Ocurrió un error al consultar las APIs.";
  }
}

btnActualizar.addEventListener("click", cargarInformacionIP);
window.addEventListener("DOMContentLoaded", cargarInformacionIP);