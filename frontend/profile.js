const username = localStorage.getItem("username");
const role = localStorage.getItem("role"); // seeker / helper

document.getElementById("username").value = username;

// show helper-only fields
if (role === "helper") {
  document.getElementById("helperFields").classList.remove("hidden");
}

// load saved profile
const savedProfile = JSON.parse(
  localStorage.getItem(`profile_${username}`)
);

if (savedProfile) {
  document.getElementById("pronouns").value = savedProfile.pronouns || "";
  document.getElementById("bio").value = savedProfile.bio || "";
  document.getElementById("experience").value = savedProfile.experience || "";
}

function saveProfile() {
  const profile = {
    username,
    pronouns: document.getElementById("pronouns").value,
    bio: document.getElementById("bio").value,
    experience: role === "helper"
      ? document.getElementById("experience").value
      : null
  };

  localStorage.setItem(
    `profile_${username}`,
    JSON.stringify(profile)
  );

  alert("Profile saved 💙");
}

