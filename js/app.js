document.addEventListener('DOMContentLoaded', function() {

    var toggleBtn1 = document.getElementById('1');
    if (toggleBtn1) {
        toggleBtn1.addEventListener('click', function() {
            var list = document.getElementById('firstlist');
            list.style.display = list.style.display === 'block' ? 'none' : 'block';
        });
    }

    var toggleBtn2 = document.getElementById('2');
    if (toggleBtn2) {
        toggleBtn2.addEventListener('click', function() {
            var list = document.getElementById('secondlist');
            list.style.display = list.style.display === 'block' ? 'none' : 'block';
        });
    }

    var toggleBtn3 = document.getElementById('3');
    if (toggleBtn3) {
        toggleBtn3.addEventListener('click', function() {
            var list = document.getElementById('thirdlist');
            list.style.display = list.style.display === 'block' ? 'none' : 'block';
        });
    }

    var toggleBtn4 = document.getElementById('4');
    if (toggleBtn4) {
        toggleBtn4.addEventListener('click', function() {
            var list = document.getElementById('list2');
            list.style.display = list.style.display === 'block' ? 'none' : 'block';
        });
    }

    document.querySelectorAll('.open-modal').forEach(function(item) {
        item.addEventListener('click', function() {
            var modalId = this.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'flex';
            document.body.classList.add('modal-open');
            var h = document.getElementById('hamburger');
            var ch = document.getElementById('compact-hamburger');
            var mw = document.querySelector('.menu-wrapper');
            if (h) h.classList.remove('active');
            if (ch) ch.classList.remove('active');
            if (mw) mw.classList.remove('active');
        });
    });

    document.querySelectorAll('.close-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
            document.body.classList.remove('modal-open');
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });

    var hamburger = document.getElementById('hamburger');
    var compactHamburger = document.getElementById('compact-hamburger');
    var menuWrapper = document.querySelector('.menu-wrapper');
    var header = document.querySelector('header');

    function closeMenu() {
        if (hamburger) hamburger.classList.remove('active');
        if (compactHamburger) compactHamburger.classList.remove('active');
        if (menuWrapper) {
            menuWrapper.classList.remove('active');
            menuWrapper.style.opacity = '';
            menuWrapper.style.transform = '';
            menuWrapper.style.display = '';
        }
        if (header) header.classList.remove('menu-open');
    }

    function closeMenuAnimated() {
        if (!menuWrapper || !menuWrapper.classList.contains('active')) return;

        if (desktopQuery.matches && header && header.classList.contains('compact-active')) {
            menuWrapper.style.opacity = '0';
            menuWrapper.style.transform = 'scaleY(0)';
            if (compactHamburger) compactHamburger.classList.remove('active');
            if (header) header.classList.remove('menu-open');
            menuWrapper.addEventListener('transitionend', function handler() {
                menuWrapper.removeEventListener('transitionend', handler);
                menuWrapper.classList.remove('active');
                menuWrapper.style.display = 'none';
                menuWrapper.style.opacity = '';
                menuWrapper.style.transform = '';
            });
        } else {
            closeMenu();
        }
    }

    if (hamburger && menuWrapper) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            menuWrapper.classList.toggle('active');
            header.classList.toggle('menu-open');
            menuWrapper.style.top = header.offsetHeight + 'px';
        });

        menuWrapper.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuWrapper.classList.contains('active')) {
                closeMenu();
            }
        });

        document.addEventListener('click', function(e) {
            if (menuWrapper.classList.contains('active') &&
                !menuWrapper.contains(e.target) &&
                !hamburger.contains(e.target) &&
                !(compactHamburger && compactHamburger.contains(e.target))) {
                closeMenuAnimated();
            }
        });
    }

    if (compactHamburger && menuWrapper) {
        compactHamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            var isOpen = menuWrapper.classList.contains('active');

            if (isOpen) {
                menuWrapper.style.opacity = '0';
                menuWrapper.style.transform = 'scaleY(0)';
                compactHamburger.classList.remove('active');
                header.classList.remove('menu-open');
                menuWrapper.addEventListener('transitionend', function handler() {
                    menuWrapper.removeEventListener('transitionend', handler);
                    menuWrapper.classList.remove('active');
                    menuWrapper.style.display = 'none';
                    menuWrapper.style.opacity = '';
                    menuWrapper.style.transform = '';
                });
            } else {
                menuWrapper.classList.add('active');
                compactHamburger.classList.add('active');
                header.classList.add('menu-open');
                menuWrapper.style.display = 'flex';
                menuWrapper.style.opacity = '0';
                menuWrapper.style.transform = 'scaleY(0)';
                requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                        menuWrapper.style.opacity = '1';
                        menuWrapper.style.transform = 'scaleY(1)';
                    });
                });
            }
        });
    }

    var compactBar = document.querySelector('.compact-bar');
    var desktopQuery = window.matchMedia('(min-width: 671px)');

    function handleScroll() {
        var cur = window.scrollY;
        var rect = header.getBoundingClientRect();

        closeMenu();

        if (desktopQuery.matches) {
            if (rect.bottom <= 0) {
                compactBar.classList.add('active');
                header.classList.add('compact-active');
            } else {
                compactBar.classList.remove('active');
                header.classList.remove('compact-active');
            }
        } else {
            if (cur > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    if (header && compactBar) {
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

});
