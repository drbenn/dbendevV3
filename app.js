// DARK TOGGLE

const sunMoonImage = document.getElementById('darkModeImage');
const aboutIcon = document.getElementById('aboutIcon');
const projectsIcon = document.getElementById('projectsIcon');
const blogIcon = document.getElementById('blogIcon');
const contactIcon = document.getElementById('contactIcon');
const githubIcon = document.querySelectorAll('.githubIcon');
const liveLinkIcon = document.querySelectorAll('.liveLinkIcon');

function darkModeToggle() {
  if (document.getElementById('darkModeCheckbox').checked) {
    document.body.classList.add('dark');
    sunMoonImage.style.filter = 'invert(1)';
    aboutIcon.style.filter = 'invert(1)';
    projectsIcon.style.filter = 'invert(1)';
    blogIcon.style.filter = 'invert(1)';
    contactIcon.style.filter = 'invert(1)';
    githubIcon.forEach((element) => (element.style.filter = 'invert(1)'));
    liveLinkIcon.forEach((element) => (element.style.filter = 'invert(1)'));
  } else {
    document.body.classList.remove('dark');
    sunMoonImage.style.filter = 'invert(0)';
    aboutIcon.style.filter = 'invert(0)';
    projectsIcon.style.filter = 'invert(0)';
    blogIcon.style.filter = 'invert(1)';
    contactIcon.style.filter = 'invert(0)';
    githubIcon.forEach((element) => (element.style.filter = 'invert(0)'));
    liveLinkIcon.forEach((element) => (element.style.filter = 'invert(0)'));
  }
}

// GSAP FORM

const containers = document.querySelectorAll('.input-container');
const form = document.querySelector('form');

const tl = gsap.timeline({ defaults: { duration: 1 } });

// Elastic Effect
containers.forEach((container) => {
  let input = container.querySelector('.input');
  let line = container.querySelector('.elastic-line');
  let placeholder = container.querySelector('.placeholder');

  input.addEventListener('focus', () => {
    if (!input.value) {
      tl.fromTo(line, { scale: 0 }, { scale: 1, ease: 'slow(0.9, 0.4, false)', duration: 0.5 });
      tl.to(line, { ease: 'bounce.out' }, '<50%');
      //Placeholder Shift
      tl.to(placeholder, { top: -25, left: 0, scale: 0.8, duration: 0.3, ease: 'sine.out' }, '<');
    }
  });
});

// Placeholder revert if not in focus
form.addEventListener('click', () => {
  containers.forEach((container) => {
    let input = container.querySelector('.input');
    let line = container.querySelector('.elastic-line');
    let placeholder = container.querySelector('.placeholder');

    if (document.activeElement !== input) {
      if (!input.value) {
        gsap.to(placeholder, { top: 0, left: 0, scale: 1, duration: 0.5, ease: 'Power2.easeOut' });
      }
    }
    // Name Validation
    input.addEventListener('input', (e) => {
      if (e.target.type === 'text') {
        let inputText = e.target.value;
        inputText.length > 2 ? colorize('#4D4D4D', line, placeholder) : colorize('#FE8C99', line, placeholder);
        if (e.target.value.length === 0) {
          colorize('#c7c7c7', line, placeholder);
        }
      }
      // Email validation
      if (e.target.type === 'email') {
        let valid = validateEmail(e.target.value);
        valid ? colorize('#4D4D4D', line, placeholder) : colorize('#FE8C99', line, placeholder);
        if (e.target.value.length === 0) {
          colorize('#c7c7c7', line, placeholder);
        }
      }
    });
  });
});

// Email validation check
function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validatePhone(phone) {
  let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(phone);
}
