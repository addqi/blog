{% extends '_layout.swig' %}

{% block title %}{{ title }}{%- if theme.index_with_subtitle and subtitle %} - {{ subtitle }}{%- endif %}{% endblock %}

{% block class %}index portal-page{% endblock %}

{% block content %}
  <div class="portal-container">
    <h1 class="portal-title">{{ config.title }}</h1>
    <p class="portal-subtitle">游戏开发知识库与项目展示</p>

    <div class="portal-cards">
      <a href="/articles/" class="portal-card portal-card-articles">
        <div class="portal-card-icon">
          <i class="fa fa-book"></i>
        </div>
        <h2>技术文章</h2>
        <p>Cocos Creator、Unity 等游戏开发笔记与教程</p>
        <span class="portal-card-action">浏览文章 &raquo;</span>
      </a>

      <a href="/projects/" class="portal-card portal-card-projects">
        <div class="portal-card-icon">
          <i class="fa fa-gamepad"></i>
        </div>
        <h2>示例项目</h2>
        <p>可在线体验的游戏 Demo 与试玩项目</p>
        <span class="portal-card-action">查看项目 &raquo;</span>
      </a>
    </div>
  </div>
{% endblock %}
