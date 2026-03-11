(function () {
  'use strict';

  var pageLoadTime = Date.now();

  var menuButton = document.getElementById('menuButton');
  var mobileMenu = document.getElementById('mobileMenu');
  var navLinks = [].slice.call(document.querySelectorAll('.nav-link'));
  var sections = [].slice.call(document.querySelectorAll('main section[id]'));
  var revealEls = [].slice.call(document.querySelectorAll('.reveal'));
  var signupForm = document.getElementById('signupForm');
  var emailInput = document.getElementById('emailInput');
  var interestSelect = document.getElementById('interestSelect');
  var formMessage = document.getElementById('formMessage');

  function toggleMenu() {
    var isHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    menuButton.setAttribute('aria-expanded', String(isHidden));
  }

  if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth < 768) {
        mobileMenu.classList.add('hidden');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  });

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          var href = link.getAttribute('href');
          link.classList.toggle('active', href === '#' + id);
        });
      }
    });
  }, {
    rootMargin: '-35% 0px -50% 0px',
    threshold: 0.1
  });

  sections.forEach(function (section) { sectionObserver.observe(section); });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealEls.forEach(function (el) { revealObserver.observe(el); });

  if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var gotchaField = document.querySelector('input[name="_gotcha"]');
      if (gotchaField && gotchaField.value) {
        formMessage.textContent = "Thanks. You're on the list.";
        formMessage.className = 'min-h-[1.5rem] text-sm text-emerald-300';
        signupForm.reset();
        return;
      }

      if (Date.now() - pageLoadTime < 3000) {
        formMessage.textContent = 'Please wait a moment before submitting.';
        formMessage.className = 'min-h-[1.5rem] text-sm text-red-300';
        return;
      }

      var email = emailInput.value.trim();
      var interest = interestSelect.value;
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if (!emailPattern.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.className = 'min-h-[1.5rem] text-sm text-red-300';
        emailInput.focus();
        return;
      }

      if (!interest) {
        formMessage.textContent = 'Please choose what matters most to you.';
        formMessage.className = 'min-h-[1.5rem] text-sm text-red-300';
        interestSelect.focus();
        return;
      }

      var submitBtn = signupForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending\u2026';

      fetch('https://formspree.io/f/mykneoan', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          interest: interest,
          _gotcha: gotchaField ? gotchaField.value : ''
        })
      })
        .then(function (res) {
          if (res.ok) {
            formMessage.textContent = "Thanks. You\u2019re on the list for updates focused on " + interest + ".";
            formMessage.className = 'min-h-[1.5rem] text-sm text-emerald-300';
            signupForm.reset();
          } else {
            throw new Error('submission failed');
          }
        })
        .catch(function () {
          formMessage.textContent = 'Something went wrong. Please try again.';
          formMessage.className = 'min-h-[1.5rem] text-sm text-red-300';
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Join the Early Interest List';
        });
    });
  }
})();
