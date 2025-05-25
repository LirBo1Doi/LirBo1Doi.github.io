window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hide');
    }, 1000);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('[data-scroll]');
  const revealSection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };
  const sectionObserver = new IntersectionObserver(revealSection, { threshold: 0.1 });
  sections.forEach(section => sectionObserver.observe(section));

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId) || document.querySelector(`[href*="${targetId}"]`);
      if (targetSection) {
        const offset = targetSection.offsetTop ? targetSection.offsetTop - 60 : 0;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  const scrollToggle = document.getElementById('scroll-toggle');
  let isAtBottom = false;
  if (scrollToggle) {
    scrollToggle.setAttribute('aria-label', 'Прокрутить вниз');
    scrollToggle.addEventListener('click', () => {
      if (!isAtBottom) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        scrollToggle.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToggle.setAttribute('aria-label', 'Прокрутить вверх');
        scrollToggle.title = 'Прокрутить вверх';
        isAtBottom = true;
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        scrollToggle.innerHTML = '<i class="fas fa-arrow-down"></i>';
        scrollToggle.setAttribute('aria-label', 'Прокрутить вниз');
        scrollToggle.title = 'Прокрутить вниз';
        isAtBottom = false;
      }
    });

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      if (scrollPosition >= documentHeight - 10) {
        scrollToggle.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToggle.setAttribute('aria-label', 'Прокрутить вверх');
        scrollToggle.title = 'Прокрутить вверх';
        isAtBottom = true;
      } else if (window.scrollY <= 10) {
        scrollToggle.innerHTML = '<i class="fas fa-arrow-down"></i>';
        scrollToggle.setAttribute('aria-label', 'Прокрутить вниз');
        scrollToggle.title = 'Прокрутить вниз';
        isAtBottom = false;
      }
    });
  }

  const quickNavButtons = document.querySelectorAll('.quick-nav-btn');
  quickNavButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({ top: targetSection.offsetTop - 60, behavior: 'smooth' });
      }
    });
  });

  const buttons = document.querySelectorAll('.btn-primary, .quick-nav-btn');
  buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
      button.style.transition = 'transform 0.2s ease, box-shadow 0.3s ease';
    });
  });

  const cards = document.querySelectorAll('.card, .review-card, .price-item');
  cards.forEach(card => {
    card.addEventListener('mouseover', () => {
      card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
  });

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Форма отправлена:', new FormData(contactForm));
      alert('Ваша заявка успешно отправлена!');
      contactForm.reset();
    });
  }

  const citySelect = document.getElementById('city-select');
  const cityMessage = document.getElementById('city-message');
  if (citySelect && cityMessage) {
    citySelect.addEventListener('change', () => {
      const selectedCity = citySelect.value;
      cityMessage.textContent = `Показаны специалисты для ${selectedCity}`;
    });
    cityMessage.textContent = `Показаны специалисты для ${citySelect.value}`;
  }

  const orderButtons = document.querySelectorAll('.price-item .btn-primary');
  orderButtons.forEach(button => {
    button.addEventListener('click', () => {
      const message = button.getAttribute('data-message');
      const contactForm = document.getElementById('contact-form');
      if (contactForm) {
        const messageField = contactForm.querySelector('textarea[name="message"]');
        if (messageField) {
          messageField.value = `Заказываю ${message}`;
        }
        window.scrollTo({ top: contactForm.offsetTop - 60, behavior: 'smooth' });
      }
    });
  });

  const jumbotron = document.querySelector('.jumbotron');
  if (jumbotron) {
    const slides = jumbotron.querySelectorAll('.slide');
    const dots = jumbotron.querySelectorAll('.dot');
    const prevBtn = jumbotron.querySelector('.slider-btn.prev');
    const nextBtn = jumbotron.querySelector('.slider-btn.next');
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
        if (i === index) {
          slide.classList.add('active');
          dots[i].classList.add('active');
        }
      });
      currentSlide = index;
    }

    function nextSlide() {
      let next = currentSlide + 1;
      if (next >= totalSlides) next = 0;
      showSlide(next);
    }

    function prevSlide() {
      let prev = currentSlide - 1;
      if (prev < 0) prev = totalSlides - 1;
      showSlide(prev);
    }

    let autoSlide = setInterval(nextSlide, 5000);
    jumbotron.addEventListener('mouseenter', () => clearInterval(autoSlide));
    jumbotron.addEventListener('mouseleave', () => autoSlide = setInterval(nextSlide, 5000));

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'));
        showSlide(slideIndex);
      });
    });

    showSlide(0);
  }
});