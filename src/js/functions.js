$(document).ready(function () {
$('#data-panel').hide();
    let states = [
        "Alabama",
        "Arkansas",
        "Arizona",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
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

    $(document).keypress(function (e) {
        if (e.which == 110)
        $("#search").focus();
    });

    $.each(states, function () {
        $('<div/>', {
            id: this + '_container',
            class: 'state-container'
        }).appendTo('#store-list_content');
    });

    $("#menu-button").click(function () {
        console.log('Menu Clicked');
        $(this).toggleClass("hamburger--open");
        $('#list-panel').show();
        $('<button/>', {
            id: 'close-list-panel',
            class: 'button',
            value: 'Close',
            text: 'Close'
        }).appendTo('#store-list_header').click(function() {
            $('#list-panel').hide();
            $('#close-list-panel').remove();
        });
    });

    $('<select/>', {
        id: 'store-filter-state',
        class: 'dropdown'
    }).appendTo('#store-list_header');

    $.each(states, function () {

        $('<h1>' + this + '</h1>', {
            id: this + '_heading',
            value: this,
            text: this
        }).appendTo('#' + this + '_container')

        $('<option>' + this + '</option>', {
            value: this + '_option'
        }).appendTo('#store-filter-state');
    });

    $('#store-filter-state').on('change', function() {
        let a = this.value;
        console.log(a);
    $('.state-container').hide();
    $('#'+a+'_container').show();
    });
});

// Hacky preloader since we can't leverage loading of Windy
setTimeout(function() {
    $('#preloader').hide();
}, 5000);