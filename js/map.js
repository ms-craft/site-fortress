fetch('points.json')
  .then(response => response.json())
  .then(points => {
    ymaps.ready(() => {
      const myMap = new ymaps.Map("map", {
        center: points[0].coords, // центр на первой точке
        zoom: 13,
        type: "yandex#satellite"
      });

      points.forEach(p => {
        const placemark = new ymaps.Placemark(p.coords, {}, {
          preset: 'islands#redIcon' 
        });

        placemark.events.add('click', () => {
          document.getElementById(p.modalId).style.display = 'flex';
          document.body.classList.add('modal-open');
        });

        myMap.geoObjects.add(placemark);
      });
    });
  });

// ---- закрытие модалок
document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    this.closest('.modal').style.display = 'none';
    document.body.classList.remove('modal-open');
  });
});

// ---- клик по фону
window.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
});