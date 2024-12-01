'use strict';

// Element toggle function
const elementToggleFunc = (elem) => {
    if (elem) elem.classList.toggle('active');
};

// Sidebar variables
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

// Sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));
}

// Testimonials variables
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

// Modal toggle function
const testimonialsModalFunc = () => {
    if (modalContainer && overlay) {
        modalContainer.classList.toggle('active');
        overlay.classList.toggle('active');
    }
};

// Add click event to all modal items
testimonialsItem.forEach((item) => {
    item.addEventListener('click', function () {
        const avatar = this.querySelector('[data-testimonials-avatar]');
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt;
        modalTitle.textContent = this.querySelector(
            '[data-testimonials-title]',
        ).textContent;
        modalText.textContent = this.querySelector(
            '[data-testimonials-text]',
        ).textContent;
        testimonialsModalFunc();
    });
});

// Add click event to modal close button
if (modalCloseBtn && overlay) {
    modalCloseBtn.addEventListener('click', testimonialsModalFunc);
    overlay.addEventListener('click', testimonialsModalFunc);
}

// Custom select variables
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

// Filter function
const filterFunc = (selectedValue) => {
    filterItems.forEach((item) => {
        item.classList.toggle(
            'active',
            selectedValue === 'all' || selectedValue === item.dataset.category,
        );
    });
};

// Handle select functionality
if (select) {
    select.addEventListener('click', () => elementToggleFunc(select));

    selectItems.forEach((item) => {
        item.addEventListener('click', function () {
            const selectedValue = this.innerText.toLowerCase();
            selectValue.innerText = this.innerText;
            elementToggleFunc(select);
            filterFunc(selectedValue);
        });
    });
}

// Filter button functionality
let lastClickedBtn = filterBtn.length > 0 ? filterBtn[0] : null;

filterBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
        const selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        if (lastClickedBtn) lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;
    });
});

// Contact form validation
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formInputs.length > 0) {
    formInputs.forEach((input) => {
        input.addEventListener('input', function () {
            if (form.checkValidity()) {
                formBtn.removeAttribute('disabled');
            } else {
                formBtn.setAttribute('disabled', '');
            }
        });
    });
}

// Navigation functionality
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

const toggleActivePage = (pageName) => {
    pages.forEach((page) => page.classList.remove('active'));
    const targetPage = document.querySelector(`[data-page="${pageName}"]`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
};

navLinks.forEach((link) => {
    link.addEventListener('click', function () {
        const pageName = this.dataset.navLink;
        toggleActivePage(pageName);

        navLinks.forEach((navLink) => navLink.classList.remove('active'));
        this.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
