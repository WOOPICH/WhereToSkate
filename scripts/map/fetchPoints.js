async function getPoints(myGeoObjects) {
  const json_length = Object.keys(await fetch('http://84.201.153.211:8080/api/rinks?latitude=1&longitude=1&radius=10000')
    .then(response => response.json())).length;

  let Points;

  for (i = 0; i < json_length; i++) {
    Points = await fetch(`http://84.201.153.211:8080/api/rink/${i + 1}`) //HELP
      .then(response => response.json())
      .then(json => [json].map(j => {
        const obj = {
          id: j.id,
          coords: [j.latitude, j.longitude],
          name: j.name,
          free: j.free,
          openHours: j.open_hours,
          rating: j.rating,
          type: j.type,
          phone: j.phone_number,
          web: j.website_url,
          sharp: j.skates_sharpening,
          rent: j.skates_rentals,
          parking: j.parking,
          warm_room: j.warm_room
        }
        return obj
    }));

    Points.forEach(p => myGeoObjects.add(new ymaps.Placemark(p.coords, {
      balloonContentHeader: `${nameParse(p.name, p.web)}<br>` +
              `<b style="font-size:20px">&#9733;</b> <span>${p.rating.toFixed(1)}</span><hr>`,
      balloonContentBody: `<center><img src="res/img.jpg" height="250" width="400"></center>` +
              `<div style="font-size: 11pt">&#8194;<i style="font-size:20px" class="fa">&#xf095;</i>&#8195;${phoneParse(p.phone)}</div>` +
              `<div style="font-size: 11pt">&#8194;<i style="font-size:20px" class="fa">&#xf0ac;</i>&#8195;${webParse(p.web)}</div><hr>` +
              `<b>Бесплатный: ${isFree(p.free)}</b><br/>` +
              `Часы работы: ${Hours(p.openHours)}<br/>` +
              `Тип катка: ${typeOf(p.type)}<br/>`+
              `Аренда коньков: ${isThereSomething(p.rent)}<br/>` +
              `Заточка коньков: ${isThereSomething(p.sharp)}<br/>` +
              `Парковка: ${isThereSomething(p.parking)}<br/>` +
              `Теплая раздевалка: ${isThereSomething(p.warm_room)}<br/><hr>`,
      hintContent: p.name
    })))
  }
}
