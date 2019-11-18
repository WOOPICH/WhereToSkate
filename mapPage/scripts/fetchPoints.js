async function getPoints(myGeoObjects) {

  const Points = await fetch('http://84.201.153.211:8080/api/rinks?latitude=1&longitude=1&radius=10000')
    .then(response => response.json())
    .then(json => json.map(j => {
        const obj = {
          id: j.id,
          coords: [j.latitude, j.longitude]
        }
        return obj;
  }));

  Points.forEach(p => myGeoObjects.add(new ymaps.Placemark(p.coords)));
    /*, {
      balloonContentHeader: `${nameParse(p.name, p.web)}<br>` +
              `<b style="font-size:20px">&#9733;</b> <span>${p.rating.toFixed(1)}</span><hr>`,
      balloonContentBody: `<center><img src="../images/img.jpg" height="250" width="400"></center>` +
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
 */
}

async function getInfo(point) {
  const id = await fetch(`http://84.201.153.211:8080/api/rinks?latitude=${point[0]}&longitude=${point[1]}`) //HELP
    .then(response => response.json())
    .then(function(data) {
      return data[0].id;
    });
  const info = await fetch(`http://84.201.153.211:8080/api/rink/${id}`) //HELP
    .then(response => response.json())
    .then(json => [json].map(j => {
        const obj = {
        id: j.id,
        coords: point,
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
      return obj;
    }));

  console.log(info);
}
