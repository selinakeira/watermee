let Plant = null;

document.addEventListener("DOMContentLoaded", async () => {
  const searchInput = document.getElementById("searchInput");
  const plantList = document.getElementById("plantList");
  const plantDetail = document.getElementById("plantDetail");

  let plants = [];

  // Pflanzen von der API laden
  async function loadPlants() {
    try {
      const res = await fetch("api/allplants.php");
      const result = await res.json();

      if (result.status === "success") {
        plants = result.data;
        renderList(plants);
      } else {
        plantList.innerHTML = "<p>No plants found.</p>";
      }
    } catch (err) {
      console.error(err);
      plantList.innerHTML = "<p>Error loading.</p>";
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
    window.location.href = `plants.html?id=${plant.id}`;
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

// Header-Burger-Menü für mobile Ansicht
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("show");
}
