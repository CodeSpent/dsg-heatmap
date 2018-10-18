const gKey = 'AIzaSyDRo-UGY91_EiB2DeYzBU21-3FcaqIanPo';
let fr = 'HH:mm:ss a';
let sm = [];

let states = [
    "Alaska",
    "Alabama",
    "Arkansas",
    "Arizona",
    "California",
    "Colorado",
    "Connecticut",
    "Washington DC",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Iowa",
    "Idaho",
    "Illinois",
    "Indiana",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Massachusetts",
    "Maryland",
    "Maine",
    "Michigan",
    "Minnesota",
    "Missouri",
    "Mississippi",
    "Montana",
    "North Carolina",
    "North Dakota",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "Nevada",
    "New York",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Virginia",
    "Vermont",
    "Washington",
    "Wisconsin",
    "West Virginia",
    "Wyoming"
]

$.getJSON("https://api.myjson.com/bins/i1k4o", function (storeData) {
    $("#document").ready(function () {
        $("#search").focus();
    })

    window.setInterval(function () {
        var zone = [
            est = 'America/New_York',
            cen = 'America/Mexico_City',
            mount = 'America/Denver',
            pac = 'America/Los_Angeles'
        ]

        var est = moment.tz(moment(), zone[0]).format(fr);
        var cen = moment.tz(moment(), zone[1]).format(fr);
        var mount = moment.tz(moment(), zone[2]).format(fr);
        var pac = moment.tz(moment(), zone[3]).format(fr);

        $("#est").text(est)
        $("#pac").text(pac)
        $("#cen").text(cen)
        $("#mount").text(mount)
    }, 1000);

    const options = {
        key: 't9OcQb7zQlhr6Xg23SFe4CSk9OI5BCnH',
        verbose: true,
        lat: 39.8283,
        lon: -98.5795,
        zoom: 5,
        drawControl: true,
        zoomAnimation: false
    }

    windyInit(options, windyAPI => {
        const {
            map
        } = windyAPI

        windyAPI.store.set('overlay', 'rain');

        let ms = L.markerClusterGroup({
            disableClusteringAtZoom: 11,
            spiderfyOnMaxZoom: true,
            animateAddingMarkers: true,
            maxClusterRadius: 35,
        });

        $.each(storeData, function (b, c) {
            let p = c.Phone.replace(/[- )(]/g, '');
            let P = "(" + p.substr(0, 3) + ') ' + p.substr(3, 3) +
                '-' + p.substr(6, 4)
            let d = '<div class="label"><h1>' + c.Name + '</h1>';
            let e = '<h2>Store Number: ' + b + '</h2>';
            let f = '<p>Address: ' + c.Formatted_Address + '</p>';
            let g = '<p class="phone">Store Phone: ' + P + '</p>'
            let h = '<p>Region: ' + c.Region + '</p><br>';
            let i = '<p class="tz">Getting time..</p></div>'
            let j = d + e + f + g + h + i;
            let op = {
                'maxWidth': '500',
                'className': 'custom'
            }
            let dsg =
                'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'
            let gg =
                'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'
            let fs =
                'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png'
            let com =
                'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png'

            switch (c.Type) {
                case 'dsg':
                    ii = dsg
                    break;
                case 'gg':
                    ii = gg
                    break;
                case 'fs':
                    ii = fs
                    break;
                case 'comb':
                    ii = com
                    break;
            }

            let ic = new L.Icon({
                iconUrl: ii,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
            });

            let m = new L.marker(L.latLng(c.Lat, c.Long), {
                id: b,
                name: c.Name,
                phone: c.Phone,
                city: c.City,
                state: c.State,
                postal_code: c.Zip,
                address: c.Formatted_Address,
                icon: ic
            }).bindPopup(j, op);

            ms.addLayer(m);
            sm[b] = m;
        });


        map.addLayer(ms, {
            chunkedLoading: true,
        });


        ms.on('clusterclick', function (e) {
            $('#data-panel').show();
            let a = e.layer.getAllChildMarkers();
            $.each(a, function () {
                b = this.options.id;
                c = this.options.name;
                d = this.options;
                console.log(this);
                $('<div/>', {
                    id: b + '_cluster-store-object',
                    class: 'store-object'
                }).appendTo('#clustered-stores');

                $('<h4>' + b + ' - ' + c + '</h4>').appendTo('#' + b + '_cluster-store-object');
                $('<p>' + d.phone + '</p>').appendTo('#' + b + '_cluster-store-object');
                $('<p>' + d.address + '</p>').appendTo('#' + b + '_cluster-store-object');

            });
        });

        $('#close-data-panel').click(function (e) {
            $('#data-panel').hide();
            $('#show-stores').empty();
        });

        $('#search-bar').submit(function () {
            a = $(this).find('#search').val();
                let q = sm[a]
                if (q == undefined) {
                    $("#search-error").toggleClass("show")
                    setTimeout(function () {
                        $('#search-error').removeClass("show");
                    }, 3000);
                } else {
                    let m = sm[a]
                    ms.removeLayer(m);
                    m.addTo(map).openPopup();
                    let c = m.getLatLng();
                    let point = new L.LatLng(c.lat, c.lng);
                   
                    map.setView(point, 5, {
                        animation: true
                    })
                    map.on('popupclose', function () {
                        ms.addLayer(m);
                        map.removeLayer(m);
                    });
                }
            $("#search-bar").trigger("reset");
            return false;
        });

        $(document).ready(function () {
            $.each(storeData, function () {
                let x = this;
                let a = this.StoreNum
                let b = this.State;
                let c = [this.Lat, this.Long];
                
                $('<div/>', {
                    id: a + '_store-object',
                    class: 'store-object'
                }).appendTo('#' + b + '_container');

                $('<h4>Store ' + a + ' - ' + x.Name + '</h4>', {
                    class: 'store-object-heading'
                }).appendTo('#' + a + '_store-object');
                
                let f = x.Phone.replace(/[- )(]/g, '');
                let p = "(" + f.substr(0, 3) + ') ' + f.substr(3, 3) +
                '-' + f.substr(6, 4);
                $('<p>' + p + '</p>', {
                    class: 'store-object-phone'
                }).appendTo('#' + a + '_store-object');

                $('<p>' + x.Formatted_Address + '</p>', {
                    class: 'store-object-address'
                }).appendTo('#' + a + '_store-object');

                $('<button class="store-object-link">View on Map</button>', {
                    id: a + '_store-object-link'
                }).appendTo('#' + a + '_store-object').click(function() {
                    map.setView(c, 20); 
                    m.openPopup(c);        
                });

            });
        });
    });

});