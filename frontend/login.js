localStorage.setItem("username", username);
localStorage.setItem("role", role);
// create empty profile if not exists
const profileKey = `profile_${username}`;

if (!localStorage.getItem(profileKey)) {
  localStorage.setItem(
    profileKey,
    JSON.stringify({
      username,
      role
    })
  );
}
