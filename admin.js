import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

if (localStorage.getItem("isAdmin") !== "true") {
  alert("Access denied");
  location.href = "index.html";
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.removeItem("isAdmin");
    location.href = "index.html";
  };
}

const container = document.getElementById("admin-reviews");

async function loadReviews() {
  container.innerHTML = "<p>Loading reviews...</p>";

  const snapshot = await getDocs(collection(window.db, "reviews"));

  if (snapshot.empty) {
    container.innerHTML = "<p>No reviews yet</p>";
    return;
  }

  container.innerHTML = "";

  snapshot.forEach(doc => {
    const r = doc.data();

    const div = document.createElement("div");
    div.className = "review";

    div.innerHTML = `
      <p><strong>${r.name || "Anonim"}</strong></p>
      <p>⭐ Rating: ${r.rating}</p>
      <p>${r.text}</p>
    `;

    container.appendChild(div);
  });
}

loadReviews();
