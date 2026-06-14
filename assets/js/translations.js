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

    // ── Underscore aliases (match HTML data-i18n attributes) ──
    'nav_home':        'Home',
    'nav_products':    'Products',
    'nav_services':    'Services',
    'nav_contact':     'Contact',
    'nav_cta':         'Get Started',

    'hero_badge':      'Available for new projects',
    'hero_title_1':    'Engineering the',
    'hero_title_2':    'Future, One Line',
    'hero_title_3':    'at a Time',
    'hero_desc':       'We build cutting-edge software solutions — from enterprise systems to mobile apps, we turn ideas into powerful digital products.',
    'hero_btn1':       'Explore Products',
    'hero_btn2':       'Our Services',
    'hero_float1':     '🚀 50+ Projects Shipped',
    'hero_float2':     '✅ 99% Satisfaction',
    'hero_card_title': 'ZAWAN Analytics',
    'hero_card_sub':   'Performance Dashboard',

    'stat1_label':     'Projects Delivered',
    'stat2_label':     'Happy Clients',
    'stat3_label':     'Years of Experience',
    'stat4_label':     'Client Satisfaction',

    'products_tag':      '🛠️ Our Products',
    'products_title':    'Featured',
    'products_title_grad':'Solutions',
    'products_subtitle': 'Powerful, scalable, and ready-to-deploy software systems built for modern businesses.',
    'products_viewall':  'View All Products →',

    'p1_title': 'Task Management System',
    'p1_desc':  'Enterprise-grade project and task management with real-time collaboration, Kanban boards, and advanced reporting.',
    'p2_title': 'E-Commerce Platform',
    'p2_desc':  'Full-featured e-commerce solution with inventory, payments, analytics, and multi-vendor support out of the box.',
    'p3_title': 'Hospital Management System',
    'p3_desc':  'Complete healthcare platform covering patient records, appointments, billing, and staff management.',
    'p4_title': 'Real-time Chat App',
    'p4_desc':  'Scalable messaging platform with end-to-end encryption, channels, bots, file sharing, and video call support.',
    'p5_title': 'Inventory System',
    'p5_desc':  'Smart warehouse and stock management with barcode scanning, automated reordering, and multi-location tracking.',
    'p6_title': 'AI Dashboard',
    'p6_desc':  'Unified AI analytics dashboard integrating machine learning models, data pipelines, and business intelligence reports.',
    'getit':    'Get it',

    'services_tag':       '⚙️ What We Do',
    'services_title':     'Our Core',
    'services_title_grad':'Services',
    'services_subtitle':  'From concept to deployment — we handle the complete software development lifecycle.',
    'explore_services':   'Explore Services →',

    's1_title': 'Web Development',
    's1_desc':  'Custom web applications, SaaS platforms, and enterprise portals built with modern frameworks.',
    's2_title': 'Mobile Apps',
    's2_desc':  'Cross-platform and native iOS/Android applications with seamless UX and offline-first architecture.',
    's3_title': 'Custom Systems',
    's3_desc':  'Bespoke enterprise systems, ERP integrations, automation workflows tailored to your business.',
    's4_title': 'Technical Consulting',
    's4_desc':  'Architecture reviews, technology strategy, code audits, and expert guidance for the right decisions.',

    'testi_tag':       '💬 Testimonials',
    'testi_title':     'What Clients',
    'testi_title_grad':'Say',

    'cta_title': 'Ready to Build Something Great?',
    'cta_desc':  "Tell us your idea. We'll turn it into a world-class digital product.",
    'cta_btn1':  'Start a Project',
    'cta_btn2':  'Browse Products',

    'footer_desc':            'Engineering the Future, One Line at a Time.',
    'footer_products':        'Products',
    'footer_company':         'Company',
    'footer_about':           'About Us',
    'footer_privacy':         'Privacy Policy',
    'footer_updated':         'Stay Updated',
    'footer_newsletter_desc': 'Get updates on new products and services.',
    'footer_copyright':       '© 2026 ZAWAN Programming Group. All rights reserved.',
    'footer_built':           'Built with ❤️ by ZAWAN',

    'contact_tag':        '📬 Get In Touch',
    'contact_title':      "Let's Build",
    'contact_title_grad': 'Together',
    'contact_subtitle':   "Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.",
    'form_title':         'Send Us a',
    'form_title_grad':    'Message',
    'label_name':         'Full Name *',
    'label_email':        'Email Address *',
    'label_phone':        'Phone Number',
    'label_service':      'Service Interested In *',
    'label_budget':       'Project Budget',
    'label_message':      'Project Details *',
    'ph_name':            'John Smith',
    'ph_email':           'john@company.com',
    'ph_phone':           '+1 (555) 000-0000',
    'ph_message':         'Describe your project, goals, timeline...',
    'select_service':     'Select a service…',
    'select_budget':      'Select your budget range…',
    'opt_web':            'Web Development',
    'opt_mobile':         'Mobile App Development',
    'opt_system':         'Custom System / ERP',
    'opt_consulting':     'Technical Consulting',
    'opt_product':        'Product License',
    'opt_other':          'Other',
    'opt_under1k':        'Under $1,000',
    'opt_1k5k':           '$1,000 – $5,000',
    'opt_5k15k':          '$5,000 – $15,000',
    'opt_15k50k':         '$15,000 – $50,000',
    'opt_50kplus':        '$50,000+',
    'submit_btn':         'Send Message →',

    'contact_info_title': 'Contact',
    'contact_info_grad':  'Information',
    'contact_info_sub':   'Reach us through any of the channels below. We typically respond within a few hours.',
    'cic1_title':         'Email Us',
    'cic2_title':         'Call Us',
    'cic3_title':         'Our Location',
    'cic3_val':           'Remote-first team',
    'cic3_sub':           'Working globally across all timezones',
    'cic4_title':         'Response Time',
    'cic4_val':           'Under 24 hours',
    'cic4_sub':           'Usually within a few hours',
    'follow_us':          'Follow Us',
    'faq_title':          'Quick FAQ',
    'faq1_q':             'How long does a project take?',
    'faq1_a':             'Simple websites: 2–4 weeks. Complex systems: 2–6 months depending on scope.',
    'faq2_q':             'Do you offer post-launch support?',
    'faq2_a':             'Yes. All projects include at minimum 30 days of free support. Extended plans available.',
    'faq3_q':             'Can I see the source code?',
    'faq3_a':             'Absolutely. All custom projects come with full source code ownership transferred to you.',

    'err_name':       'Name must be at least 3 characters (letters only)',
    'err_email':      'Please enter a valid email address',
    'err_phone':      'Please enter a valid phone number',
    'err_service':    'Please select a service',
    'err_message':    'Message must be at least 20 characters',
    'submit_success': '✓ Message Sent!',

    // Services page
    'services_page_tag':     '⚙️ What We Offer',
    'services_page_heading': 'Our Services',
    'services_page_sub':     'End-to-end software development services from strategy and design to deployment and support.',

    // Products page
    'products_page_tag':     '🛠️ Our Catalog',
    'products_page_heading': 'All Products',
    'products_page_sub':     'Production-ready software solutions you can license, customize, and deploy immediately.',
    'filter_all':            'All',
    'filter_systems':        'Systems',
    'filter_apps':           'Apps',
    'filter_websites':       'Websites',
    'filter_automation':     'Automation',
    'search_placeholder':    'Search products…',
    'products_cta_title':    'Need a Custom Solution?',
    'products_cta_desc':     'We build tailor-made systems from scratch. Tell us what you need.',
    'products_cta_btn1':     'Contact Us',
    'products_cta_btn2':     'View Services',
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

    // ── Underscore aliases (match HTML data-i18n attributes) ──
    'nav_home':        'الرئيسية',
    'nav_products':    'المنتجات',
    'nav_services':    'الخدمات',
    'nav_contact':     'تواصل معنا',
    'nav_cta':         'ابدأ الآن',

    'hero_badge':      'متاحون لمشاريع جديدة',
    'hero_title_1':    'نهندس المستقبل،',
    'hero_title_2':    'سطراً بسطر',
    'hero_title_3':    '',
    'hero_desc':       'نبني حلول برمجية متطورة — من الأنظمة المؤسسية إلى تطبيقات الجوال، نحوّل أفكارك إلى منتجات رقمية قوية.',
    'hero_btn1':       'استكشف المنتجات',
    'hero_btn2':       'خدماتنا',
    'hero_float1':     '🚀 +50 مشروع منجز',
    'hero_float2':     '✅ 99% رضا العملاء',
    'hero_card_title': 'تحليلات زاوان',
    'hero_card_sub':   'لوحة الأداء',

    'stat1_label':     'مشروع مُنجز',
    'stat2_label':     'عميل سعيد',
    'stat3_label':     'سنوات خبرة',
    'stat4_label':     'رضا العملاء',

    'products_tag':       '🛠️ منتجاتنا',
    'products_title':     'حلول',
    'products_title_grad':'مميزة',
    'products_subtitle':  'أنظمة برمجية قوية وقابلة للتوسع وجاهزة للنشر مبنية للأعمال الحديثة.',
    'products_viewall':   'عرض جميع المنتجات →',

    'p1_title': 'نظام إدارة المهام',
    'p1_desc':  'إدارة مشاريع ومهام على مستوى المؤسسات مع تعاون في الوقت الفعلي ولوحات كانبان وتقارير متقدمة.',
    'p2_title': 'منصة التجارة الإلكترونية',
    'p2_desc':  'حل تجارة إلكترونية متكامل مع إدارة المخزون والمدفوعات والتحليلات ودعم متعدد البائعين.',
    'p3_title': 'نظام إدارة المستشفيات',
    'p3_desc':  'منصة رعاية صحية متكاملة تغطي سجلات المرضى والمواعيد والفوترة وإدارة الموظفين.',
    'p4_title': 'تطبيق المحادثة الفورية',
    'p4_desc':  'منصة مراسلة قابلة للتوسع مع تشفير من طرف لطرف وقنوات وروبوتات ومشاركة ملفات ودعم مكالمات الفيديو.',
    'p5_title': 'نظام إدارة المخزون',
    'p5_desc':  'إدارة ذكية للمستودعات والمخزون مع مسح الباركود وإعادة الطلب الآلي والتتبع متعدد المواقع.',
    'p6_title': 'لوحة تحكم الذكاء الاصطناعي',
    'p6_desc':  'لوحة تحليلات ذكاء اصطناعي موحدة تدمج نماذج تعلم الآلة وخطوط بيانات وتقارير ذكاء الأعمال.',
    'getit':    'احصل عليه',

    'services_tag':        '⚙️ ما نقدمه',
    'services_title':      'خدماتنا',
    'services_title_grad': 'الأساسية',
    'services_subtitle':   'من الفكرة إلى النشر — نتولى دورة حياة تطوير البرمجيات بالكامل.',
    'explore_services':    'استكشف الخدمات →',

    's1_title': 'تطوير الويب',
    's1_desc':  'تطبيقات ويب مخصصة ومنصات SaaS وبوابات مؤسسية مبنية بأحدث الأطر وأفضل الممارسات.',
    's2_title': 'تطبيقات الجوال',
    's2_desc':  'تطبيقات iOS/Android أصلية ومتعددة المنصات مع تجربة مستخدم سلسة وهندسة offline-first.',
    's3_title': 'أنظمة مخصصة',
    's3_desc':  'أنظمة مؤسسية مخصصة وتكاملات ERP وسير عمل آلي ومنصات خلفية مصملة لعملك.',
    's4_title': 'استشارات تقنية',
    's4_desc':  'مراجعات الهندسة المعمارية واستراتيجية التقنية وتدقيق الكود وإرشادات الخبراء لاتخاذ القرارات الصحيحة.',

    'testi_tag':        '💬 آراء العملاء',
    'testi_title':      'ماذا يقول',
    'testi_title_grad': 'عملاؤنا',

    'cta_title': 'جاهز لبناء شيء عظيم؟',
    'cta_desc':  'أخبرنا بفكرتك. سنحولها إلى منتج رقمي عالمي المستوى.',
    'cta_btn1':  'ابدأ مشروعك',
    'cta_btn2':  'تصفح المنتجات',

    'footer_desc':            'نهندس المستقبل، سطراً بسطر.',
    'footer_products':        'المنتجات',
    'footer_company':         'الشركة',
    'footer_about':           'من نحن',
    'footer_privacy':         'سياسة الخصوصية',
    'footer_updated':         'ابقَ على اطلاع',
    'footer_newsletter_desc': 'احصل على آخر التحديثات حول المنتجات والخدمات.',
    'footer_copyright':       '© 2026 مجموعة زاوان للبرمجة. جميع الحقوق محفوظة.',
    'footer_built':           'صُنع بـ ❤️ من زاوان',

    'contact_tag':        '📬 تواصل معنا',
    'contact_title':      'لنبني',
    'contact_title_grad': 'معاً',
    'contact_subtitle':   'هل لديك مشروع في ذهنك؟ يسعدنا سماعه. أرسل لنا رسالة وسنرد خلال 24 ساعة.',
    'form_title':         'أرسل لنا',
    'form_title_grad':    'رسالة',
    'label_name':         'الاسم الكامل *',
    'label_email':        'البريد الإلكتروني *',
    'label_phone':        'رقم الهاتف',
    'label_service':      'الخدمة المطلوبة *',
    'label_budget':       'ميزانية المشروع',
    'label_message':      'تفاصيل المشروع *',
    'ph_name':            'محمد أحمد',
    'ph_email':           'john@company.com',
    'ph_phone':           '+966 5X XXX XXXX',
    'ph_message':         'صف مشروعك وأهدافك والجدول الزمني وأي تفاصيل أخرى…',
    'select_service':     'اختر خدمة…',
    'select_budget':      'اختر النطاق السعري…',
    'opt_web':            'تطوير الويب',
    'opt_mobile':         'تطوير تطبيقات الجوال',
    'opt_system':         'نظام مخصص / ERP',
    'opt_consulting':     'استشارات تقنية',
    'opt_product':        'ترخيص منتج',
    'opt_other':          'أخرى',
    'opt_under1k':        'أقل من $1,000',
    'opt_1k5k':           '$1,000 – $5,000',
    'opt_5k15k':          '$5,000 – $15,000',
    'opt_15k50k':         '$15,000 – $50,000',
    'opt_50kplus':        '$50,000+',
    'submit_btn':         'إرسال الرسالة →',

    'contact_info_title': 'معلومات',
    'contact_info_grad':  'التواصل',
    'contact_info_sub':   'تواصل معنا عبر أي من القنوات التالية. نرد عادةً في غضون ساعات.',
    'cic1_title':         'راسلنا',
    'cic2_title':         'اتصل بنا',
    'cic3_title':         'موقعنا',
    'cic3_val':           'فريق عن بُعد',
    'cic3_sub':           'نعمل عالمياً عبر جميع المناطق الزمنية',
    'cic4_title':         'وقت الاستجابة',
    'cic4_val':           'خلال 24 ساعة',
    'cic4_sub':           'عادةً في غضون ساعات قليلة',
    'follow_us':          'تابعنا',
    'faq_title':          'أسئلة شائعة',
    'faq1_q':             'كم يستغرق المشروع؟',
    'faq1_a':             'المواقع البسيطة: 2–4 أسابيع. الأنظمة المعقدة: 2–6 أشهر حسب النطاق.',
    'faq2_q':             'هل تقدمون دعماً بعد الإطلاق؟',
    'faq2_a':             'نعم. جميع المشاريع تشمل 30 يوماً من الدعم المجاني. خطط موسعة متاحة.',
    'faq3_q':             'هل يمكنني الاطلاع على الكود المصدري؟',
    'faq3_a':             'بالتأكيد. جميع المشاريع المخصصة تأتي مع نقل كامل لملكية الكود المصدري إليك.',

    'err_name':       'الاسم يجب أن يكون 3 أحرف على الأقل (أحرف فقط)',
    'err_email':      'يرجى إدخال بريد إلكتروني صحيح',
    'err_phone':      'يرجى إدخال رقم هاتف صحيح',
    'err_service':    'يرجى اختيار خدمة',
    'err_message':    'الرسالة يجب أن تكون 20 حرفاً على الأقل',
    'submit_success': '✓ تم إرسال رسالتك!',

    // Services page
    'services_page_tag':     '⚙️ ما نقدمه',
    'services_page_heading': 'خدماتنا',
    'services_page_sub':     'خدمات تطوير برمجيات متكاملة من الاستراتيجية والتصميم إلى النشر والدعم.',

    // Products page
    'products_page_tag':     '🛠️ كتالوجنا',
    'products_page_heading': 'جميع المنتجات',
    'products_page_sub':     'حلول برمجية جاهزة للإنتاج يمكنك ترخيصها وتخصيصها ونشرها فوراً.',
    'filter_all':            'الكل',
    'filter_systems':        'الأنظمة',
    'filter_apps':           'التطبيقات',
    'filter_websites':       'المواقع',
    'filter_automation':     'الأتمتة',
    'search_placeholder':    'ابحث عن المنتجات…',
    'products_cta_title':    'هل تحتاج حلاً مخصصاً؟',
    'products_cta_desc':     'نبني أنظمة مصممة خصيصاً من الصفر. أخبرنا بما تحتاج.',
    'products_cta_btn1':     'تواصل معنا',
    'products_cta_btn2':     'عرض الخدمات',
  },
};

/* ============================================================
   Language Manager
   ============================================================ */
(function initLanguage() {
  const STORAGE_KEY = 'zawan-lang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

  function t(key) {
    const hyphenKey = key.replace(/_/g, '-');
    const lang = TRANSLATIONS[currentLang];
    const val = lang && (lang[key] !== undefined ? lang[key] : lang[hyphenKey]);
    if (val !== undefined) return val;
    const en = TRANSLATIONS.en;
    return (en[key] !== undefined ? en[key] : en[hyphenKey]) || key;
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
      el.textContent = val;
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      const val = t(key);
      if (val !== key) el.placeholder = val;
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
