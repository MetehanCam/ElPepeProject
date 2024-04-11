/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
  

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

function copyToClipboard() {
  const textToCopy = "BDVHCB7w23GkVeM5zueBPrzSiYRL6Q2VjFVL9hXfW4qS";
  
  navigator.clipboard.writeText(textToCopy)
  .then(() => {
      Toastify({
          text: "Copied the text: " + textToCopy,
          duration: 3000,
          gravity: "bottom", // bottom or top
          position: "center", // center, left or right
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();
  })
  .catch(err => {
      console.error('Failed to copy!', err);
  });
}

function copyToClipboardDoge() {
  const textToCopy = "D5SF1gEukrYeHdJzMqF4DcbtDDPMayCAUrSFEnWVf2Qu";
  
  navigator.clipboard.writeText(textToCopy)
  .then(() => {
      Toastify({
          text: "Copied the text: " + textToCopy,
          duration: 3000,
          gravity: "bottom", // bottom or top
          position: "center", // center, left or right
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();
  })
  .catch(err => {
      console.error('Failed to copy!', err);
  });
}

window.onscroll = function() {scrollFunction()};
    
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollBtn").style.display = "none";
    } else {
        document.getElementById("scrollBtn").style.display = "block";
    }
}


window.onload = function() {
  // Make HTTP GET request to the first API endpoint
  fetch('https://api.shyft.to/sol/v1/wallet/balance?network=mainnet-beta&wallet=BQCm6uLUuu8C3RQtivW8wRFf3AdkdRzdD2WvDEmHvqVG', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'x-api-key': 'ysDcfa2xiWWL0j_L'
      }
  })
  .then(response => response.json())
  .then(data => {
      // Extract the balance from the response
      const balance = data.result.balance;
      const total = 50; // assuming the total balance is 50 SOL

      // Calculate the percentage
      const percentage = (balance / total) * 100;

      // Update the progress bar width
      const progressBar = document.getElementById('progress');
      progressBar.style.width = percentage + '%';

      // Update the balance text
      document.getElementById('balance').textContent = balance + ' / ' + total + ' SOL';
  })
  .catch(error => {
      console.error('Error fetching balance:', error);
      document.getElementById('balance').textContent = 'Error fetching balance';
  });

  // Make HTTP GET request to the second API endpoint
  fetch('https://api.shyft.to/sol/v1/wallet/balance?network=mainnet-beta&wallet=D5SF1gEukrYeHdJzMqF4DcbtDDPMayCAUrSFEnWVf2Qu', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'x-api-key': 'ysDcfa2xiWWL0j_L'
      }
  })
  .then(response => response.json())
  .then(data => {
      // Extract the balance from the response
      const balanceDoge = data.result.balance;
      const totalDoge = 50; // assuming the total balance is 50 SOL

      // Calculate the percentage
      const percentageDoge = (balanceDoge / totalDoge) * 100;

      // Update the progress bar width
      const progressBarDoge = document.getElementById('progressDoge');
      progressBarDoge.style.width = percentageDoge + '%';

      // Update the balance text
      document.getElementById('balanceDoge').textContent = balanceDoge + ' / ' + totalDoge + ' SOL';
  })
  .catch(error => {
      console.error('Error fetching balance:', error);
      document.getElementById('balanceDoge').textContent = 'Error fetching balance';
  });
}
