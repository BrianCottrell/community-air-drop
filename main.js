function initMap() {
  var uluru = {lat: 37.383754, lng: -122.012696};
  var drone = {lat: 37.386754, lng: -122.022696};
  var purple = {lat: 37.387754, lng: -122.013096};
  var red = {lat: 37.380754, lng: -122.011596};
  var blue = {lat: 37.381754, lng: -122.012896};
  var circle;
  var rMin = 5, rMax = 300, step = 8;
  var direction = 1;

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: uluru,
    mapTypeId: 'satellite'
  });

  var marker = new google.maps.Marker({
    position: drone,
    icon: "drone_icon.png",
    map: map
  });
  var infowindow = new google.maps.InfoWindow({
    content: "<img src='drone_icon.png'/>"
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  var marker1 = new google.maps.Marker({
    position: purple,
    icon: "purple_icon.png",
    map: map
  });
  marker1.setVisible(false);
  var infowindow1 = new google.maps.InfoWindow({
    content: "<b>Purple Circle Needs Power!</b><img src='amazon_sos.jpg'/>"
  });
  marker1.addListener('click', function() {
    infowindow1.open(map, marker1);
  });

  var marker2 = new google.maps.Marker({
    position: red,
    icon: "red_icon.png",
    map: map
  });
  var infowindow2 = new google.maps.InfoWindow({
    content: "<img src='amazon_sos.jpg'/>"
  });
  marker2.addListener('click', function() {
    infowindow2.open(map, marker2);
  });

  var marker3 = new google.maps.Marker({
    position: blue,
    icon: "blue_icon.png",
    map: map
  });
  var infowindow3 = new google.maps.InfoWindow({
    content: "<img src='amazon_sos.jpg'/>"
  });
  marker3.addListener('click', function() {
    infowindow3.open(map, marker3);
  });

  circle = new google.maps.Circle({
    center: drone,
    radius: rMax,
    strokeColor: "#444499",
    strokeOpacity: 0.5,
    strokeWeight: 2,
    fillColor: "#9999FF",
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

	    var p = circle.getCenter();
	    var g = p.lat();
	    var m = p.lng()+0.0001*direction;
	    if (m > -122.002696) {
	    	direction = -1;
	    	g = p.lat()-0.0004;
	    } else if (m < -122.022696) {
	    	direction = 1
	    	g = p.lat()-0.0004;
	    } else if (m > -122.016096) {
	    	marker1.setVisible(true);
	    }
	    circle.setCenter(new google.maps.LatLng(g,m));
	    marker.setPosition(new google.maps.LatLng(g-0.0005,m));
    }, 100);        
  }
}