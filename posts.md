---
layout: page
title: "Posts"
permalink: /posts/
main_nav: true
---

<ul class="posts-list">
{% for post in site.posts %}
<li>
  <strong><a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></strong>
  <span class="post-date">- {{ post.date | date_to_long_string }}</span>
  {% if post.categories.size > 0 %}
  <span class="post-categories">
	  in
    {% for cat in post.categories %}
      <span class="category-tag">{{ cat | capitalize }}</span>{% if forloop.last == false %}, {% endif %}
    {% endfor %}
  </span>
  {% endif %}
</li>
{% endfor %}
</ul>
