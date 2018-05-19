function initMap() {
  var uluru = {lat: 37.383754, lng: -122.012696};
  var circle;
  var rMin = 5, rMax = 300, step = 8;

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: uluru
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });

  circle = new google.maps.Circle({
    center: uluru,
    radius: rMax,
    strokeColor: "#E16D65",
    strokeOpacity: 0.5,
    strokeWeight: 2,
    fillColor: "#E16D65",
    fillOpacity: 0.5
  });
  circle.setMap(map);

  setAnimation();

  google.maps.event.addListener(map, 'zoom_changed', function() {
      console.log('zoom changed');
      clearInterval(intID);
  
      circle.setRadius(rMax);
      setAnimation();
  });

  function setAnimation() {
    intID = setInterval(function() {
        var radius = circle.getRadius();
        if ((radius > rMax) || (radius < rMin)) {
            radius = rMin
        }
        circle.setRadius(radius + step);
    }, 50);        
  }
}