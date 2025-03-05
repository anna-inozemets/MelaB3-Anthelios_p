// main variables that used in code
const slideContainer = document.querySelector('.slide__container')
const rotateBlock = document.querySelector('.rotate__block');
const agreementButton = document.querySelector('.agree');
const nextSlideButton = document.querySelector('.arrow--next');
const prevSlideButton = document.querySelector('.arrow--prev');

// additional variables for timeout Ids
let nextButtonTimeout;
let prevButtonTimeout;
let lastSlideActionTimeout;

// additional variables for arrows
const hiddenArrowClass = 'hidden';
let nextArrowDelay = 0;

// additional varibles for slides
const totalSlideAmount = 16;
const pathNames = Array.from(
  { length: totalSlideAmount }, (_, i) => ({ count: i + 1, pathName:`./slides/slide--${i + 1}.html` })
);

// additional function for detecting correct font-size
function heightDetect(percent) {
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  return (percent * (height - 6)) / 100;
}
function widthDetect(percent) {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  return (percent * width) / 100;
}
function setResponsiveFontSize() {
  $('.slide__container').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
  $('.arrows').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
}

// function for action after last slide
function lastSlideAction() {
  let id = $('#presentation', window.parent.document).attr('data-id');
  let $url = $('#presentation', window.parent.document).attr('data-request-url');
  let href = $('#presentation', window.parent.document).attr('data-href');
  let $token = $('meta[name="csrf-token"]', window.parent.document).attr('content');
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $token
    }
  });
  $.ajax({
    type: "POST",
    url: $url,
    data: {"id": id},
    success: function (data) {
      if (data !== false) {
        parent.location.href = href;
      }
    },
    error: function (data) {
      console.log(data);
    }
  });
}

// function that animate number from 0 to correct num
function animateNumber(delay) {
  const allElements = document.querySelectorAll('[data-number]');

  allElements.forEach(el => {
    const targetNumber = Number(el.getAttribute('data-number'));

    gsap.to(el, {
      duration: 2.5,
      innerHTML: targetNumber,
      delay,
      onUpdate: () => {
        el.innerHTML = Math.round(el.innerHTML);
      },
      onComplete: () => {
        el.innerHTML = targetNumber;
      }
    });
  });
}

function controlFourthSlideCards() {
  $('.slide--4__block-inner').on('click', function() {
    $(this).closest('.slide--4__block').addClass('active');

    if ($('.slide--4__block.active').length > 2) {
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 1500);
    }
  });
}

function controlSixthSlideCards() {
  $('.slide--6__decorator').on('click', function() {
    let bulletValue = $(this).data('bullet');
  
    $('.slide--6__animate').each(function() {
      if ($(this).data('bullet-block') == bulletValue) {
        $(this).addClass('visible');
      }
    });

    if ($('.slide--6__animate.visible').length > 8) {
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 1500);
    }
  })
}

function controlFifteenthCards() {
  $('.slide--15__left .component .button').on('click', function() {
    let bulletValue = $(this).data('bullet');
    $(this).addClass('hidden')
  
    $('.slide--15__left .component p').each(function() {
      if ($(this).data('bullet-block') == bulletValue) {
        $(this).addClass('visible');
      }
    });

    if ($('.slide--15__left .component p.visible').length > 5) {
      $('.slide--15__left p.plus').removeClass('hidden')
    }
  });

  $('.slide--15__left p.plus').on('click', function() {
    $('.slide--15__left h3, .slide--15__left .texts').removeClass('hidden');
    nextButtonTimeout = setTimeout(() => {
      $(nextSlideButton).removeClass(hiddenArrowClass);
      $(prevSlideButton).removeClass(hiddenArrowClass);
    }, 1500);
  })
}

