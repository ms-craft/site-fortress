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
        let iconPreset = 'islands#redIcon'; // дефолт — красный

        if (p.modalId && p.modalId.startsWith("kazarma")) {
          iconPreset = 'islands#blueIcon'; // для казарм — голубой
        }

        if (p.color) {
          const allowedColors = [
            'red', 'blue', 'green', 'orange', 'violet',
            'pink', 'yellow', 'black', 'gray', 'brown',
            'darkGreen', 'lightBlue', 'night'
          ];
          if (allowedColors.includes(p.color)) {
            iconPreset = `islands#${p.color}Icon`;
          }
        }

        const placemark = new ymaps.Placemark(p.coords, {}, {
          preset: iconPreset
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
// document.querySelectorAll('.close-btn').forEach(btn => {
//   btn.addEventListener('click', function() {
//     this.closest('.modal').style.display = 'none';
//     document.body.classList.remove('modal-open');
//   });
// });


// // ---- клик по фону
// window.addEventListener('click', function(e) {
//   if (e.target.classList.contains('modal')) {
//     e.target.style.display = 'none';
//     document.body.classList.remove('modal-open');
//   }
// });

document.addEventListener('click', function(e) {
  const closeBtn = e.target.closest('.close-btn');
  if (closeBtn) {
    const modal = closeBtn.closest('.modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
    return; // обработка завершена
  }

  const modalBg = e.target.closest('.modal');
  if (modalBg && modalBg === e.target) {
    modalBg.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
});
