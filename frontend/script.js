// ---------- SEEKER ----------

function needHelp() {
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

async function submitRequest() {
  const name = document.getElementById("name").value;
  const issue = document.getElementById("issue").value;

  await fetch("http://localhost:5000/api/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      seekerName: name,
      supporterId: 1,
      issue
    })
  });

  alert("Support request sent 💙");
  closeModal();
}

// ---------- SUPPORTER ----------

async function wantToHelp() {
  const res = await fetch("http://localhost:5000/api/requests");
  const requests = await res.json();

  const list = document.getElementById("requestList");
  list.innerHTML = "";

  if (requests.length === 0) {
    list.innerHTML = "<p>No requests yet.</p>";
  }

  requests.forEach(req => {
    const div = document.createElement("div");
    div.className = "request-card";

    div.innerHTML = `
      <div class="request-row">
        <span class="label">Name:</span>
        <span class="value">${req.seekerName}</span>
      </div>

      <div class="request-row">
        <span class="label">Issue:</span>
        <span class="value">${req.issue}</span>
      </div>

      <div class="request-row">
        <span class="label">Status:</span>
        <span class="value">${req.status}</span>
      </div>

      <button 
        class="primary-btn"
        ${req.status === "accepted" ? "disabled" : ""}
        onclick="acceptRequest(${req.id})">
        ${req.status === "accepted" ? "Accepted ✅" : "Accept"}
      </button>
    `;

    list.appendChild(div);
  });

  document.getElementById("supporterModal").classList.remove("hidden");
}

async function acceptRequest(id) {
  await fetch(`http://localhost:5000/api/request/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "accepted" })
  });

  wantToHelp(); // refresh UI
}

function closeSupporterModal() {
  document.getElementById("supporterModal").classList.add("hidden");
}
function goLogin(role) {
  localStorage.setItem("role", role);
  window.location.href = "login.html";
}





