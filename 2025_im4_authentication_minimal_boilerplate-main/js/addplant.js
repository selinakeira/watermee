let Plant=null;



document.addEventListener("DOMContentLoaded", async () => {
    const searchInput = document.getElementById("searchInput");
    const plantList = document.getElementById("plantList");
    const plantDetail = document.getElementById("plantDetail");
  
    let plants = [];
  
    // Pflanzen von der API laden
    async function loadPlants() {
      try {
        const res = await fetch("api/get-plants.php");
        const result = await res.json();
  
        if (result.status === "success") {
          plants = result.data;
          renderList(plants);
        } else {
          plantList.innerHTML = "<p>Keine Pflanzen gefunden.</p>";
        }
      } catch (err) {
        console.error(err);
        plantList.innerHTML = "<p>Fehler beim Laden.</p>";
      }
    }
  
    function renderList(filteredPlants) {
      plantList.innerHTML = "";
  
      filteredPlants.forEach(plant => {
        const card = document.createElement("div");
        card.className = "plant-card";
        card.textContent = plant.name;
        card.addEventListener("click", () => showDetails(plant));
        plantList.appendChild(card);
      });



    }
    function showDetails(plant) {
      document.getElementById("detail-name").textContent = plant.name;
      document.getElementById("detail-info").textContent = plant.information;
      document.getElementById("detail-watering").textContent = `${plant.watering_guide} (alle ${plant.frequency_in_days} Tage)`;
      document.getElementById("detail-light").textContent = plant.light_location;

      Plant= plant; // Pflanze für spätere Verwendung speichern
    
      // Pflanzendetails anzeigen
      plantDetail.classList.remove("hidden");
      plantDetail.scrollIntoView({ behavior: "smooth" });
    
      // ➕ Button sichtbar machen
      document.getElementById("addPlantButton")
    }
    
  
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filtered = plants.filter(p =>
        p.name.toLowerCase().includes(searchTerm)
      );
      renderList(filtered);
    });
  
    loadPlants();
  });



  function addPlant(){
   console.log('Versuche Pflanze hinzuzufügen:', Plant.name);
    fetch('api/addplant.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: Plant.name})
    })
    .then(response => response.text()) // <-- erst mal als Text lesen
    .then(text => {
      try {
        const data = JSON.parse(text); // dann versuchen in JSON umzuwandeln
        if (data.success) {
          console.log('Pflanze erfolgreich hinzugefügt!');
        } else {
          console.error('Fehler beim Hinzufügen:', data.message);
        }
      } catch (e) {
        console.error('Antwort ist kein gültiges JSON:', text);
      }
    })
    .catch(error => {
      console.error('Netzwerkfehler:', error);
    });
  }
  

  