//! All done through leaflet and geo.IPify

const ipForm = document.querySelector(".form-group");
const ipFormField = document.querySelector(".ip-input");
const ipText = document.querySelector(".ip");
const locationText = document.querySelector(".location");
const timezoneText = document.querySelector(".timezone");
const ispText = document.querySelector(".isp");

let lat = 0;
let lng = 0;

// IP Input data
function updateText(data) {
  ipText.textContent = data.ip;
  locationText.textContent = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
  timezoneText.textContent = `UTC${data.location.timezone}`;
  ispText.textContent = `${data.isp}`;
}

// https://leafletjs.com/examples/quick-start/
function updateLocation(data) {
  lat = data.location.lat;
  lng = data.location.lng;
  map.setView([lat, lng], 13);
  L.marker([lat, lng], { icon: myIcon }).addTo(map).setOpacity(1);
}

// fetch device ip and location
// https://geo.ipify.org/
function getIP(ip = "") {
  axios
    .get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_f9zMFWYxAAAh4DWF1ez2IaBRMPHYg&ipAddress=${ip}`
    )
    .then((res) => {
      updateText(res.data);
      updateLocation(res.data);
      console.log("Axios successful!");
    })
    .catch((err) => {
      console.log(err);
    });
}

getIP();

ipForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getIP((ip = ipFormField.value));
  L.marker.setOpacity(0);
});

// https://leafletjs.com/examples/quick-start/
let map = L.map("map").setView([lat, lng], 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoidWpqd2FsMzEzIiwiYSI6ImNreWd5cmM1eDFnaDQydnFocm9wczNhOGEifQ.FrFpraT7DXIRpuW177e9vg",
  }
).addTo(map);

// https://leafletjs.com/reference.html#icon
let myIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [24, 36],
  iconAnchor: [12, 36],
});
