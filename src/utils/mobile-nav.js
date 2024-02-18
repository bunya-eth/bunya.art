const mobileNav = () => {
    const headerBtn = document.querySelector('.header__bars');
    const mobileNav = document.querySelector('.mobile-nav__menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');
    const icon = headerBtn.querySelector('i');

    // State
    let isMobileNavOpen = false;
    
    headerBtn.addEventListener('click', () => {
        isMobileNavOpen = !isMobileNavOpen;
        if (isMobileNavOpen) {
            mobileNav.style.display = 'flex';
            document.body.style.overflowY = 'hidden';
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            mobileNav.style.display = 'none';
            document.body.style.overflowY = 'auto';
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }

        icon.style.transition = 'transform 0.3s ease';
        icon.classList.toggle('rotate');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMobileNavOpen = false;
            mobileNav.style.display = 'none';
            document.body.style.overflowY = 'auto';
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            icon.classList.remove('rotate');
        });
    });
};

export default mobileNav;