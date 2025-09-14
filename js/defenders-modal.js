// открытие модалок
document.querySelectorAll('.open-modal').forEach(item => {
    item.addEventListener('click', function() {
    const modalId = this.getAttribute('data-modal');
    document.getElementById(modalId).style.display = 'flex';

    document.body.classList.add('modal-open');
    });
});

// закрытие модалок
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
    this.closest('.modal').style.display = 'none';

    document.body.classList.remove('modal-open');
    });
});

// клик вне окна закрывает модалку
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';

    document.body.classList.remove('modal-open');
    }
});