let isOpen = false;

function toggleHamburger() {
  let hamburgerNavContainer = document.getElementById("hamburger-nav-container");

  if (!isOpen) {
    //artinya humber sudah di click
    hamburgerNavContainer.style.display = "flex";
    isOpen = true; //si icon dia terbuka atau terclik
  } else {
    hamburgerNavContainer.style.display = "none";
    isOpen = false;
  }
}
// 1. kondisi awal dia none
// 2. kondisi di click -> isopen true
// 3 diklik 1x lagi dia bakaln membaca perbahan dari si isOpen
// 4. Apa yang terjadi ketika kondisinya adalah
// - true -> membuat display flex
// - false -> display none
//dieksekusi per baris