// object that store manipulations with slides
const slideActions = {
  1: () => {
    $('.arrow--next').addClass('arrow--white');
    $('.arrow--prev').addClass('arrow--white');
    gsap.from('.slide--1__left h2', { opacity: 0, duration: 0.75, delay: 1, scale: 0 });
    gsap.from('.slide--1__left h3', { opacity: 0, duration: 0.75, delay: 1.2, y: '75%' });
    gsap.from('.slide--1__right-content', { opacity: 0, duration: 0.75, delay: 1.8, x: '75%' });
    nextArrowDelay = 2.8;
  },
  2: () => {
    $('.arrow--next').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--light-grey');
    $('.arrow--prev').removeClass('arrow--white');
    gsap.from('.slide--2__img img', { opacity: 0, duration: 1, delay: 1, scale: 0 });
    animateNumber(1);
    nextArrowDelay = 3.7;
  },
  3: () => {
    $('.arrow--next').removeClass('arrow--white');
    $('.arrow--next').addClass('arrow--light-grey');
    $('.arrow--prev').removeClass('arrow--white');
    gsap.from('.slide--3_img img', { opacity: 0, duration: 0.75, delay: 1, x: '75%' });
    animateNumber(1);
    nextArrowDelay = 3.7;
  },
  4: () => {
    clearTimeout(nextButtonTimeout);
    clearTimeout(prevButtonTimeout);
    $(nextSlideButton).addClass(hiddenArrowClass);
    $(prevSlideButton).addClass(hiddenArrowClass);
    $('.arrow--next').addClass('arrow--white');
    $('.arrow--next').removeClass('arrow--light-grey');
    $('.arrow--prev').addClass('arrow--white');
    gsap.from('.slide--4__block.first', { opacity: 0, duration: 0.75, delay: 1, y: '30%', x: '50%' });
    gsap.from('.slide--4__block.second', { opacity: 0, duration: 0.75, delay: 1.3, y: '30%', x: '50%' });
    gsap.from('.slide--4__block.third', { opacity: 0, duration: 0.75, delay: 1.6, y: '30%', x: '50%' });
    controlFourthSlideCards();
  },
  5: () => {
    $('.arrow--next').removeClass('arrow--white');
    $('.arrow--prev').removeClass('arrow--white');
    gsap.from('.slide--5__img img', { opacity: 0, duration: 0.75, delay: 1, y: '75%' });
    animateNumber(1);
    nextArrowDelay = 3.7;
  },
  6: () => {
    clearTimeout(nextButtonTimeout);
    clearTimeout(prevButtonTimeout);
    $(nextSlideButton).addClass(hiddenArrowClass);
    $(prevSlideButton).addClass(hiddenArrowClass);
    $('.arrow--next').addClass('arrow--white');
    controlSixthSlideCards();
  },
  7: () => {
    $('.arrow--next').removeClass('arrow--white');
    $('.arrow--prev').removeClass('arrow--white');
    gsap.from('.slide--7__left-content', { opacity: 0, duration: 0.75, delay: 1, x: '-75%' });
    gsap.from('.slide--7__right-content', { opacity: 0, duration: 0.75, delay: 1, x: '75%' });
    nextArrowDelay = 2;
  },
  8: () => {
    $('.arrow--next').addClass('arrow--white');
    $('.arrow--prev').addClass('arrow--white');
    gsap.from('.slide--8__left p', { opacity: 0, duration: 0.75, delay: 1, scale: 0 });
    gsap.from('.slide--8__left li.first', { opacity: 0, duration: 0.75, delay: 1.5, y: '50%' });
    gsap.from('.slide--8__left li.second', { opacity: 0, duration: 0.75, delay: 1.8, y: '50%' });
    gsap.from('.slide--8__left li.third', { opacity: 0, duration: 0.75, delay: 2.1, y: '50%' });
    gsap.from('.slide--8__left li.fourth', { opacity: 0, duration: 0.75, delay: 2.4, y: '50%' });
    nextArrowDelay = 3.4;
  },
  9: () => {
    $('.arrow--next').addClass('arrow--white');
    $('.arrow--next').removeClass('arrow--light-grey');
    gsap.from('.slide--9__content img.bottle', { opacity: 0, duration: 0.75, delay: 1, scale: 0 });
    gsap.from('.slide--9__content p, .slide--9__content h2.first', { opacity: 0, duration: 0.75, delay: 1.5, y: 35 });
    gsap.from('.slide--9__content h3, .slide--9__content h2.second', { opacity: 0, duration: 0.75, delay: 1.8, y: 35 });
    nextArrowDelay = 2.8;
  },
  10: () => {
    $('.arrow--next').removeClass('arrow--white');
    $('.arrow--next').addClass('arrow--light-grey');
    gsap.from('.slide--10 img.decorator', { opacity: 0, duration: 0.75, delay: 1, scale: 0 });
    nextArrowDelay = 2;
  },
  11: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').addClass('arrow--light-grey');
    gsap.from('.slide--11__content img.formula', { opacity: 0, duration: 0.75, delay: 1, y: '50%' });
    gsap.from('.slide--11__block.first', { opacity: 0, duration: 0.75, delay: 1.5, y: '40%' });
    gsap.from('.slide--11__block.second', { opacity: 0, duration: 0.75, delay: 1.8, y: '40%' });
    gsap.from('.slide--11__block.third', { opacity: 0, duration: 0.75, delay: 2.1, y: '40%' });
    nextArrowDelay = 3.1;
  },
  12: () => {
    $('.arrow--next').addClass('arrow--white');
    $('.arrow--next').removeClass('arrow--light-grey');
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--prev').removeClass('arrow--light-grey');
    gsap.from('.slide--12__left img', { opacity: 0, duration: 0.75, delay: 1, y: '50%' });
    gsap.from('.slide--12__left p', { opacity: 0, duration: 0.75, delay: 1.4, y: '40%' });
    nextArrowDelay = 2.4;
  },
  13: () => {
    $('.arrow--prev').addClass('arrow--light-grey');
    gsap.from('.slide--13__content p.new, .slide--13__content h2', { opacity: 0, duration: 0.75, delay: 1, y: '35%' });
    gsap.from('.slide--13__content h3', { opacity: 0, duration: 0.75, delay: 1.4 });
    gsap.from('.slide--13__content .line', { opacity: 0, duration: 0.75, delay: 1.4, scaleX: 0 });
    gsap.from('.slide--13__content .formula', { opacity: 0, duration: 0.75, delay: 1.8, y: '35%' });
    gsap.from('.slide--13__content .skins div.first', { opacity: 0, duration: 0.75, delay: 2.2, x: '15%' });
    gsap.from('.slide--13__content .skins div.second', { opacity: 0, duration: 0.75, delay: 2.4, x: '15%' });
    gsap.from('.slide--13__content .skins div.third', { opacity: 0, duration: 0.75, delay: 2.6, x: '15%' });
    gsap.from('.slide--13__content .skins div.fourth', { opacity: 0, duration: 0.75, delay: 2.8, x: '15%' });
    gsap.from('.slide--13__content .skins div.fifth', { opacity: 0, duration: 0.75, delay: 3, x: '15%' });
    gsap.from('.slide--13__content .skins div.sixth', { opacity: 0, duration: 0.75, delay: 3.2, x: '15%' });
    gsap.from('.slide--13__content .texts p.first', { opacity: 0, duration: 0.75, delay: 2.2, x: '15%' });
    gsap.from('.slide--13__content .texts p.second', { opacity: 0, duration: 0.75, delay: 2.6, x: '15%' });
    gsap.from('.slide--13__content .texts p.third', { opacity: 0, duration: 0.75, delay: 3, x: '15%' });
    nextArrowDelay = 4.2;
  },
  14: () => {
    $('.arrow--prev').removeClass('arrow--light-grey');
    gsap.from('.slide--14__content .blocks .block.first', { opacity: 0, duration: 0.75, delay: 1, x: '-35%' });
    gsap.from('.slide--14__content .blocks .block.second', { opacity: 0, duration: 0.75, delay: 1, x: '35%' });
    gsap.from('.slide--14__content .graphics img', { opacity: 0, duration: 0.75, delay: 1.5, x: '-35%' });
    gsap.from('.slide--14__content .graphics p', { opacity: 0, duration: 0.75, delay: 1.5, x: '35%' });
    nextArrowDelay = 2.5;
  },
  15: () => {
    clearTimeout(lastSlideActionTimeout);
    clearTimeout(nextButtonTimeout);
    clearTimeout(prevButtonTimeout);
    $(nextSlideButton).addClass(hiddenArrowClass);
    $(prevSlideButton).addClass(hiddenArrowClass);
    $('.arrow--prev').removeClass('arrow--white');
    controlFifteenthCards();
  },
  16: () => {
    $('.arrow--prev').addClass('arrow--white');
    gsap.from('.slide--16__block.first', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--16__block.second', { opacity: 0, duration: 0.75, delay: 1.4 });
    gsap.from('.slide--16__block.third', { opacity: 0, duration: 0.75, delay: 1.8 });
    lastSlideActionTimeout = setTimeout(() => {
      lastSlideAction();
    }, 7.5 * 1000);
  },
}
// function that add animation for element
function animateSlide(slideNum = 1) {
  gsap.from('.slide', { opacity: 0, duration: 0.75 });

  slideActions[slideNum]();
}
// function that detect oriental of device
function updateRotateBlockVisibility() {
  const isPortrait = window.matchMedia('(orientation: portrait)').matches;

  $(rotateBlock).toggleClass('visible', isPortrait);
}
// function that load slide without reloading page
async function loadComponent(componentPathName, slideNum) {
  const response = await fetch(componentPathName);
  const data = await response.text();

  slideContainer.innerHTML = data;
  animateSlide(slideNum);
}
// function that update info about prev/next button
function updateNavigationButtons(currentSlide) {
  clearTimeout(nextButtonTimeout);
  clearTimeout(prevButtonTimeout);

  $(nextSlideButton).addClass(hiddenArrowClass);
  $(prevSlideButton).addClass(hiddenArrowClass);

  switch (currentSlide) {
    case 0:
      break;
    case 1:
      $(nextSlideButton).removeClass(hiddenArrowClass);
      break;
    case totalSlideAmount:
      $(prevSlideButton).removeClass(hiddenArrowClass);
      break;
    default:
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, nextArrowDelay * 1000);
  }
}
// function that change slide on the screen
async function changeSlide(direction) {
  const currentSlideNum = slideContainer.getAttribute('data-current-slide');

  let newSlideNum;

  if (direction === 'next') {
    newSlideNum = Number(currentSlideNum) + 1;
  } else if (direction === 'prev') {
    newSlideNum = Number(currentSlideNum) - 1;
  }

  const { pathName } = pathNames.find(pathNameInfo => pathNameInfo.count === +newSlideNum);

  await loadComponent(pathName, newSlideNum);

  slideContainer.setAttribute('data-current-slide', newSlideNum);

  console.log(newSlideNum)
  if (newSlideNum !== 4 && newSlideNum !== 6 && newSlideNum !== 15) {
    updateNavigationButtons(newSlideNum);
  }
}

//window and document listeners
$(document).ready(function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('resize', function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('orientationchange', function () {
  updateRotateBlockVisibility();
});

// button listeners
$(agreementButton).on('click', () => {
  loadComponent(pathNames[0].pathName);
  slideContainer.setAttribute('data-current-slide', 1);
  updateNavigationButtons(1);
});
$(nextSlideButton).on('click', () => {
  changeSlide('next')
})
$(prevSlideButton).on('click', () => {
  changeSlide('prev')
});
