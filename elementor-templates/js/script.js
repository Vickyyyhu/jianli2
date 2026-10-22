/* =========================================
   胡馨月作品集 · 主脚本
   ========================================= */

(function () {
  'use strict';

  // ---- Header 滚动样式 ----
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ---- 移动端菜单 ----
  const toggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('active');
        mobileNav.classList.remove('open');
      });
    });
  }

  // ---- 当前页面导航高亮 ----
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path || (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ---- 作品集筛选 ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        projectCards.forEach(card => {
          const cardCat = card.dataset.category || '';
          if (cat === 'all' || cardCat.includes(cat)) {
            card.style.display = '';
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            setTimeout(() => { card.style.display = 'none'; }, 250);
          }
        });
      });
    });
  }

  // ---- 联系表单 ----
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('.btn-primary');
      const originalText = btn.textContent;
      btn.textContent = '发送中...';
      btn.disabled = true;

      // 简单校验
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const msg = form.querySelector('[name="message"]').value.trim();
      if (!name || !email || !msg) {
        alert('请填写必填项：姓名、邮箱和留言');
        btn.textContent = originalText;
        btn.disabled = false;
        return;
      }

      setTimeout(() => {
        document.getElementById('form-success').style.display = 'block';
        form.reset();
        btn.textContent = originalText;
        btn.disabled = false;
        setTimeout(() => {
          document.getElementById('form-success').style.display = 'none';
        }, 4000);
      }, 800);
    });
  }

  // ---- 滚动渐显 ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.adv-card, .project-card, .blog-card, .skill-card, .timeline-item, .tool-card, .bento-item').forEach(el => {
    io.observe(el);
  });

  // ---- 平滑滚动锚点 ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();