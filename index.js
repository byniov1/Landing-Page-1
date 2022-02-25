const hamburger = document.querySelector('.navigation__hamburger')
const nav = document.querySelector('nav')
const overlayPart = document.querySelector('.overlay')
const navigationContent = document.querySelector('.navigation__content')

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('is-active');
  nav.classList.toggle('is-active');
  overlayPart.classList.toggle('on');
  navigationContent.classList.toggle('visible');
})



const fadeElements = document.querySelectorAll('.fade')
// console.log(fadeElements);

const options = {
  // root: null
  treshold: 0,
  rootMargin: '0px 0px -150px 0px'
}

const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    else {
      entry.target.classList.add('fade-in')
    }
  })
}, options)

fadeElements.forEach(element => {
  observer.observe(element)
})


const track = document.querySelector('.carousel__track')
const slides = Array.from(track.children)

const nextButton = document.querySelector('.carousel__button--right')
const prevButton = document.querySelector('.carousel__button--left')
const dotsNav = document.querySelector('.carousel__nav')
const dots = Array.from(dotsNav.children)

const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slidesSize);


// slides[0].style.left = 0;
// slides[1].style.left = slideWidth + 'px';
const setSlidePostion = (slide, index) => {
  slide.style.left = slideWidth * index + 'px'
}

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide')
  targetSlide.classList.add('current-slide')
}


const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('courent-slide')
  targetDot.classList.add('courent-slide')
}

const hideShowArrows = (targetIndex, slides, prevButton, nextButton) => {

  // oglnie jest pomysł żeby to zmienić w sensie wywalić overflow, niekatywnym elementom dać opacity a jak dojedziemy do końca do żeby następny element był ten z początku / końca wydaje mni się że jest to do zrobienia ale to na spokojnie

  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden')
    nextButton.classList.remove('is-hidden')
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden')
    nextButton.classList.add('is-hidden')
  } else {
    prevButton.classList.remove('is-hidden')
    nextButton.classList.remove('is-hidden')
  }
}

slides.forEach(setSlidePostion);
// console.log(track.children);


nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;

  const currentDot = dotsNav.querySelector('.courent-slide');
  const nextDot = currentDot.nextElementSibling;

  const nextIndex = slides.findIndex(slide => slide === nextSlide)

  moveToSlide(track, currentSlide, nextSlide)
  updateDots(currentDot, nextDot)

  hideShowArrows(nextIndex, slides, prevButton, nextButton)
})


prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;

  const currentDot = dotsNav.querySelector('.courent-slide');
  const prevDot = currentDot.previousElementSibling;

  const prevIndex = slides.findIndex(slide => slide === prevSlide)

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot)

  hideShowArrows(prevIndex, slides, prevButton, nextButton)
})


dotsNav.addEventListener('click', e => {
  //what indicator was clicked on
  const targetDot = e.target.closest('button');

  if (!targetDot) return

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.courent-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot)
  const targetSlide = slides[targetIndex]

  moveToSlide(track, currentSlide, targetSlide)
  updateDots(currentDot, targetDot)

  // oglnie jest pomysł żeby to zmienić w sensie wywalić overflow, niekatywnym elementom dać opacity a jak dojedziemy do końca do żeby następny element był ten z początku / końca wydaje mni się że jest to do zrobienia ale to na spokojnie
  hideShowArrows(targetIndex, slides, prevButton, nextButton)

})





