
// DOM functions
$(document).ready(function () {
    // Use num decimal (.) to focus on search element
    $(document).keypress(function (e) {
        if (e.which == 110)
            console.log("Num Decimal(.) captured.")
        $("#search").focus();
    });

    // Store list panel
    $("#menu-button").click(function () {
        console.log('Menu Clicked');
        $(this).toggleClass("hamburger--open");
    });

    let storeListFilter = $('#store-list_filter');

    storeListFilter.change(function() {
        let value = $(this).val();
        console.log(value);

        if(value == 'state') {
            console.log('Selected State');
            $('<select/>', {
                id: 'store-filter-state',
                class: 'filterBy',
                title: 'test'
            }).appendTo('#store-list_header');

            // Array of US states to loop through
            let states = ["Alaska",
                  "Alabama",
                  "Arkansas",
                  "American Samoa",
                  "Arizona",
                  "California",
                  "Colorado",
                  "Connecticut",
                  "District of Columbia",
                  "Delaware",
                  "Florida",
                  "Georgia",
                  "Guam",
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
                  "Puerto Rico",
                  "Rhode Island",
                  "South Carolina",
                  "South Dakota",
                  "Tennessee",
                  "Texas",
                  "Utah",
                  "Virginia",
                  "Virgin Islands",
                  "Vermont",
                  "Washington",
                  "Wisconsin",
                  "West Virginia",
                  "Wyoming"]

                  $.each(states, function() {
                    $('<div/>', {
                        id: this
                    }).appendTo('#store-list_content');

                    $('<option>'+this+'</option>', {
                        value: this
                    }).appendTo('#store-filter-state');
                  });
        }
    });

    

    
});