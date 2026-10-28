(function () {
  'use strict';

  // Header 滚动阴影
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // 移动端菜单
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

  // 当前页面导航高亮
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // 作品集筛选
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (filterBtns.length && cards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        cards.forEach(card => {
          const c = card.dataset.category || '';
          if (cat === 'all' || c.includes(cat)) {
            card.style.display = '';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.96)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // 联系表单
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('.btn-primary');
      const txt = btn.textContent;
      btn.textContent = '发送中...';
      btn.disabled = true;
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const msg = form.querySelector('[name="message"]').value.trim();
      if (!name || !email || !msg) {
        alert('请填写必填项：姓名、邮箱和留言');
        btn.textContent = txt; btn.disabled = false; return;
      }
      setTimeout(() => {
        document.getElementById('form-success').style.display = 'block';
        form.reset(); btn.textContent = txt; btn.disabled = false;
        setTimeout(() => { document.getElementById('form-success').style.display = 'none'; }, 4000);
      }, 800);
    });
  }

  // 滚动渐显
  const io = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('fade-up');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, (entry.target.dataset.delay || 0) * 100);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal, .adv-card, .tool-card, .skill-card, .project-card, .blog-card, .timeline-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
    io.observe(el);
  });

  // ============ Lightbox 画廊翻阅 ============
  let lb = null, lbIndex = 0, lbImages = [], lbTitle = '';

  function ensureLightbox() {
    if (lb) return lb;
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `
      <span class="lightbox-close" aria-label="关闭">×</span>
      <button class="lightbox-prev" aria-label="上一张">‹</button>
      <button class="lightbox-next" aria-label="下一张">›</button>
      <div class="lightbox-img-wrap"><img alt=""></div>
      <div class="lightbox-thumb-row"></div>
      <div class="lightbox-info">
        <div class="lightbox-title"></div>
        <div class="lightbox-counter"></div>
      </div>
    `;
    document.body.appendChild(lb);

    lb.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox-prev').addEventListener('click', () => navLightbox(-1));
    lb.querySelector('.lightbox-next').addEventListener('click', () => navLightbox(1));
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    return lb;
  }

  function openLightbox(images, startIndex, title) {
    lbImages = images;
    lbIndex = startIndex || 0;
    lbTitle = title || '';
    ensureLightbox();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderLightbox();
  }

  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navLightbox(dir) {
    lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
    renderLightbox();
  }

  function renderLightbox() {
    const img = lb.querySelector('.lightbox-img-wrap img');
    img.src = lbImages[lbIndex];
    img.style.animation = 'none';
    img.offsetHeight; // reflow
    img.style.animation = '';
    lb.querySelector('.lightbox-title').textContent = lbTitle;
    lb.querySelector('.lightbox-counter').textContent = `${lbIndex + 1} / ${lbImages.length}`;
    lb.querySelector('.lightbox-prev').style.opacity = lbIndex === 0 ? '0.2' : '1';
    lb.querySelector('.lightbox-next').style.opacity = lbIndex === lbImages.length - 1 ? '0.2' : '1';

    const row = lb.querySelector('.lightbox-thumb-row');
    row.innerHTML = '';
    lbImages.forEach((src, i) => {
      const t = document.createElement('img');
      t.src = src;
      t.alt = '';
      if (i === lbIndex) t.classList.add('active');
      t.addEventListener('click', () => { lbIndex = i; renderLightbox(); });
      row.appendChild(t);
    });
  }

  document.addEventListener('keydown', e => {
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') navLightbox(-1);
    else if (e.key === 'ArrowRight') navLightbox(1);
  });

  // 绑定项目卡点击
  document.querySelectorAll('[data-gallery]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const images = JSON.parse(el.dataset.gallery);
      const title = el.dataset.title || '';
      openLightbox(images, 0, title);
    });
  });
})();