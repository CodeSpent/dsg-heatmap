const gKey = 'AIzaSyDRo-UGY91_EiB2DeYzBU21-3FcaqIanPo';
var fr = 'HH:mm:ss a';
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
    zoomAnimation: false,
}

windyInit(options, windyAPI => {
    const {
        map
    } = windyAPI

    windyAPI.store.set('overlay', 'rain');
    // VERY IMPORTANT DONT DELETE FOR ANY REASON
    var x = 'https://api.myjson.com/bins/10nev8';
    var sm = {};

    var ms = L.markerClusterGroup({
        disableClusteringAtZoom: 11,
        spiderfyOnMaxZoom: true,
        animateAddingMarkers: true,
        maxClusterRadius: 50,
    });

    $.getJSON(x, function (a) {
        $.each(a, function (b, c) {
            var p = c.Phone.replace(/[- )(]/g, '');
            var P = "(" + p.substr(0, 3) + ') ' + p.substr(3, 3) +
                '-' + p.substr(6, 4)
            var d = '<div class="label"><h1>' + c.Name + '</h1>';
            var e = '<h2>Store Number: ' + b + '</h2>';
            var f = '<p>Address: ' + c.Address + '</p>';
            var g = '<p class="phone">Store Phone: ' + P + '</p>'
            var h = '<p>Region: ' + c.Region + '</p><br>';
            var i = '<p class="tz">Getting time..</p></div>'
            var j = d + e + f + g + h + i;
            var op = {
                'maxWidth': '500',
                'className': 'custom'
            }
            var dsg =
                'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'
            var gg =
                'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'
            var fs =
                'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png'
            var com =
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

            var ic = new L.Icon({
                iconUrl: ii,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
            });

            var m = new L.marker(L.latLng(c.Lat, c.Long), {
                id: b,
                name: d,
                phone: g,
                icon: ic
            }).bindPopup(j, op);

            ms.addLayer(m);
            sm[b] = m;
        })
    })

    map.addLayer(ms, {
        chunkedLoading: true,
    });

    ms.on('clusterclick', function (e) {
        $('#data-panel').addClass('show');
        let a = e.layer.getAllChildMarkers();
        $.each(a, function() {
            console.log(this);
            $('#show-stores').append(`<div class="store-cluster-label">${this.options.name}<p>Store #: ${this.options.id}</p>${this.options.phone}`);
        })
    })

    $('#close-data-panel').click(function (e) {
        $('#data-panel').removeClass('show');
        $('#show-stores').empty();
    })


    $('#search-bar').submit(function () {
        a = $(this).find('#search').val();
        $.getJSON(x, function (b) {
            q = b[a]
            if (q == undefined) {
                $("#search-error").toggleClass("show")
                setTimeout(function () {
                    $('#search-error').removeClass("show");
                }, 3000);
            } else {
                var m = sm[a]
                ms.removeLayer(m);
                m.addTo(map).openPopup();
                var r = q.Lat
                var t = q.Long
                var point = new L.LatLng(r, t);
                var y = sm[a].getLatLng();
                sm[a].openPopup([y.lat, y.lng]);
                map.setView(point, 10, {
                    animation: true
                })
                map.on('popupclose', function () {
                    ms.addLayer(m);
                    map.removeLayer(m);
                });
            }
            $("#search-bar").trigger("reset");
        })
        return false;

    });
})
// Use num decimal (.) to focus on search element
$(document).keypress(function (e) {
    if (e.which == 110)
        console.log("Num Decimal(.) captured.")
    $("#search").focus();
})
