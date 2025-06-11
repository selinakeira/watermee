document.addEventListener("DOMContentLoaded", async () => {
    const plantName = "Thyme"; // Später dynamisch machen (z. B. über URL oder Dropdown)
  
    try {
      const response = await fetch(`api/plant.php?name=${encodeURIComponent(plantName)}`);
      const result = await response.json();
  
      if (result.status === "success") {
        const data = result.data;
  
        document.getElementById("plant-name").textContent = data.name;
        document.getElementById("plant-info").textContent = data.information;
        document.getElementById("watering-guide").textContent = `${data.watering_guide} (alle ${data.frequency_in_days} Tage)`;
        document.getElementById("light-location").textContent = data.light_location;
      } else {
        document.getElementById("plant-name").textContent = "Pflanze nicht gefunden.";
      }
    } catch (err) {
      console.error(err);
      document.getElementById("plant-name").textContent = "Fehler beim Laden der Pflanzendaten.";
    }
  });
  