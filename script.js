// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
        }
    });
});

// Product Filtering
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const productList = document.querySelector('.product-list');

// Extended product data with categories
const allProducts = [
    {
        name: "RO Water Purifier",
        description: "Advanced 7-stage RO purification system with UV protection",
        image: "images/ro-purifier.jpg",
        price: 15999,
        category: "residential",
        features: [
            "7-stage purification",
            "UV protection",
            "TDS controller",
            "Smart LED display",
            "1 year warranty"
        ]
    },
    {
        name: "Commercial Water Filter",
        description: "Heavy-duty filtration system for offices and commercial spaces",
        image: "images/commercial-filter.jpg",
        price: 45999,
        category: "commercial",
        features: [
            "High flow rate",
            "Multiple filter stages",
            "Stainless steel housing",
            "Easy maintenance",
            "2 years warranty"
        ]
    },
    {
        name: "Portable Water Filter",
        description: "Compact and efficient filter for travel and outdoor use",
        image: "images/portable-filter.jpg",
        price: 2999,
        category: "portable",
        features: [
            "Lightweight design",
            "BPA-free materials",
            "Quick installation",
            "Long filter life",
            "6 months warranty"
        ]
    },
    {
        name: "Under Sink Filter",
        description: "Space-saving solution for your kitchen with advanced filtration",
        image: "images/under-sink.jpg",
        price: 8999,
        category: "residential",
        features: [
            "Space-saving design",
            "Easy installation",
            "Multiple filter stages",
            "Lead removal",
            "1 year warranty"
        ]
    },
    {
        name: "Industrial Water System",
        description: "High-capacity system for factories and large facilities",
        image: "images/industrial-system.jpg",
        price: 89999,
        category: "commercial",
        features: [
            "High capacity",
            "Industrial grade",
            "Customizable setup",
            "Remote monitoring",
            "3 years warranty"
        ]
    }
];

function filterProducts() {
    const selectedCategory = categoryFilter.value;
    const selectedPrice = priceFilter.value;
    
    let filteredProducts = allProducts;
    
    // Filter by category
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === selectedCategory
        );
    }
    
    // Filter by price
    if (selectedPrice !== 'all') {
        const [min, max] = selectedPrice.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }
    
    // Display filtered products
    displayProducts(filteredProducts);
}

function createProductCard(product) {
    const featuresList = product.features.map(feature => `<li>${feature}</li>`).join('');
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <ul class="product-features">
                    ${featuresList}
                </ul>
                <p class="price">₹${product.price.toLocaleString()}</p>
                <a href="contact.html" class="cta-button">Inquire Now</a>
            </div>
        </div>
    `;
}

function displayProducts(products) {
    if (productList) {
        productList.innerHTML = '';
        products.forEach(product => {
            productList.innerHTML += createProductCard(product);
        });
    }
}

// Initialize product display
if (productList) {
    displayProducts(allProducts);
}

// Add event listeners for filters
if (categoryFilter && priceFilter) {
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Slideshow functionality
let slideIndex = 1;
showSlides(slideIndex);

// Auto advance slides every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    
    // Show current slide and activate corresponding dot
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active-dot";
}

// Header Scroll Effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}); 