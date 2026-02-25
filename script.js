document.addEventListener("DOMContentLoaded", () => {
    
    const themeBtn = document.getElementById('theme-toggle');
    const langBtn = document.getElementById('lang-toggle');
    const htmlEl = document.documentElement;
    const tElements = document.querySelectorAll('.t');
    const brandLogo = document.getElementById('brand-logo');
    const logoSub = document.getElementById('logo-subtext');

    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);

    themeBtn.addEventListener('click', () => {
        let current = htmlEl.getAttribute('data-theme');
        let next = current === 'light' ? 'dark' : 'light';
        htmlEl.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    let isMarathi = localStorage.getItem('lang') === 'mr';
    updateLanguage();

    langBtn.addEventListener('click', () => {
        isMarathi = !isMarathi;
        localStorage.setItem('lang', isMarathi ? 'mr' : 'en');
        updateLanguage();
    });

    function updateLanguage() {
        tElements.forEach(el => {
            if (isMarathi) {
                el.textContent = el.getAttribute('data-mr');
                el.classList.add('mr-font');
            } else {
                el.textContent = el.getAttribute('data-en');
                el.classList.remove('mr-font');
            }
        });

        if (isMarathi) {
            brandLogo.textContent = "॥ श्री समर्थ फोटोग्राफी ॥";
            brandLogo.className = 'logo-marathi';
            logoSub.style.display = 'none';
        } else {
            brandLogo.textContent = "Shri Samarth";
            brandLogo.className = 'logo-english';
            logoSub.style.display = 'block';
        }
    }

    const revealElements = document.querySelectorAll('.reveal');
    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };
    const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const bars = hamburger.querySelectorAll('.bar');
        if (mobileMenu.classList.contains('active')) {
            bars[0].style.transform = 'translateY(8px) rotate(45deg)';
            bars[1].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.transform = 'none';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.transform = 'none';
        });
    });
});