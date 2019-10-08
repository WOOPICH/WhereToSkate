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
};
