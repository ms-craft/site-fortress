fetch('points.json')
  .then(response => response.json())
  .then(points => {
    ymaps.ready(() => {
      const myMap = new ymaps.Map("map", {
        center: points[0].coords,
        zoom: 13,
        type: "yandex#satellite"
      });

       points.forEach(p => {
        let iconPreset = 'islands#redIcon';

        if (p.modalId && p.modalId.startsWith("kazarma")) {
          iconPreset = 'islands#blueIcon';
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
          var h = document.getElementById('hamburger');
          var ch = document.getElementById('compact-hamburger');
          var mw = document.querySelector('.menu-wrapper');
          if (h) h.classList.remove('active');
          if (ch) ch.classList.remove('active');
          if (mw) mw.classList.remove('active');
          var hdr = document.querySelector('header');
          if (hdr) hdr.classList.remove('menu-open');
        });

        myMap.geoObjects.add(placemark);
      });
    });
  });

document.addEventListener('click', function(e) {
  const closeBtn = e.target.closest('.close-btn');
  if (closeBtn) {
    const modal = closeBtn.closest('.modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
    return;
  }

  const modalBg = e.target.closest('.modal');
  if (modalBg && modalBg === e.target) {
    modalBg.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
});
