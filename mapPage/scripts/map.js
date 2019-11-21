ymaps.ready(init)
async function init() {
  const location = ymaps.geolocation
  const myMap = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 10,
    controls: ['zoomControl', 'geolocationControl', 'routeButtonControl']
  }, {
    searchControlProvider: 'yandex#search'
  })

  // Получение местоположения и автоматическое отображение его на карте.
  /*location.get({
    mapStateAutoApply: false
  })
    .then(
      function (result) {
        // Получение местоположения пользователя.
        const userAddress = result.geoObjects.get(0).properties.get('text')
        const userCoodinates = result.geoObjects.get(0).geometry.getCoordinates()
        // Пропишем полученный адрес в балуне.
        result.geoObjects.get(0).properties.set({
          balloonContentBody: 'Адрес: ' + userAddress +
            '<br/>Координаты:' + userCoodinates
        })
        myMap.geoObjects.add(result.geoObjects)
      },
      function (err) {
        console.log('Ошибка: ' + err)
      })
  */
  // Создаем коллекцию геообъектов (Можно переделать в массив)
  const myGeoObjects = new ymaps.GeoObjectCollection({}, {
    strokeWidth: 4,
    geodesic: true
  })

  // Создаем кластерер
  const clusterer = new ymaps.Clusterer({
    preset: 'islands#darkGreenClusterIcons'
  })

  // Забираем точки с сервера
  await getPoints(myGeoObjects);

  // Переведем коллекцию в массив
  const newMyGeo = myGeoObjects.toArray()

  // Центрирование экрана при нажатии на метку + добавление адреса к каждой точке
  for (let i = 0; i < myGeoObjects.getLength(); i++) {
    newMyGeo[i].events.add('click', async function() {
      myMap.setCenter(newMyGeo[i].geometry.getCoordinates(), myMap.getZoom());
      await getInfo(newMyGeo[i].geometry.getCoordinates());
    });
  }

  // Добавим коллекцию на карту.
  myMap.geoObjects.add(clusterer)
  clusterer.add(newMyGeo)
}
