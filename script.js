// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 65, 0.2)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    }
    
    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Matrix background effect
function createMatrixEffect() {
    const matrixBg = document.querySelector('.matrix-bg');
    if (!matrixBg) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    matrixBg.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const letters = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize matrix effect
createMatrixEffect();

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .cert-card, .highlight-item').forEach(el => {
    observer.observe(el);
});

// Typing effect for hero subtitle
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Terminal command effect (optional easter egg)
let commandSequence = 0;
const commands = [
    'root@pentester:~$ whoami',
    'mohammed_aisha',
    'root@pentester:~$ ls -la /skills',
    'total 48',
    'drwxr-xr-x  2 root root 4096 Feb  6 2024 penetration-testing',
    'drwxr-xr-x  2 root root 4096 Feb  6 2024 red-teaming',
    'drwxr-xr-x  2 root root 4096 Feb  6 2024 exploit-development',
    'root@pentester:~$ cat /etc/motto',
    'Think like an attacker. Protect like a defender.',
    'root@pentester:~$'
];

document.addEventListener('keydown', (e) => {
    // Konami code or custom sequence detection can be added here
    if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        console.log('%c' + commands.join('\n'), 'color: #00ff41; font-family: monospace; font-size: 14px;');
    }
});

// Smooth reveal for sections
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.15
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    sectionObserver.observe(section);
});

// Add subtle glow effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        this.style.transition = 'all 0.3s ease';
    });
});

// Console welcome message
console.log('%c' + `
 _____         _           _            
|  __ \\       | |         | |           
| |__) |__ _ _| |_ ___ ___| |_ ___ _ __ 
|  ___/ _ \\ ' _  / __|/ _ | '_/ _ \\ '__|
| |  |  __/ | | | \\__ \\  __/ | |  __/ |   
|_|   \\___|_| |_| |___/\\___|_|  \\___|_|   
                                          
Welcome to my portfolio!
Ethical Hacking | Penetration Testing | Red Team Operations
Press Ctrl+I for terminal mode
`, 'color: #00ff41; font-family: monospace; font-weight: bold;');

console.log('%cSecurity Notice: This portfolio demonstrates ethical hacking skills. All work is conducted with proper authorization and follows responsible disclosure practices.', 'color: #00d4ff; font-size: 12px;');

// Prevent right-click (optional - can be removed if desired)
// document.addEventListener('contextmenu', e => e.preventDefault());

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Dynamic year in footer
const footer = document.querySelector('.footer p');
if (footer && footer.textContent.includes('2024')) {
    const currentYear = new Date().getFullYear();
    footer.textContent = footer.textContent.replace('2024', currentYear);
}

// Skills progress animation
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px)';
    });
});

// Add glitch effect on hover to hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', function() {
        this.style.animation = 'glitch-anim 0.3s infinite';
    });
    
    heroTitle.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
}
