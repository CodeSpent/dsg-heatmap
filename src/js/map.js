const gKey = 'AIzaSyDRo-UGY91_EiB2DeYzBU21-3FcaqIanPo';
var fr = 'HH:mm:ss a';
var sm = [];

$.getJSON("https://api.myjson.com/bins/dyqk4", function(storeData) {
    

console.log(storeData);

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

    var ms = L.markerClusterGroup({
        disableClusteringAtZoom: 11,
        spiderfyOnMaxZoom: true,
        animateAddingMarkers: true,
        maxClusterRadius: 50,
    });

        $.each(storeData, function (b, c) {
            var p = c.Phone.replace(/[- )(]/g, '');
            var P = "(" + p.substr(0, 3) + ') ' + p.substr(3, 3) +
                '-' + p.substr(6, 4)
            var d = '<div class="label"><h1>' + c.Name + '</h1>';
            var e = '<h2>Store Number: ' + b + '</h2>';
            var f = '<p>Address: ' + c.Formatted_Address + '</p>';
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
            $(document).ready(function() {
                $.each(storeData, function() {
                    $('Test').appendTo('#store-list_content');
                })
            });
        
        })
    
    map.addLayer(ms, {
        chunkedLoading: true,
    });


    ms.on('clusterclick', function (e) {
        $('#data-panel').addClass('show');
        let a = e.layer.getAllChildMarkers();
        $.each(a, function() {
            console.log(this);
            $('#show-stores').append(`<div class="store-cluster-label"><h3>${this.options.name}</h3><h4>Store #: ${this.options.id}</h4><p>Store Phone: ${this.options.phone}</p> <p>${this.options.address}</p>`);
        })
    })

    $('#close-data-panel').click(function (e) {
        $('#data-panel').removeClass('show');
        $('#show-stores').empty();
    })

    $(document).ready(function() {
        $.each(sm, function() {
            let a = Object.keys(this.options);
            
            console.log(a);
        })
    });
});

});