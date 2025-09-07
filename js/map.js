// ---- ссылки с Google Maps
const googleLinks = [
  "https://www.google.ru/maps/place/52%C2%B008'07.4%22N+23%C2%B042'40.1%22E/@52.135399,23.7104755,183m/data=!3m1!1e3!4m4!3m3!8m2!3d52.135391!4d23.711143",
  "https://www.google.ru/maps/place/52%C2%B002'38.0%22N+23%C2%B043'23.0%22E/@52.0437706,23.7226408,218m/data=!3m1!1e3!4m4!3m3!8m2!3d52.0438889!4d23.7230556"
];

// ---- парсим координаты из ссылок
function extractCoords(url) {
  let match = url.match(/@([-.\d]+),([-.\d]+)/);
  if (match) return [parseFloat(match[1]), parseFloat(match[2])];
  match = url.match(/!3d([-.\d]+)!4d([-.\d]+)/);
  if (match) return [parseFloat(match[1]), parseFloat(match[2])];
  return null;
}

// ---- массив точек
const points = [
  {
    coords: extractCoords(googleLinks[0]),
    modalId: "kazarma5" // id модалки
  },
  {
    coords: extractCoords(googleLinks[1]),
    modalId: "kazarma3"
  }
];

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: points[0].coords,
    zoom: 13
  });

  points.forEach(p => {
    let placemark = new ymaps.Placemark(p.coords, {});
    placemark.events.add('click', function () {
      document.getElementById(p.modalId).style.display = 'flex';
      document.body.classList.add('modal-open');
    });
    myMap.geoObjects.add(placemark);
  });
}

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