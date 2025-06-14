document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const plantId = params.get("id");

  if (!plantId) {
    document.getElementById("plant-name").textContent = "No plant ID provided.";
    return;
  }

  try {
    const response = await fetch(`api/getplantbyid.php?id=${plantId}`);
    const result = await response.json();

    if (result.status === "success") {
      const data = result.data;

      document.getElementById("plant-name").textContent = data.name;
      document.getElementById("plant-info").textContent = data.information;
      document.getElementById("watering-guide").textContent = data.watering_guide;
      document.getElementById("light-location").textContent = data.light_location;
      document.getElementById("frequency").textContent = data.frequency_in_days;
    } else {
      document.getElementById("plant-name").textContent = "Plant not found.";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("plant-name").textContent = "Error loading plant data.";
  }
});

function addPlant() {
  let URL = new URLSearchParams(window.location.search);
  console.log('Trying to add plant:', URL.get('id'));
  fetch('api/addplant.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: URL.get('id') })
  })
  .then(response => response.text())
  .then(text => {
    try {
      const data = JSON.parse(text);
      if (data.success) {
        console.log('Plant added successfully!');
      } else {
        console.error('Error adding plant:', data.message);
      }
    } catch (e) {
      console.error('Response is not valid JSON:', text);
    }
  })
  .catch(error => {
    console.error('Network error:', error);
  });

  alert("Plant added successfully!"); // User feedback
}
