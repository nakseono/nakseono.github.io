/**
 * Table of Contents (TOC) Generator
 * Automatically generates a table of contents from post headings
 * and implements scroll spy functionality
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    tocContainer: '.post-toc',
    contentContainer: '.post-content',
    headingSelectors: 'h2, h3, h4, h5, h6',
    activeClass: 'active',
    rootMargin: '-80px 0px -80% 0px' // Trigger when heading is near top of viewport
  };

  /**
   * Generate TOC HTML from headings
   */
  function generateTOC() {
    const tocContainer = document.querySelector(config.tocContainer);
    const contentContainer = document.querySelector(config.contentContainer);

    if (!tocContainer || !contentContainer) {
      return; // No TOC container or content container found
    }

    const headings = contentContainer.querySelectorAll(config.headingSelectors);

    if (headings.length === 0) {
      tocContainer.style.display = 'none';
      return; // No headings found, hide TOC
    }

    // Build TOC HTML
    let tocHTML = '<nav class="toc-nav">';
    tocHTML += '<h3 class="toc-title">목차</h3>';
    tocHTML += '<ul class="toc-list">';

    headings.forEach((heading, index) => {
      // Ensure heading has an ID
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

  /**
   * Set up IntersectionObserver for scroll spy
   */
  function setupScrollSpy(headings) {
    if (!headings || headings.length === 0) return;

    const tocLinks = document.querySelectorAll('.toc-link');
    let activeHeading = null;

    // IntersectionObserver callback
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        const headingId = entry.target.id;
        const tocLink = document.querySelector(`.toc-link[data-heading-id="${headingId}"]`);

        if (entry.isIntersecting) {
          // Remove active class from all links
          tocLinks.forEach(link => link.classList.remove(config.activeClass));

          // Add active class to current link
          if (tocLink) {
            tocLink.classList.add(config.activeClass);
            activeHeading = headingId;
          }
        }
      });
    };

    // Create observer
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: config.rootMargin,
      threshold: 0
    });

    // Observe all headings
    headings.forEach(heading => {
      observer.observe(heading);
    });

    // Handle clicks on TOC links (smooth scroll is handled by CSS)
    tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Smooth scroll to target
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL hash without jumping
          history.pushState(null, null, `#${targetId}`);
        }
      });
    });
  }

  /**
   * Initialize TOC when DOM is ready
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const headings = generateTOC();
        setupScrollSpy(headings);
      });
    } else {
      // DOM already loaded
      const headings = generateTOC();
      setupScrollSpy(headings);
    }
  }

  // Initialize
  init();
})();
