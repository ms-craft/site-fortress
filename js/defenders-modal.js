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
