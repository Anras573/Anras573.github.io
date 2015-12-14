toggleNav = function() {
  var nav = document.getElementById('navbar');
  if (nav.style.display !== 'none' && nav.style.display !== '') {
    nav.style.display = 'none';
  } else {
    nav.style.display = 'block';
  }
};
