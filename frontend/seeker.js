const username = localStorage.getItem("username");

// Show username
document.getElementById("name").innerText = username;

// Send request button
document.getElementById("sendRequestBtn").addEventListener("click", submitRequest);

async function submitRequest() {
  const issue = document.getElementById("issue").value.trim();
  if (!issue) return alert("Please describe your issue 💙");

  await fetch("http://localhost:5000/api/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      seekerName: username,
      supporterId: 1,
      issue
    })
  });

  document.getElementById("issue").value = "";
  loadMyRequests();
}

async function loadMyRequests() {
  const res = await fetch(`http://localhost:5000/api/requests/seeker/${username}`);
  const requests = await res.json();

  const box = document.getElementById("myRequests");
  box.innerHTML = "";

  const myRequests = requests.filter(r => r.seekerName === username);

  if (myRequests.length === 0) {
    box.innerHTML = "<p>No requests yet 💙</p>";
    return;
  }

  let hasAccepted = false;

  myRequests.forEach(r => {
    if (r.status === "accepted") hasAccepted = true;

    box.innerHTML += `
      <div class="request-card">
        <p><strong>Issue:</strong> ${r.issue}</p>
        <p><strong>Status:</strong> ${r.status}</p>
      </div>
    `;
  });

  // 🔥 Show chat ONLY when accepted
  const chatSection = document.getElementById("chatSection");
  if (hasAccepted) {
    chatSection.classList.remove("hidden");
  }
}

// Initial load
loadMyRequests();
