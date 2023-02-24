document.addEventListener("DOMContentLoaded", function() {
    const homeButton = document.getElementById("home-button");
    homeButton.onclick = function() {
      window.location.href = "/";
    }
  });