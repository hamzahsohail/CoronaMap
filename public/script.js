updateMap();

let infected_arr = [];

async function updateMap() {
  console.log("Starting upadate Map");

  await fetch("../data.json")
    .then((response) => response.json())
    .then((res) => {
      res.data.forEach((element) => {
        latitude = element.latitude;
        longitude = element.longitude;

        recovered = element.recovered;
        infected = element.infected;

        if (infected < 2370) {
          color = "green";
        } else if (infected < 4740 && infected > 2370) {
          color = "yellow";
        } else if (infected < 7111 && infected > 4740) {
          color = "orange";
        } else {
          color = "red";
        }

        // Create a new marker.
        const marker = new mapboxgl.Marker({
          color: color,
        })
          .setLngLat([longitude, latitude])
          .addTo(map)
          .setPopup(popup);

        // Create the Popup
        var popup = new mapboxgl.Popup({
          offset: [0, -28],
          closeButton: false,
        }).setText("Recovered: " + recovered);

        const markerDiv = marker.getElement();
        markerDiv.addEventListener("mouseenter", () => {
          marker.setPopup(popup);
          marker.togglePopup();
        });
        markerDiv.addEventListener("mouseleave", () => marker.togglePopup());
      });
    });
  console.log("Ending upadate Map");
}

setInterval(updateMap, 20000);
