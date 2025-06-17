// Бургер-меню
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.classList.toggle('toggle');
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            burger.classList.remove('toggle');
        }
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Анимация при прокрутке
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('load', fadeInOnScroll);
window.addEventListener('scroll', fadeInOnScroll);
// Поиск
const searchToggle = document.getElementById('search-toggle');
const searchContainer = document.getElementById('search-container');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const mobileSearchBtn = document.getElementById('mobile-search-btn');
const mobileSearchInput = document.getElementById('mobile-search-input');

// Плавное появление поисковой строки
searchToggle.addEventListener('click', () => {
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
        searchInput.focus();
    }
});

const performSearch = (query) => {
    if (query.trim() !== '') {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
};

searchBtn.addEventListener('click', () => {
    performSearch(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(searchInput.value);
    }
});

mobileSearchBtn.addEventListener('click', () => {
    performSearch(mobileSearchInput.value);
});

mobileSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(mobileSearchInput.value);
    }
});

// Темная тема
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const body = document.body;

const updateThemeIcons = (isDark) => {
    const themeIcon = themeToggle.querySelector('img');
    const themeIconMobile = themeToggleMobile.querySelector('img');
    const searchIcon = searchToggle.querySelector('img');
    
    if (isDark) {
        themeIcon.src = './img/nightwhite.svg';
        themeIconMobile.src = './img/nightwhite.svg';
        searchIcon.src = './img/searchwhite.svg';
    } else {
        themeIcon.src = './img/night.svg';
        themeIconMobile.src = './img/night.svg';
        searchIcon.src = './img/search.svg';
    }
};

const toggleTheme = () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDark);
    updateThemeIcons(isDark);
};

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);


if (localStorage.getItem('darkTheme') === 'true') {
    body.classList.add('dark-theme');
    updateThemeIcons(true);
}

const modal = document.getElementById('feedback-modal');
const contactBtns = document.querySelectorAll('.contact-btn, .details-btn');
const closeModal = document.querySelector('.close-modal');
const feedbackForm = document.getElementById('feedback-form');

contactBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; 
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; 
});


window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(feedbackForm);
    const data = Object.fromEntries(formData);
    
    console.log('Форма отправлена:', data);
    
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    feedbackForm.reset();

    alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
});