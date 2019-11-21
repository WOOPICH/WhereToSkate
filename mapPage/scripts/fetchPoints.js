let Points;
async function getPoints(myGeoObjects) {

  Points = await fetch('http://84.201.153.211:8080/api/rinks?latitude=1&longitude=1&radius=10000')
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
let count = 0;
async function getInfo(point) {
  let id;
  for (let i = 0; i < Points.length; i++) {
    if (point == Points[i].coords)
      id = Points[i].id;
  }
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
  let firstGeoObject;


  document.getElementsByClassName('card-image')[0].innerHTML = `<img src="../images/img${count}.jpg" alt="kek" style="width: 100%; height: auto;" >`;
  document.getElementById('name').innerHTML = `${nameParse(info[0].name,info[0].web)}`;
  ymaps.geocode(point).then(async function(result) {
    firstGeoObject = result.geoObjects.get(0).getAddressLine();
    document.getElementById('address').innerHTML = `${firstGeoObject}`;
  });
  document.getElementById('hours').innerHTML = `${Hours(info[0].openHours)}`;
  document.getElementById('web').innerHTML = `${webParse(info[0].web)}`;
  document.getElementById('phone').innerHTML = `${phoneParse(info[0].phone)}`;
  document.getElementById('rating').innerHTML = `${info[0].rating.toFixed(1)}`;
  document.getElementById('type').innerHTML = `${typeOf(info[0].type)}`;
  document.getElementById('free').innerHTML = `${isFree(info[0].free)}`;
  document.getElementById('warm_room').innerHTML = `${isThereSomething(info[0].warm_room)}`;
  document.getElementById('rent').innerHTML = `${isThereSomething(info[0].rent)}`;
  document.getElementById('sharp').innerHTML = `${isThereSomething(info[0].sharp)}`;
  document.getElementById('parking').innerHTML = `${isThereSomething(info[0].parking)}`;
  if (count < 5)
    count++;
  else
    count = 0;
}
