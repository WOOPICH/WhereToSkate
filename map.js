ymaps.ready(init)
async function init () {
  const location = ymaps.geolocation
  const myMap = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 10,
    controls: ['zoomControl', 'geolocationControl', 'routeButtonControl']
  }, {
    searchControlProvider: 'yandex#search'
  })

  // Получение местоположения и автоматическое отображение его на карте.
  location.get({
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

  // Создаем коллекцию геообъектов (Можно переделать в массив)
  const myGeoObjects = new ymaps.GeoObjectCollection({}, {
    strokeWidth: 4,
    geodesic: true
  })

  // Создаем кластерер
  const clusterer = new ymaps.Clusterer({
    preset: 'islands#darkGreenClusterIcons'
  })

  // Добавим в коллекцию метки.
  const Points = await fetch('http://84.201.153.211:8080/api/rinks?latitude=1&longitude=1&radius=10000')
    .then(response => response.json())
    .then(json => json.map(j => {
      const obj = {
        id: j.id,
        coords: [j.latitude, j.longitude],
        name: j.name,
        free: j.free,
        openHours: j.openHours,
        rating: j.rating,
        type: j.type
      }
      return obj
    }));

  function isFree(free) {
    switch (free) {
      case 0: return `Нет`;
      case 1: return `Да`;
      default: break;
    }
  };

  function Hours(hours) {
    let string = ``;
    for (let i = 0; i < hours.length; i++) {
      switch (hours[i]) {
        case 'm': string += `Утро`; break;
        case 'a': string += `День`; break;
        case 'p': string += `Вечер`; break;
        case 'n': string += `Ночь`; break;
        default:
      }
      if (i != hours.length - 1) {
        string += `, `
      }
      else {
        string += `.`
      }
    }
    return string;
  };

  function typeOf(type) {
    switch (type) {
      case 'ai': return `Закрытый`;
      case 'ao': return `Открытый`;
      case 'n': return `Натуральный`;
      default: break;
    }
  };

  Points.forEach(p => myGeoObjects.add(new ymaps.Placemark(p.coords, {
    balloonContentHeader: `<style> .name{text-decoration: none; font-size: 15pt;}</style>
            <a class="name" href = "#"> ${p.name} </a><br>` +
            `<span class="rating">&#9733; ${p.rating.toFixed(1)} </span><hr>`,
    balloonContentBody: `<center><img src="res/img.jpg" height="250" width="400"></center>` +
            `<hr>&#9742; <a href="tel:+7-123-456-78-90">+7 (123) 456-78-90</a><br/><hr>` +
            `<b>Бесплатный: ${isFree(p.free)}</b><br/>` +
            `Часы работы: ${Hours(p.openHours)}<br/>`+
            `Тип катка: ${typeOf(p.type)}<br/><hr>`,
    hintContent: p.name
  })))

  // Переведем коллекцию в массив
  const newMyGeo = myGeoObjects.toArray()

  // Центрирование экрана при нажатии на метку
  for (let i = 0; i < myGeoObjects.getLength(); i++) {
    ymaps.geocode(newMyGeo[i].geometry.getCoordinates()).then(function (result) {
      firstGeoObject = result.geoObjects.get(0).getAddressLine();
      console.log(firstGeoObject);
      newMyGeo[i].properties.set({
        balloonContentFooter: `${firstGeoObject}`
      });})
    newMyGeo[i].events.add('click', function () {
      myMap.setCenter(newMyGeo[i].geometry.getCoordinates(), myMap.getZoom())
    });

  }
  // Добавим коллекцию на карту.
  myMap.geoObjects.add(clusterer)
  clusterer.add(newMyGeo)
}
