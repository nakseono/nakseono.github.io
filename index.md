---
layout: default
permalink: /
---
{% assign total_posts = site.posts | size %}
{% assign per_page = site.per_page | default: 5 %}
{% assign remaining = total_posts | minus: per_page | minus: per_page %}
{% if remaining > 0 %}
  {% assign total_pages = 3 %}
{% elsif total_posts > per_page %}
  {% assign total_pages = 2 %}
{% else %}
  {% assign total_pages = 1 %}
{% endif %}

<div class="home">

<div class="wrapper">
<header class="home-header">
  <h1 class="home-title">{{ site.title }}</h1>
  {% if site.subtitle %}<p class="home-subtitle">{{ site.subtitle }}</p>{% endif %}
</header>
<ul class="post-list">
  {% for post in site.posts limit:per_page %}
  <li class="post-item" onclick="location.href='{{ post.url | prepend: site.baseurl }}'">
    <h2>
      <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
    </h2>
    <section class="post-excerpt" itemprop="description">
      <p>{{ post.content | strip_html | truncatewords: 100 }}</p>
    </section>
    <section class="post-meta">
      <div class="post-date">{{ post.date | date: "%B %-d, %Y" }}</div>
      <div class="post-categories">
      {% if post.categories.size > 0 %}in {% for cat in post.categories %}
        {% if site.jekyll-archives %}
        <a href="{{ site.baseurl }}/category/{{ cat }}" onclick="event.stopPropagation()">{{ cat | capitalize }}</a>{% if forloop.last == false %}, {% endif %}
        {% else %}
        <a href="{{ site.baseurl }}/posts/#{{ cat }}" onclick="event.stopPropagation()">{{ cat | capitalize }}</a>{% if forloop.last == false %}, {% endif %}
        {% endif %}
      {% endfor %}{% endif %}
      </div>
    </section>
  </li>
  {% endfor %}
</ul>

{% if total_pages > 1 %}
<nav class="pagination">
  <span class="pagination-link pagination-prev disabled">&laquo; 이전</span>

  <div class="pagination-numbers">
    {% for page_num in (1..total_pages) %}
      {% if page_num == 1 %}
        <span class="pagination-number active">{{ page_num }}</span>
      {% else %}
        <a href="{{ site.baseurl }}/page/{{ page_num }}/" class="pagination-number">{{ page_num }}</a>
      {% endif %}
    {% endfor %}
  </div>

  <a href="{{ site.baseurl }}/page/2/" class="pagination-link pagination-next">다음 &raquo;</a>
</nav>
{% endif %}

</div>
</div>
