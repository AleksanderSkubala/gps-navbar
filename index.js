const navbar = document.querySelector('.nav');
const bar = document.querySelector('.nav__bar');
const items = document.querySelectorAll('.nav__item');
const parent = document.querySelector('.nav__list');

TweenMax.set(navbar, { transformPerspective: 400, transformOrigin: 'center center' });

const getActive = () => {
  return Array.from(items).indexOf(document.querySelector('.nav__item--active'));
};

const barInfo = () => {
  const { x: navX } = navbar.getBoundingClientRect();
  const { x: itemX, width: itemWidth } = items[getActive()].getBoundingClientRect();
  const { width: barWidth } = bar.getBoundingClientRect();

  const barPos = (itemX + itemWidth/2 - barWidth/2) - navX;

  return barPos;
};

const setBar = () => {
  TweenMax.set(bar, {x: barInfo()});
};

const itemClicked = (e) => {
  if (e.target.classList.contains('nav__item')) {
    items.forEach(item =>
      item.classList.remove('nav__item--active'));
    e.target.classList.add('nav__item--active');

    TweenMax.to(bar, .5, {x: barInfo()});
    TweenMax.to(e.target, .3, { scale: 1, ease: Back.easeOut.config(5) });
    TweenMax.to(navbar, .5, { rotationY: 0, rotationX: 0, rotationZ: 0 });
  }
};

const tilt = (e) => {
  if (e.target.classList.contains('nav__item')) {
    const pageX = e.pageX ? e.pageX : e.touches[0].pageX
    const axis = window.innerWidth/2;
    const rotate = pageX - axis;

    TweenMax.to(e.target, .2, { scale: .8, ease: Power4.easeOut });
    TweenMax.to(navbar, .5, { rotationY: 0.03*rotate, rotationX: -Math.abs(0.02 * rotate), rotationZ: '-0.1' });
  }
};

setBar();
window.addEventListener('resize', setBar);

parent.addEventListener('mousedown', tilt);
parent.addEventListener('touchstart', tilt);

parent.addEventListener('mouseup', itemClicked);
parent.addEventListener('touchend', itemClicked);
