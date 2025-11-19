(function() {
  'use strict';

  const config = {
    tocContainer: '.post-toc',
    contentContainer: '.post-content',
    headingSelectors: 'h2, h3, h4, h5, h6',
    activeClass: 'active',
    rootMargin: '-80px 0px -80% 0px'
  };

  function generateTOC() {
    const tocContainer = document.querySelector(config.tocContainer);
    const contentContainer = document.querySelector(config.contentContainer);

    if (!tocContainer || !contentContainer) {
      return;
    }

    const headings = contentContainer.querySelectorAll(config.headingSelectors);

    if (headings.length === 0) {
      tocContainer.style.display = 'none';
      return;
    }

    let tocHTML = '<nav class="toc-nav">';
    tocHTML += '<h3 class="toc-title">목차</h3>';
    tocHTML += '<ul class="toc-list">';

    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }

      const level = heading.tagName.toLowerCase();
      const text = heading.textContent.trim();
      const id = heading.id;

      tocHTML += `<li class="toc-item toc-${level}">`;
      tocHTML += `<a href="#${id}" class="toc-link" data-heading-id="${id}">${text}</a>`;
      tocHTML += '</li>';
    });

    tocHTML += '</ul>';
    tocHTML += '</nav>';

    tocContainer.innerHTML = tocHTML;

    return headings;
  }

  function setupScrollSpy(headings) {
    if (!headings || headings.length === 0) return;

    const tocLinks = document.querySelectorAll('.toc-link');

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        const headingId = entry.target.id;
        const tocLink = document.querySelector(`.toc-link[data-heading-id="${headingId}"]`);

        if (entry.isIntersecting) {
          tocLinks.forEach(link => link.classList.remove(config.activeClass));

          if (tocLink) {
            tocLink.classList.add(config.activeClass);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: config.rootMargin,
      threshold: 0
    });

    headings.forEach(heading => {
      observer.observe(heading);
    });

    tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          history.pushState(null, null, `#${targetId}`);
        }
      });
    });
  }

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const headings = generateTOC();
        setupScrollSpy(headings);
      });
    } else {
      const headings = generateTOC();
      setupScrollSpy(headings);
    }
  }

  init();
})();
