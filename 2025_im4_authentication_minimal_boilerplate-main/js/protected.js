async function checkAuth() {
  try {
    const response = await fetch("/api/protected.php", {
      credentials: "include",
    });

    if (response.status === 401) {
      window.location.href = "/login.html";
      return false;
    }

    const result = await response.json();

    // Optional: Weiterleitung nach erfolgreicher Authentifizierung
    // window.location.href = "/home.html";

    // Oder: Zeige Benutzerdaten auf dieser Seite an
    const protectedContent = document.getElementById("protectedContent");
    protectedContent.innerHTML = `
      <h2>Willkommen, ${result.email}!</h2>
      <p>Deine Benutzer-ID ist: ${result.user_id}</p>
    `;

    return true;
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
}

// Check auth when page loads
window.addEventListener("load", checkAuth);
