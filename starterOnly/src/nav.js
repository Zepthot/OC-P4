function editNav() {
  let x = document.getElementById("myTopnav");
  x
    ? x.className === "topnav"
      ? (x.className += " responsive")
      : (x.className = "topnav")
    : console.error("Element with ID 'myTopnav' not found.");
}
