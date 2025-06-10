// login.js
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Bitte fülle alle Felder aus.");
    return;
  }

  try {
    const response = await fetch("api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ email, password }),
    });

    const result = await response.json();

    if (result.status === "success") {
      alert("Login erfolgreich!");
      window.location.href = "protected.html"; // Weiterleitung nach erfolgreichem Login
    } else {
      alert(result.message || "Login fehlgeschlagen. Bitte versuche es erneut.");
    }
  } catch (error) {
    console.error("Fehler beim Login:", error);
    alert("Ein Fehler ist aufgetreten. Bitte später erneut versuchen.");
  }
});