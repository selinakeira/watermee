document.addEventListener("DOMContentLoaded", async () => {
    const plantList = document.getElementById("plantList");
  
    async function loadMyPlants() {
      try {
        const res = await fetch("api/getmyplants.php");
        const result = await res.json();
  
        if (result.status === "success") {
          const plants = result.data.map(p => {
            const dueInDays = calculateDueInDays(p);
            return { ...p, dueInDays: dueInDays };
          });
  
          plants.sort((a, b) => a.dueInDays - b.dueInDays);
  
          renderPlants(plants);
        } else {
          plantList.innerHTML = "<p>No plants found.</p>";
        }
      } catch (err) {
        console.error(err);
        plantList.innerHTML = "<p>Error loading your plants.</p>";
      }
    }
  
    function calculateDueInDays(plant) {
      const frequency = parseInt(plant.frequency_in_days, 10);
      const now = new Date();
  
      if (!plant.last_watered) return 0;
  
      const last = new Date(plant.last_watered);
      const nextDue = new Date(last);
      nextDue.setDate(last.getDate() + frequency);
  
      const diffTime = nextDue - now;
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }
  
    function renderPlants(plants) {
      plantList.innerHTML = "";
  
      if (plants.length === 0) {
        plantList.innerHTML = "<p>You haven’t added any plants yet.</p>";
        return;
      }
  
      plants.forEach(plant => {
        const div = document.createElement("div");
        div.className = "plant-item";
        div.onclick = () => {
          window.location.href = `plants.html?id=${plant.id}`;
        };
  
        // test

        //const name = document.createElement("p");
        //name.textContent = plant.name;
        //div.appendChild(name);

        // test

        const name = document.createElement("h2"); // statt <p>
name.textContent = plant.name;
name.className = "plant-title"; // Stilklasse für individuelles Styling
div.appendChild(name);

  
        if (plant.dueInDays <= 0) {
          const waterButton = document.createElement("button");
          waterButton.textContent = "💧 Water now";
          waterButton.className = "green-button";
          waterButton.onclick = (event) => {
            event.stopPropagation();
            waterPlant(plant.id);
          };
          div.appendChild(waterButton);
        } else {
          const info = document.createElement("p");
          info.textContent = `💧 Water in ${plant.dueInDays} day(s)`;
          info.className = "water-info";
          div.appendChild(info);
        }
  
        plantList.appendChild(div);
      });
    }
  
    async function waterPlant(plantid) {
      try {
        const res = await fetch("api/waterplant.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: plantid })
        });
  
        const result = await res.json();
        if (result.status === "success") {
          alert("Watering saved!");
          loadMyPlants();
        } else {
          alert("Error: " + result.message);
        }
      } catch (err) {
        console.error(err);
        alert("Network error while watering.");
      }
    }
  
    loadMyPlants();
  });
  
  // Burger-Menü
  function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("show");
  }
  