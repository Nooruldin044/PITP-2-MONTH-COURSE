document.addEventListener("DOMContentLoaded", function () {
  const fetchButton = document.getElementById("fetchButton");
  const userDisplay = document.getElementById("userDisplay");
  const loadingMessage = document.getElementById("loadingMessage");
  const errorMessage = document.getElementById("errorMessage");

  const userName = document.getElementById("userName");
  const userImage = document.getElementById("userImage");
  const userEmail = document.getElementById("userEmail");
  const userPhone = document.getElementById("userPhone");
  const userLocation = document.getElementById("userLocation");
  const userDob = document.getElementById("userDob");

  async function fetchRandomUser() {
    loadingMessage.style.display = "block";
    userDisplay.style.display = "none";
    errorMessage.style.display = "none";

    try {
      // Make API request to randomuser.me
      const response = await fetch("https://randomuser.me/api/");

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      const user = data.results[0];

      displayUserData(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      loadingMessage.style.display = "none";
      errorMessage.style.display = "block";
    }
  }

  function displayUserData(user) {
    const fullName = `${user.name.first} ${user.name.last}`;
    userName.textContent = fullName;

    userImage.src = user.picture.large;
    userImage.alt = `Photo of ${fullName}`;

    userEmail.textContent = user.email;

    userPhone.textContent = user.phone;

    // Format and set location
    const location = `${user.location.city}, ${user.location.state}, ${user.location.country}`;
    userLocation.textContent = location;

    const dob = new Date(user.dob.date);
    const formattedDob = dob.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    userDob.textContent = `${formattedDob} (Age: ${user.dob.age})`;

    loadingMessage.style.display = "none";
    userDisplay.style.display = "block";
  }
  fetchButton.addEventListener("click", fetchRandomUser);
  fetchRandomUser();
});
