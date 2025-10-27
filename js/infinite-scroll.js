(function() {
  let allPosts = [];
  let currentIndex = 5; // We already loaded 5 posts
  const postsPerPage = 5;
  let isLoading = false;
  let hasMorePosts = true;

  const postList = document.getElementById('post-list');
  const loadingIndicator = document.getElementById('loading-indicator');
  const noMorePosts = document.getElementById('no-more-posts');

  // Fetch all posts from JSON
  fetch('/posts.json')
    .then(response => response.json())
    .then(posts => {
      allPosts = posts;
      if (allPosts.length <= 5) {
        hasMorePosts = false;
        noMorePosts.style.display = 'block';
      }
    })
    .catch(error => {
      console.error('Error loading posts:', error);
    });

  // Create post HTML
  function createPostHTML(post) {
    const categoriesHTML = post.categories.length > 0
      ? `in ${post.categories.map(cat => `<a href="/posts/#${cat.toLowerCase()}">${cat}</a>`).join(', ')}`
      : '';

    return `
      <li>
        <h2>
          <a class="post-link" href="${post.url}">${post.title}</a>
        </h2>
        <section class="post-excerpt" itemprop="description">
          <p>${post.excerpt}</p>
        </section>
        <section class="post-meta">
          <div class="post-date">${post.date}</div>
          <div class="post-categories">${categoriesHTML}</div>
        </section>
      </li>
    `;
  }

  // Load more posts
  function loadMorePosts() {
    if (isLoading || !hasMorePosts) return;

    isLoading = true;
    loadingIndicator.style.display = 'block';

    // Simulate loading delay for better UX
    setTimeout(() => {
      const nextPosts = allPosts.slice(currentIndex, currentIndex + postsPerPage);

      if (nextPosts.length === 0) {
        hasMorePosts = false;
        loadingIndicator.style.display = 'none';
        noMorePosts.style.display = 'block';
        isLoading = false;
        return;
      }

      nextPosts.forEach(post => {
        postList.insertAdjacentHTML('beforeend', createPostHTML(post));
      });

      currentIndex += nextPosts.length;

      if (currentIndex >= allPosts.length) {
        hasMorePosts = false;
        noMorePosts.style.display = 'block';
      }

      loadingIndicator.style.display = 'none';
      isLoading = false;
    }, 500);
  }

  // Check if user scrolled to bottom
  function checkScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Trigger when user is 200px from bottom
    if (scrollTop + windowHeight >= documentHeight - 200) {
      loadMorePosts();
    }
  }

  // Throttle scroll event
  let throttleTimer;
  function throttle(callback, time) {
    if (throttleTimer) return;

    throttleTimer = true;
    setTimeout(() => {
      callback();
      throttleTimer = false;
    }, time);
  }

  // Add scroll event listener
  window.addEventListener('scroll', () => {
    throttle(checkScroll, 250);
  });
})();
