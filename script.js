// نظام متعدد اللغات محسن
const languageSystem = {
    currentLang: 'ar',
    elements: {},
    
    init: function() {
      this.elements = {
        headerTitle: document.getElementById('header-title'),
        hajjTitle: document.querySelector('.hajj-title'),
        // إضافة المزيد من العناصر هنا
      };
      
      this.loadLanguage();
      this.setupEventListeners();
    },
    
    loadLanguage: function() {
      const savedLang = localStorage.getItem('hajjGuideLang') || 'ar';
      this.switchLanguage(savedLang);
    },
    
    switchLanguage: function(lang) {
      this.currentLang = lang;
      localStorage.setItem('hajjGuideLang', lang);
      
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      
      this.applyTranslation(lang);
      this.animateLanguageChange();
    },
    
    applyTranslation: function(lang) {
      const translations = {
        ar: {
          headerTitle: "مناسك الحج",
          hajjTitle: "أنواع الحج",
          // إضافة جميع الترجمات العربية هنا
        },
        en: {
          headerTitle: "Hajj Rituals",
          hajjTitle: "Types of Hajj",
          // إضافة جميع الترجمات الإنجليزية هنا
        }
      };
      
      for (const [key, element] of Object.entries(this.elements)) {
        if (element && translations[lang][key]) {
          element.textContent = translations[lang][key];
        }
      }
      
      const langBtn = document.getElementById('language-switcher');
      if (langBtn) {
        langBtn.textContent = lang === 'ar' ? 'English' : 'العربية';
        langBtn.setAttribute('data-lang', lang === 'ar' ? 'en' : 'ar');
      }
    },
    
    animateLanguageChange: function() {
      document.body.style.opacity = '0.5';
      setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
      }, 300);
    },
    
    setupEventListeners: function() {
      const langBtn = document.getElementById('language-switcher');
      if (langBtn) {
        langBtn.addEventListener('click', () => {
          const newLang = langBtn.getAttribute('data-lang');
          this.switchLanguage(newLang);
        });
      }
    }
  };
  
  // نظام الخط الزمني المتطور
  const timelineSystem = {
    observer: null,
    
    init: function() {
      this.setupTimelineAnimation();
      this.setupScrollEffects();
    },
    
    setupTimelineAnimation: function() {
      const timelineItems = document.querySelectorAll('.timeline-step');
      
      timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
        
        const stepNumber = item.querySelector('.step-number');
        if (!stepNumber) {
          const numberElement = document.createElement('div');
          numberElement.className = 'step-number animate__animated';
          numberElement.textContent = index + 1;
          item.prepend(numberElement);
        }
      });
      
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate__fadeInUp', 'animate__faster');
            entry.target.querySelector('.step-number')?.classList.add('animate__bounceIn');
            this.observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      timelineItems.forEach(item => this.observer.observe(item));
    },
    
    setupScrollEffects: function() {
      let lastScrollPos = 0;
      const timeline = document.querySelector('.hajj-timeline');
      
      if (!timeline) return;
      
      window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        const timelinePos = timeline.getBoundingClientRect().top;
        
        if (timelinePos < window.innerHeight * 0.8 && timelinePos > -timeline.offsetHeight) {
          const direction = currentScroll > lastScrollPos ? 'down' : 'up';
          this.animateOnScroll(direction);
        }
        
        lastScrollPos = currentScroll;
      });
    },
    
    animateOnScroll: function(direction) {
      const activeItems = document.querySelectorAll('.timeline-step:not(.animated)');
      
      activeItems.forEach((item, index) => {
        const itemPos = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (direction === 'down' && itemPos < windowHeight * 0.75 || 
            direction === 'up' && itemPos < windowHeight * 0.9) {
          setTimeout(() => {
            item.classList.add('animated', 'animate__fadeInUp');
            item.querySelector('.step-number')?.classList.add('animate__bounceIn');
          }, index * 150);
        }
      });
    }
  };
  
  // تهيئة الأنظمة عند تحميل الصفحة
  document.addEventListener('DOMContentLoaded', function() {
    languageSystem.init();
    timelineSystem.init();
    
    // إضافة تأثيرات للبطاقات
    const cards = document.querySelectorAll('.hajj-type-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
      });
    });
    
    // إعادة تحميل الصفحة عند النقر على الرئيسية
    document.querySelector('.nav-link[onclick]').addEventListener('click', function(e) {
      e.preventDefault();
      window.location.reload();
    });
  });