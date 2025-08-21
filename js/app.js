// раскрытие/скрытие списка
document.querySelector('.toggle-btn').addEventListener('click', function() {
    const list = document.querySelector('.hidden-list');
    list.style.display = list.style.display === 'block' ? 'none' : 'block';
});

// открытие модалок
document.querySelectorAll('.open-modal').forEach(item => {
    item.addEventListener('click', function() {
    const modalId = this.getAttribute('data-modal');
    document.getElementById(modalId).style.display = 'flex';
    });
});

// закрытие модалок
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
    this.closest('.modal').style.display = 'none';
    });
});

// клик вне окна закрывает модалку
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
    }
});