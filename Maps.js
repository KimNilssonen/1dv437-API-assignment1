"use strict";
window.onload = function() {
   googleMaps.initMap();
};

var googleMaps = {

   ConvertedCoordinates: [],
   map: {},
   geoCoder: null,


   initMap: function() {
      googleMaps.geoCoder = new google.maps.Geocoder();
      googleMaps.map = new google.maps.Map(document.getElementById('map'), {
         center: {
            lat: 15,
            lng: 0
         },
         zoom: 3
      });
   },


   startGeo: function(label, mailContent) {

      var address = label.name.replace("Location/", "");

      googleMaps.geoCoder.geocode({
         'address': address
      }, function(results, status) {
         if (status === google.maps.GeocoderStatus.OK) {

            var currentLoc = results[0].geometry.location;
            googleMaps.addMarker(currentLoc, label, address, mailContent);
         }
         else {

            setTimeout(function() {
               googleMaps.startGeo(label, mailContent);
            }, 300);
         }
      });
   },

   addMarker: function(currentLoc, currentLabel, address, mailContent) {
      var marker = new google.maps.Marker({
         position: currentLoc,
         map: googleMaps.map,
         title: address,
      });
      marker.addListener('click', function() {
         infoWindow.open(googleMaps.map, marker);
      });
      console.log(currentLabel);
      console.log(mailContent);
      var contentString =
         '<div id="content">' +
         '<div id="siteNotice">' +
         '</div>' +
         '<h1 id="firstHeading" class="firstHeading">' + address + '</h1>' +
         '<div id="bodyContent">' +
         '<p><b>Subject: ' + mailContent.subject + '</b>' +
         '<p>' + mailContent.messageText + '</p>' +
         '<p><b>Info about: </b><a href="https://en.wikipedia.org/wiki/' + address + '">' + address + '</a></p>' +
         '</div>' +
         '</div>';

      var infoWindow = new google.maps.InfoWindow({
         content: contentString
      });
   },
};