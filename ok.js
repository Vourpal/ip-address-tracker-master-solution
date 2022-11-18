const formSubmit = document.querySelector("#formMabinogi");

var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
let obtainInformation = async (ipAddress) => {
  return axios.get(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_2FrwWDLWRb8brqVE0jXoROJTsNVbf&ipAddress=${ipAddress}`
  );
};

formSubmit.addEventListener("submit", async (e) => {
  e.preventDefault();
  let ipAddress = document.querySelector("#searchBar").value;
  const res = await obtainInformation(ipAddress);
  let lat = res.data.location.lat
  let lang = res.data.location.lng
  document.querySelector("#locationChange").innerText = res.data.location.city;
  document.querySelector("#timezoneChange").innerText =
  res.data.location.timezone;
  document.querySelector("#ispChange").innerText = res.data.isp;
  document.querySelector("#ipAdressChange").innerText = res.data.ip;
  map.panTo([lat,lang])
  L.marker([lat, lang]).addTo(map)
    .bindPopup('Location')
    .openPopup(); 
});

