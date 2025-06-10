// register.js
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const user_name = document.getElementById("user_name").value.trim();

    if (!email || !password || !user_name) {
      alert("Bitte alle Felder ausfüllen.");
      return;
    }

    try {
      const response = await fetch("api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, password, user_name }),
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("Registrierung erfolgreich! Du kannst dich jetzt einloggen.");
        window.location.href = "login.html";
      } else {
        alert(result.message || "Registrierung fehlgeschlagen.");
      }
    } catch (error) {
      console.error("Fehler:", error);
      alert("Es ist ein Fehler aufgetreten.");
    }
  });