

$(document).ready( function () {
	
	if ( $('#main_map_holder').length ) {

		var midpointId = $('#midpoint_id').text();
		var addressIcon = '/images/red-person.png';
        var metresToDegConverter = 100000; 
		
        $.get('/midpoints/' + midpointId +'/json_data', function(data) {
            
            midpoint = new MidpointModel(data)
			mainMap = new GMaps ({
				styles: styleArray,
				div: '#main_map',
				lat: midpoint.lat,
		        lng: midpoint.lng,
		        mapTypeControl: false,
		        streetViewControl: false,
		        panControl: false,
		        zoomControlOpt: { position: 'RIGHT_BOTTOM' }
			});

			midpoint.addresses.forEach(function(object, index) {
                address = midpoint.addresses[index];
                mainMap.addMarker ({
                    lat: address.lat,
                    lng: address.lng,
                    id: 'address_' + (index + 1).toString(),
                    icon: addressIcon,
                    class: 'address-marker'
                });

			});

			mainMap.fitLatLngBounds(midpoint.zoomOutBounds());
            midpoint.drawCircle(mainMap);

			// Zooms the view in to the midpoint radius
            $('#map-zoom-in').on( 'click', function () {
                mainMap.fitLatLngBounds(midpoint.zoomInBounds())
                $(this).addClass("active-zoom-button");
                $(this).siblings().removeClass("active-zoom-button");
            })

            // And back out again
            $('#map-zoom-out').on( 'click', function () {
                mainMap.fitLatLngBounds(midpoint.zoomOutBounds())
                $(this).addClass("active-zoom-button");
                $(this).siblings().removeClass("active-zoom-button");
            })

        });

        var styleArray = [
            {
                "stylers": [
                    {
                        "saturation": -100
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#0099dd"
                    }
                ]
            },
            {
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#aadd55"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {}
        ]

	};

});