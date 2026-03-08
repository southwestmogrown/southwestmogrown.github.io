/* ===== Portfolio JS ===== */

(function () {
  'use strict';

  /* --- Nav scroll effect --- */
  var nav = document.querySelector('.nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* --- Mobile menu toggle --- */
  var toggle = document.querySelector('.nav__toggle');
  var navLinks = document.querySelector('.nav__links');

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });

  /* --- Active nav link on scroll --- */
  var sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    var scrollY = window.scrollY + 100;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav__links a[href="#' + id + '"]');
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav);

  /* --- Intersection Observer for fade-up --- */
  var faders = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    faders.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    faders.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* --- Fetch GitHub repos --- */
  var FEATURED_REPOS = [
    'code_genie',
    'kanboard',
    'quizquest',
    'chkn-tndr',
    'beginner-synth',
    'guitar-hub'
  ];

  var LANG_COLORS = {
    Python: '#3572A5',
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    'C++': '#f34b7d',
    Go: '#00ADD8',
    HTML: '#e34c26',
    CSS: '#563d7c',
    PHP: '#4F5D95'
  };

  var REPO_DESCRIPTIONS = {
    code_genie:
      'A CrewAI flow that generates, reviews, and optionally refactors code snippets based on user prompt.',
    kanboard:
      'Full-stack kanban board with real-time collaboration via native WebSockets. Built with Next.js, TypeScript, PostgreSQL, and Prisma.',
    quizquest: 'A gamified Learning Management System built with TypeScript.',
    'chkn-tndr':
      'Real-time, multiplayer "where should we eat?" game — Tinder-style swiping for the group dinner dilemma.',
    'beginner-synth':
      'A software synthesizer built from scratch in C++ — exploring audio DSP and sound design.',
    'guitar-hub':
      'A social platform for guitarists to share tabs, riffs, and connect with other musicians.'
  };

  var USERNAME = 'southwestmogrown';

  function renderProjects(repos) {
    var grid = document.getElementById('projects-grid');
    grid.innerHTML = '';

    repos.forEach(function (repo) {
      var desc =
        REPO_DESCRIPTIONS[repo.name] ||
        repo.description ||
        'No description available.';
      var langColor = LANG_COLORS[repo.language] || '#8b8ba7';

      var card = document.createElement('article');
      card.className = 'project-card fade-up visible';

      card.innerHTML =
        '<div class="project-card__header">' +
        '  <span class="project-card__icon">&#128193;</span>' +
        '  <div class="project-card__links">' +
        '    <a href="' +
        repo.html_url +
        '" target="_blank" rel="noopener noreferrer" aria-label="GitHub repo">' +
        '      <i class="fa-brands fa-github"></i>' +
        '    </a>' +
        '  </div>' +
        '</div>' +
        '<h3 class="project-card__title">' +
        repo.name.replace(/-/g, ' ').replace(/_/g, ' ') +
        '</h3>' +
        '<p class="project-card__desc">' +
        desc +
        '</p>' +
        '<div class="project-card__footer">' +
        (repo.language
          ? '  <span class="project-card__lang">' +
            '    <span class="project-card__lang-dot" style="background:' +
            langColor +
            '"></span>' +
            '    ' +
            repo.language +
            '  </span>'
          : '') +
        '</div>';

      grid.appendChild(card);
    });
  }

  function loadProjects() {
    var grid = document.getElementById('projects-grid');

    fetch('https://api.github.com/users/' + USERNAME + '/repos?per_page=100&sort=updated')
      .then(function (res) {
        return res.json();
      })
      .then(function (repos) {
        var featured = [];
        FEATURED_REPOS.forEach(function (name) {
          var match = repos.find(function (r) {
            return r.name === name;
          });
          if (match) featured.push(match);
        });

        if (featured.length === 0) featured = repos.slice(0, 6);
        renderProjects(featured);
      })
      .catch(function () {
        /* Fallback: render from static data */
        var fallback = FEATURED_REPOS.map(function (name) {
          return {
            name: name,
            html_url: 'https://github.com/' + USERNAME + '/' + name,
            description: REPO_DESCRIPTIONS[name] || '',
            language:
              name === 'beginner-synth'
                ? 'C++'
                : name === 'guitar-hub'
                ? 'JavaScript'
                : name === 'code_genie'
                ? 'Python'
                : 'TypeScript'
          };
        });
        renderProjects(fallback);
      });
  }

  loadProjects();
})();
