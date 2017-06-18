export default class Navbar {

  constructor(elem) {
    this.el = elem;
    this.button = this.el.querySelector('#navButton');
    this.navbar = this.el.querySelector('#navbar');
    this.init(elem);
    return this
  }

  init(elem) {
    const self = this;
    self.button.addEventListener('click', (event) => {
      self.toggleNav(event);
    });
  }

  toggleNav(event) {
    if (event) event.preventDefault();
    const self = this;
    if (self.navbar.style.display !== 'none' && self.navbar.style.display !== '') {
      self.navbar.style.display = 'none';
    } else {
      self.navbar.style.display = 'block';
    }
  }
}
