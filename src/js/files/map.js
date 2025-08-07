export default function map() {
  const maps = document.querySelectorAll(".map");

  if (maps.length) {
    maps.forEach((map) => {
      const center = JSON.parse(map.dataset.center);
      const zoom = Number(map.dataset.zoom);
      const icon = map.dataset.icon;

      function init() {
        const htmlMap = new ymaps.Map(map, {
          center,
          zoom,
        });

        const placemark = new ymaps.Placemark(
          center,
          {},
          {
            iconLayout: "default#image",
            iconImageHref: icon,
            iconImageSize: [26, 40],
            iconImageOffset: [-5, -65],
          }
        );

        htmlMap.geoObjects.add(placemark);

        htmlMap.controls.remove("geolocationControl"); // удаляем геолокацию
        htmlMap.controls.remove("searchControl"); // удаляем поиск
        htmlMap.controls.remove("trafficControl"); // удаляем контроль трафика
        htmlMap.controls.remove("typeSelector"); // удаляем тип
        htmlMap.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
        // htmlMap.controls.remove("zoomControl"); // удаляем контрол зуммирования
        htmlMap.controls.remove("rulerControl"); // удаляем контрол правил
        htmlMap.behaviors.disable(["scrollZoom"]);
      }

      ymaps.ready(init);
    });
  }
}
