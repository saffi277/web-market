/* ============================================================
   ZAWAN Portfolio — translations.js
   Bilingual support: English (LTR) / Arabic (RTL)
   ============================================================ */

'use strict';

const TRANSLATIONS = {
  en: {
    // Nav
    'nav-home':        'Home',
    'nav-products':    'Products',
    'nav-services':    'Services',
    'nav-contact':     'Contact',
    'nav-get-started': 'Get Started',

    // Hero
    'hero-badge':      'Available for new projects',
    'hero-title-line1':'Engineering the',
    'hero-title-line2':'Future, One Line',
    'hero-title-line3':'at a Time',
    'hero-desc':       'We build cutting-edge software solutions — from enterprise systems to mobile apps, we turn ideas into powerful digital products.',
    'hero-btn-products':'Explore Products',
    'hero-btn-services':'Our Services',
    'hero-card-title': 'ZAWAN Analytics',
    'hero-card-sub':   'Performance Dashboard',

    // Stats
    'stat-projects':   'Projects Delivered',
    'stat-clients':    'Happy Clients',
    'stat-years':      'Years of Experience',
    'stat-satisfaction':'Client Satisfaction',

    // Products section (home)
    'products-tag':    '🛠️ Our Products',
    'products-heading':'Featured Solutions',
    'products-subtitle':'Powerful, scalable, and ready-to-deploy software systems built for modern businesses.',
    'view-all-products':'View All Products →',

    // Product card names & descs (home + products page)
    'prod-task-name':  'Task Management System',
    'prod-task-desc':  'Enterprise-grade project and task management with real-time collaboration, Kanban boards, and advanced reporting.',
    'prod-ecom-name':  'E-Commerce Platform',
    'prod-ecom-desc':  'Full-featured e-commerce solution with inventory, payments, analytics, and multi-vendor support out of the box.',
    'prod-hosp-name':  'Hospital Management System',
    'prod-hosp-desc':  'Complete healthcare platform covering patient records, appointments, billing, and staff management with HIPAA compliance.',
    'prod-chat-name':  'Real-time Chat App',
    'prod-chat-desc':  'Scalable messaging platform with end-to-end encryption, channels, bots, file sharing, and video call support.',
    'prod-inv-name':   'Inventory System',
    'prod-inv-desc':   'Smart warehouse and stock management with barcode scanning, automated reordering, and multi-location tracking.',
    'prod-ai-name':    'AI Dashboard',
    'prod-ai-desc':    'Unified AI analytics dashboard integrating machine learning models, data pipelines, and business intelligence reports.',
    'prod-school-name':'School Management System',
    'prod-school-desc':'Comprehensive LMS and school management covering enrollment, grades, attendance, timetables, and parent communication portals.',
    'prod-hr-name':    'HR & Payroll System',
    'prod-hr-desc':    'End-to-end human resources management including recruitment, onboarding, payroll, performance reviews, and leave management.',
    'prod-auto-name':  'Workflow Automation Suite',
    'prod-auto-desc':  'No-code/low-code workflow automation platform with 100+ integrations, scheduled jobs, and visual drag-and-drop builder.',
    'prod-btn':        'Get it',
    'prod-btn-full':   'Buy / Contact',

    // Products page
    'products-page-tag':    '🛠️ Our Catalog',
    'products-page-heading':'All Products',
    'products-page-sub':    'Production-ready software solutions you can license, customize, and deploy immediately.',
    'filter-all':      'All',
    'filter-systems':  'Systems',
    'filter-apps':     'Apps',
    'filter-websites': 'Websites',
    'filter-automation':'Automation',
    'search-placeholder':'Search products…',
    'products-cta-title':'Need a Custom Solution?',
    'products-cta-desc': 'We build tailor-made systems from scratch. Tell us what you need.',
    'products-cta-btn1': 'Contact Us',
    'products-cta-btn2': 'View Services',

    // Services section (home)
    'services-tag':    '⚙️ What We Do',
    'services-heading':'Our Core Services',
    'services-subtitle':'From concept to deployment — we handle the complete software development lifecycle.',
    'svc-web-name':    'Web Development',
    'svc-web-desc':    'Custom web applications, SaaS platforms, and enterprise portals built with modern frameworks and best practices.',
    'svc-mobile-name': 'Mobile Apps',
    'svc-mobile-desc': 'Cross-platform and native iOS/Android applications with seamless UX, offline-first architecture, and push notifications.',
    'svc-systems-name':'Custom Systems',
    'svc-systems-desc':'Bespoke enterprise systems, ERP integrations, automation workflows, and back-office platforms tailored to your business.',
    'svc-consult-name':'Technical Consulting',
    'svc-consult-desc':'Architecture reviews, technology strategy, code audits, and expert guidance to help you make the right technical decisions.',
    'explore-services':'Explore Services →',

    // Services page
    'services-page-tag':    '⚙️ What We Offer',
    'services-page-heading':'Our Services',
    'services-page-sub':    'End-to-end software development services from strategy and design to deployment and support.',

    // Testimonials
    'testi-tag':       '💬 Testimonials',
    'testi-heading':   'What Clients Say',

    // CTA
    'cta-title':       'Ready to Build Something Great?',
    'cta-desc':        'Tell us your idea. We\'ll turn it into a world-class digital product.',
    'cta-btn-start':   'Start a Project',
    'cta-btn-browse':  'Browse Products',

    // Contact page
    'contact-tag':     '📬 Get In Touch',
    'contact-heading': "Let's Build Together",
    'contact-sub':     "Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.",
    'form-heading':    'Send Us a Message',
    'label-name':      'Full Name *',
    'label-email':     'Email Address *',
    'label-phone':     'Phone Number',
    'label-service':   'Service Interested In *',
    'label-budget':    'Project Budget',
    'label-message':   'Project Details *',
    'ph-name':         'John Smith',
    'ph-email':        'john@company.com',
    'ph-phone':        '+1 (555) 000-0000',
    'ph-message':      'Describe your project, goals, timeline, and any other details…',
    'opt-service-default':'Select a service…',
    'opt-web':         'Web Development',
    'opt-mobile':      'Mobile App Development',
    'opt-system':      'Custom System / ERP',
    'opt-consulting':  'Technical Consulting',
    'opt-product':     'Product License',
    'opt-other':       'Other',
    'opt-budget-default':'Select your budget range…',
    'submit-form':     'Send Message →',
    'contact-info-heading':'Contact Information',
    'contact-info-sub':'Reach us through any of the channels below. We typically respond within a few hours.',

    // Footer
    'footer-copyright':'© 2026 ZAWAN Programming Group. All rights reserved.',
    'footer-built':    'Built with ❤️ by ZAWAN',
    'footer-stay-updated':'Stay Updated',
    'footer-newsletter-desc':'Get the latest updates on new products and features.',
    'footer-col-products':'Products',
    'footer-col-company':'Company',

    // Typewriter phrases
    'typewriter': [
      'Custom Software Solutions',
      'Enterprise Systems',
      'Mobile Applications',
      'Web Platforms',
      'AI-Powered Tools',
      'Technical Consulting',
    ],
  },

  ar: {
    // Nav
    'nav-home':        'الرئيسية',
    'nav-products':    'المنتجات',
    'nav-services':    'الخدمات',
    'nav-contact':     'تواصل معنا',
    'nav-get-started': 'ابدأ الآن',

    // Hero
    'hero-badge':      'متاحون لمشاريع جديدة',
    'hero-title-line1':'نهندس المستقبل،',
    'hero-title-line2':'سطراً بسطر',
    'hero-title-line3':'',
    'hero-desc':       'نبني حلول برمجية متطورة — من الأنظمة المؤسسية إلى تطبيقات الجوال، نحوّل أفكارك إلى منتجات رقمية قوية.',
    'hero-btn-products':'استكشف المنتجات',
    'hero-btn-services':'خدماتنا',
    'hero-card-title': 'تحليلات زاوان',
    'hero-card-sub':   'لوحة الأداء',

    // Stats
    'stat-projects':   'مشروع مُنجز',
    'stat-clients':    'عميل سعيد',
    'stat-years':      'سنوات خبرة',
    'stat-satisfaction':'رضا العملاء',

    // Products section (home)
    'products-tag':    '🛠️ منتجاتنا',
    'products-heading':'حلول مميزة',
    'products-subtitle':'أنظمة برمجية قوية وقابلة للتوسع وجاهزة للنشر مبنية للأعمال الحديثة.',
    'view-all-products':'عرض جميع المنتجات →',

    // Product names & descs
    'prod-task-name':  'نظام إدارة المهام',
    'prod-task-desc':  'إدارة مشاريع ومهام على مستوى المؤسسات مع تعاون في الوقت الفعلي ولوحات كانبان وتقارير متقدمة.',
    'prod-ecom-name':  'منصة التجارة الإلكترونية',
    'prod-ecom-desc':  'حل تجارة إلكترونية متكامل مع إدارة المخزون والمدفوعات والتحليلات ودعم متعدد البائعين.',
    'prod-hosp-name':  'نظام إدارة المستشفيات',
    'prod-hosp-desc':  'منصة رعاية صحية متكاملة تغطي سجلات المرضى والمواعيد والفوترة وإدارة الموظفين.',
    'prod-chat-name':  'تطبيق المحادثة الفورية',
    'prod-chat-desc':  'منصة مراسلة قابلة للتوسع مع تشفير من طرف لطرف وقنوات وروبوتات ومشاركة ملفات ودعم مكالمات الفيديو.',
    'prod-inv-name':   'نظام إدارة المخزون',
    'prod-inv-desc':   'إدارة ذكية للمستودعات والمخزون مع مسح الباركود وإعادة الطلب الآلي والتتبع متعدد المواقع.',
    'prod-ai-name':    'لوحة تحكم الذكاء الاصطناعي',
    'prod-ai-desc':    'لوحة تحليلات ذكاء اصطناعي موحدة تدمج نماذج تعلم الآلة وخطوط بيانات وتقارير ذكاء الأعمال.',
    'prod-school-name':'نظام إدارة المدارس',
    'prod-school-desc':'نظام شامل يغطي التسجيل والدرجات والحضور والجداول الزمنية وبوابات التواصل مع أولياء الأمور.',
    'prod-hr-name':    'نظام الموارد البشرية والرواتب',
    'prod-hr-desc':    'إدارة موارد بشرية متكاملة تشمل التوظيف والإعداد والرواتب ومراجعات الأداء وإدارة الإجازات.',
    'prod-auto-name':  'مجموعة أتمتة سير العمل',
    'prod-auto-desc':  'منصة أتمتة بدون كود / كود منخفض مع أكثر من 100 تكامل ووظائف مجدولة ومنشئ مرئي.',
    'prod-btn':        'احصل عليه',
    'prod-btn-full':   'شراء / تواصل',

    // Products page
    'products-page-tag':    '🛠️ كتالوجنا',
    'products-page-heading':'جميع المنتجات',
    'products-page-sub':    'حلول برمجية جاهزة للإنتاج يمكنك ترخيصها وتخصيصها ونشرها فوراً.',
    'filter-all':      'الكل',
    'filter-systems':  'الأنظمة',
    'filter-apps':     'التطبيقات',
    'filter-websites': 'المواقع',
    'filter-automation':'الأتمتة',
    'search-placeholder':'ابحث عن المنتجات…',
    'products-cta-title':'هل تحتاج حلاً مخصصاً؟',
    'products-cta-desc': 'نبني أنظمة مصممة خصيصاً من الصفر. أخبرنا بما تحتاج.',
    'products-cta-btn1': 'تواصل معنا',
    'products-cta-btn2': 'عرض الخدمات',

    // Services section (home)
    'services-tag':    '⚙️ ما نقدمه',
    'services-heading':'خدماتنا الأساسية',
    'services-subtitle':'من الفكرة إلى النشر — نتولى دورة حياة تطوير البرمجيات بالكامل.',
    'svc-web-name':    'تطوير الويب',
    'svc-web-desc':    'تطبيقات ويب مخصصة ومنصات SaaS وبوابات مؤسسية مبنية بأحدث الأطر وأفضل الممارسات.',
    'svc-mobile-name': 'تطبيقات الجوال',
    'svc-mobile-desc': 'تطبيقات iOS/Android أصلية ومتعددة المنصات مع تجربة مستخدم سلسة وهندسة offline-first.',
    'svc-systems-name':'أنظمة مخصصة',
    'svc-systems-desc':'أنظمة مؤسسية مخصصة وتكاملات ERP وسير عمل آلي ومنصات خلفية مصممة لعملك.',
    'svc-consult-name':'استشارات تقنية',
    'svc-consult-desc':'مراجعات الهندسة المعمارية واستراتيجية التقنية وتدقيق الكود وإرشادات الخبراء لاتخاذ القرارات الصحيحة.',
    'explore-services':'استكشف الخدمات →',

    // Services page
    'services-page-tag':    '⚙️ ما نقدمه',
    'services-page-heading':'خدماتنا',
    'services-page-sub':    'خدمات تطوير برمجيات متكاملة من الاستراتيجية والتصميم إلى النشر والدعم.',

    // Testimonials
    'testi-tag':       '💬 آراء العملاء',
    'testi-heading':   'ماذا يقول عملاؤنا',

    // CTA
    'cta-title':       'جاهز لبناء شيء عظيم؟',
    'cta-desc':        'أخبرنا بفكرتك. سنحولها إلى منتج رقمي عالمي المستوى.',
    'cta-btn-start':   'ابدأ مشروعك',
    'cta-btn-browse':  'تصفح المنتجات',

    // Contact page
    'contact-tag':     '📬 تواصل معنا',
    'contact-heading': 'لنبني معاً',
    'contact-sub':     'هل لديك مشروع في ذهنك؟ يسعدنا سماعه. أرسل لنا رسالة وسنرد خلال 24 ساعة.',
    'form-heading':    'أرسل لنا رسالة',
    'label-name':      'الاسم الكامل *',
    'label-email':     'البريد الإلكتروني *',
    'label-phone':     'رقم الهاتف',
    'label-service':   'الخدمة المطلوبة *',
    'label-budget':    'ميزانية المشروع',
    'label-message':   'تفاصيل المشروع *',
    'ph-name':         'محمد أحمد',
    'ph-email':        'john@company.com',
    'ph-phone':        '+966 5X XXX XXXX',
    'ph-message':      'صف مشروعك وأهدافك والجدول الزمني وأي تفاصيل أخرى…',
    'opt-service-default':'اختر خدمة…',
    'opt-web':         'تطوير الويب',
    'opt-mobile':      'تطوير تطبيقات الجوال',
    'opt-system':      'نظام مخصص / ERP',
    'opt-consulting':  'استشارات تقنية',
    'opt-product':     'ترخيص منتج',
    'opt-other':       'أخرى',
    'opt-budget-default':'اختر النطاق السعري…',
    'submit-form':     'إرسال الرسالة →',
    'contact-info-heading':'معلومات التواصل',
    'contact-info-sub':'تواصل معنا عبر أي من القنوات التالية. نرد عادةً في غضون ساعات.',

    // Footer
    'footer-copyright':'© 2026 مجموعة زاوان للبرمجة. جميع الحقوق محفوظة.',
    'footer-built':    'صُنع بـ ❤️ من زاوان',
    'footer-stay-updated':'ابقَ على اطلاع',
    'footer-newsletter-desc':'احصل على آخر التحديثات حول المنتجات والميزات الجديدة.',
    'footer-col-products':'المنتجات',
    'footer-col-company':'الشركة',

    // Typewriter phrases
    'typewriter': [
      'حلول برمجية مخصصة',
      'أنظمة مؤسسية',
      'تطبيقات جوال',
      'منصات ويب',
      'أدوات الذكاء الاصطناعي',
      'استشارات تقنية',
    ],
  },
};

