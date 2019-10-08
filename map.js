ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ['zoomControl', 'geolocationControl', 'routeButtonControl']
    });
    myMap.geoObjects.add(new ymaps.Placemark([55.694843, 37.435023], {
            balloonContent: 'каток',
            iconCaption: 'покатушки'
        }, {
            preset: 'islands#greenDotIconWithCaption'
        }));
        var myGeoObjects = new ymaps.GeoObjectCollection({}, {
            preset: "islands#greenDotIconWithCaption",
            strokeWidth: 4,
            geodesic: true
        });
        // Добавим в коллекцию метки и линию.
        myGeoObjects.add(new ymaps.Placemark([55.694843, 37.435]));
        myGeoObjects.add(new ymaps.Placemark([55.70, 37.475023]));
        myGeoObjects.add(new ymaps.Placemark([55.699843, 37.435823]));
        myGeoObjects.add(new ymaps.Placemark([55.604843, 37.435083]));
        myGeoObjects.add(new ymaps.Placemark([55.6988843, 37.43]));
        myGeoObjects.add(new ymaps.Placemark([55.690843, 37.4351]));
        myGeoObjects.add(new ymaps.Placemark([55.694003, 37.44]));
        // Добавим коллекцию на карту.
        myMap.geoObjects.add(myGeoObjects);
        // Установим карте центр и масштаб так, чтобы охватить коллекцию целиком.
        myMap.setBounds(myGeoObjects.getBounds());
};
