// Loader fade
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Smooth scrolling
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Back to top button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Mobile menu toggle with ARIA
const mobileMenuBtn = document.querySelector('.mobile-menu');
const mainNav = document.getElementById('mainNav');
if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
        const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !expanded);
        mainNav.style.display = expanded ? 'none' : 'block';
        if (!expanded) {
            mainNav.querySelector('a').focus();
        }
    });
    // Close menu on link click (mobile)
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 769) {
                mainNav.style.display = 'none';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Contact form tabs with ARIA and keyboard navigation
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        tabBtns.forEach((b, i) => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
            b.setAttribute('tabindex', '-1');
            tabContents[i].classList.remove('active');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        btn.setAttribute('tabindex', '0');
        document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
        btn.focus();
    });
    btn.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            let newIdx = idx + (e.key === 'ArrowRight' ? 1 : -1);
            if (newIdx < 0) newIdx = tabBtns.length - 1;
            if (newIdx >= tabBtns.length) newIdx = 0;
            tabBtns[newIdx].click();
        }
    });
});

// Contact form validation and feedback
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Basic validation
        let valid = true;
        this.querySelectorAll('[required]').forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--primary-color)';
                valid = false;
            } else {
                input.style.borderColor = '';
            }
        });
        if (!valid) {
            alert('Please fill in all required fields.');
            return;
        }
        alert('Thank you for your inquiry! We will contact you shortly.');
        this.reset();
    });
}

// Newsletter form validation
const newsletterForm = document.querySelector('.footer-column form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const errorMsg = this.querySelector('.newsletter-error');
        const successMsg = this.querySelector('.newsletter-success');
        if (errorMsg) errorMsg.style.display = 'none';
        if (successMsg) successMsg.style.display = 'none';
        const email = emailInput.value.trim();
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            if (errorMsg) {
                errorMsg.textContent = 'Please enter a valid email address.';
                errorMsg.style.display = 'block';
            } else {
                alert('Please enter a valid email address.');
            }
            return;
        }
        if (successMsg) {
            successMsg.textContent = 'Subscribed! Check your inbox.';
            successMsg.style.display = 'block';
        } else {
            alert('Subscribed! Check your inbox.');
        }
        this.reset();
    });
}

// Testimonials carousel
const testimonialCards = document.querySelectorAll('#testimonialCarousel .testimonial-card');
let testimonialIndex = 0;
function showTestimonial(idx) {
    testimonialCards.forEach((card, i) => {
        card.setAttribute('aria-hidden', i !== idx);
        card.style.display = i === idx ? 'block' : 'none';
    });
}
if (testimonialCards.length > 0) {
    showTestimonial(testimonialIndex);
    document.getElementById('prevTestimonial').addEventListener('click', () => {
        testimonialIndex = (testimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(testimonialIndex);
    });
    document.getElementById('nextTestimonial').addEventListener('click', () => {
        testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
        showTestimonial(testimonialIndex);
    });
}

// Gallery filters
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter gallery items
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        
        // Close all other FAQ items
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.classList.remove('active');
            }
        });
        
        // Toggle current FAQ item
        question.setAttribute('aria-expanded', !isExpanded);
        if (!isExpanded) {
            answer.classList.add('active');
        } else {
            answer.classList.remove('active');
        }
    });
    
    // Keyboard navigation for FAQ
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// Add CSS animation for gallery fade in
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Pricing Calculator Tabs
const calcTabs = document.querySelectorAll('.calc-tab');
const calcSections = document.querySelectorAll('.calc-section');

calcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetCalc = tab.getAttribute('data-calc');
        
        // Update active tab
        calcTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding section
        calcSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === `${targetCalc}-calc`) {
                section.classList.add('active');
            }
        });
    });
});

// Pricing Calculator Functions
function calculateCattlePrice() {
    const type = document.getElementById('cattle-type-calc').value;
    const breed = document.getElementById('cattle-breed-calc').value;
    const weight = parseFloat(document.getElementById('cattle-weight').value);
    const quantity = parseInt(document.getElementById('cattle-quantity').value);
    
    if (!type || !breed || !weight || !quantity) {
        alert('Please fill in all fields');
        return;
    }
    
    // Base prices per kg (these would be updated with real market prices)
    const basePrices = {
        'bull': { 'brahman': 8.5, 'angus': 9.2, 'hereford': 8.8 },
        'heifer': { 'brahman': 7.8, 'angus': 8.5, 'hereford': 8.0 },
        'steer': { 'brahman': 7.2, 'angus': 7.8, 'hereford': 7.5 },
        'cow': { 'brahman': 6.5, 'angus': 7.0, 'hereford': 6.8 }
    };
    
    const basePrice = basePrices[type][breed];
    const totalPrice = basePrice * weight * quantity;
    
    document.getElementById('cattle-price').textContent = totalPrice.toFixed(2);
    document.getElementById('cattle-result').classList.add('show');
}

function calculateBeefPrice() {
    const cut = document.getElementById('beef-cut').value;
    const weight = parseFloat(document.getElementById('beef-weight').value);
    const quantity = parseInt(document.getElementById('beef-quantity').value);
    
    if (!cut || !weight || !quantity) {
        alert('Please fill in all fields');
        return;
    }
    
    // Prices per kg
    const prices = {
        'ribeye': 42.99,
        'tenderloin': 49.99,
        'ground': 24.99,
        'sirloin': 35.99
    };
    
    const pricePerKg = prices[cut];
    const totalPrice = pricePerKg * weight * quantity;
    
    document.getElementById('beef-price').textContent = totalPrice.toFixed(2);
    document.getElementById('beef-result').classList.add('show');
}