/* ============================================================
   Language Manager
   ============================================================ */
(function initLanguage() {
  const STORAGE_KEY = 'zawan-lang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

  function t(key) {
    const lang = TRANSLATIONS[currentLang];
    return lang && lang[key] !== undefined ? lang[key] : (TRANSLATIONS.en[key] || key);
  }

  function applyTranslations() {
    const lang = currentLang;
    const isAr = lang === 'ar';

    // Document direction & lang
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else if (el.tagName === 'OPTION') {
        el.textContent = val;
      } else {
        el.textContent = val;
      }
    });

    // Update lang toggle buttons
    document.querySelectorAll('.btn-lang').forEach(btn => {
      btn.textContent = isAr ? 'EN' : 'AR';
      btn.setAttribute('aria-label', isAr ? 'Switch to English' : 'التبديل إلى العربية');
    });

    // Update typewriter phrases if typewriter is running
    if (window.setTypewriterPhrases) {
      window.setTypewriterPhrases(t('typewriter'));
    }

    // RTL adjustments for navbar mobile menu positioning
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && isAr) {
      navLinks.style.textAlign = 'right';
    } else if (navLinks) {
      navLinks.style.textAlign = '';
    }
  }

  function switchLang() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem(STORAGE_KEY, currentLang);
    applyTranslations();
  }

  // Expose globally
  window.zawaLang = { t, switch: switchLang, current: () => currentLang };

  // Attach click handler (works for dynamically added buttons too)
  document.addEventListener('click', e => {
    if (e.target.classList.contains('btn-lang')) switchLang();
  });

  // Apply on page load (after DOM ready)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTranslations);
  } else {
    applyTranslations();
  }
})();
