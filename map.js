ymaps.ready(init)
function init() {
  var location = ymaps.geolocation;
  var myMap = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 10,
  }, {
    searchControlProvider: 'yandex#search'
  });

  // Получение местоположения и автоматическое отображение его на карте.
  location.get({
      mapStateAutoApply: true
  })
  .then(
  function(result) {
      // Получение местоположения пользователя.
      var userAddress = result.geoObjects.get(0).properties.get('text');
      var userCoodinates = result.geoObjects.get(0).geometry.getCoordinates();
      // Пропишем полученный адрес в балуне.
      result.geoObjects.get(0).properties.set({
          balloonContentBody: 'Адрес: ' + userAddress +
                              '<br/>Координаты:' + userCoodinates
                            });
      myMap.geoObjects.add(result.geoObjects)
  },
  function(err) {
      console.log('Ошибка: ' + err)
  });
  //Создаем коллекцию геообъектов (Можно переделать в массив)
  var myGeoObjects = new ymaps.GeoObjectCollection({}, {
    strokeWidth: 4,
    geodesic: true
  });
  //Создаем кластерер
  var clusterer = new ymaps.Clusterer({
    preset: 'islands#darkGreenClusterIcons'
  });
  // Добавим в коллекцию метки.
  myGeoObjects.add(new ymaps.Placemark([55.694843, 37.435023], {
    balloonContent: 'каток',
    iconCaption: 'покатушки'
  }));
  myGeoObjects.add(new ymaps.Placemark([55.70, 37.475023]));
  myGeoObjects.add(new ymaps.Placemark([55.699843, 37.435823]));
  myGeoObjects.add(new ymaps.Placemark([55.604843, 37.435083]));
  myGeoObjects.add(new ymaps.Placemark([55.6988843, 37.43]));
  myGeoObjects.add(new ymaps.Placemark([55.690843, 37.4351]));
  myGeoObjects.add(new ymaps.Placemark([55.694003, 37.44]));
  myGeoObjects.add(new ymaps.Placemark([55.695053, 37.25]));

  //Переведем коллекцию в массив
  var newMyGeo = myGeoObjects.toArray();

  //Центрирование экрана при нажатии на метку
  for (let i = 0; i < myGeoObjects.getLength(); i++) {
    newMyGeo[i].events.add('click', function () {
      myMap.setCenter(newMyGeo[i].geometry.getCoordinates(),myMap.getZoom());
    });
  }

  // Добавим коллекцию на карту.
  myMap.geoObjects.add(clusterer);
  clusterer.add(newMyGeo);
  // Установим карте центр и масштаб так, чтобы охватить коллекцию целиком.
  //myMap.setBounds(myGeoObjects.getBounds());
}
