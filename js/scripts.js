/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Skill bar entrance animation
// Use IntersectionObserver to animate skills when #skills enters viewport
document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('#skills');
    const fills = document.querySelectorAll('.skill-fill');

    // store target percent and set initial width to 0 so they don't show before animation
    fills.forEach(f => {
        if (!f.dataset.percent) {
            const inline = f.style.width && f.style.width !== '' ? f.style.width : '';
            if (inline) f.dataset.percent = inline;
        }
        if (!f.dataset.percent) f.dataset.percent = '0%';
        f.style.width = '0%';
    });

    // animation function (can be called multiple times)
    function animateSkills(stagger = 200) {
        fills.forEach((f, i) => {
            const percent = f.dataset.percent || '0%';
            // reset to 0 before animating
            f.style.width = '0%';
            setTimeout(() => { f.style.width = percent; }, i * stagger);
        });
    }

    if ('IntersectionObserver' in window && skillsSection) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                } else {
                    // 離開視窗時歸零
                    fills.forEach(f => { f.style.width = '0%'; });
                }
            });
        }, { threshold: 0.2 });
        io.observe(skillsSection);
    } else {
        // fallback: animate after short delay
        setTimeout(() => { animateSkills(); }, 200);
    }

    // Replay animation when user clicks nav link to #skills
    const skillsNavLinks = document.querySelectorAll('a.nav-link[href="#skills"], a.js-scroll-trigger[href="#skills"]');
    skillsNavLinks.forEach(a => {
        a.addEventListener('click', (e) => {
            // wait a bit for scroll animation to complete then replay
            setTimeout(() => { animateSkills(); }, 400);
        });
    });
});
