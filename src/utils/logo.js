const logo = () => {

document.querySelector('.header__logo-image').addEventListener('mouseover', function() {
    this.src = '/bunyalogopeace.png'; // Change to the hover logo
  });
  
  document.querySelector('.header__logo-image').addEventListener('mouseout', function() {
    this.src = '/bunyalogo.png'; // Change back to the original logo
  });
}

  export default logo;