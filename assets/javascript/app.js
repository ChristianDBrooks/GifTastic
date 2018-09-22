$('body').addClass("bg-primary");

var searchlimit;
var searchRequest;
var topics = ["Cars", "Trucks", "Motorcycles", "Helicopters", "Boats"];

// Render buttons function will loop through all items in the topics array and create a button for each one and set attr's.
function renderButtons() {
    $("#button-display").empty();
    for (i = 0; i < topics.length; i++) {
        var btn = $("<input class='btn btn-primary mr-2 my-2 vehicle'>");
        btn.attr("type", "button"); 
        btn.attr("data-vehicle", topics[i].toLocaleLowerCase());
        btn.attr("value", topics[i]);
        $('#button-display').append(btn);
    };
};

function pullGiphs(search, limit) {

    var apiKey = "api_key=3V63lgYu7x52HfL0pZ3wCWMlfz8DpAYp";
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q="+ search +"&limit="+ limit +"&" + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        var rowCounter = 0;
        for (i = 0; i < results.length; i++) {
            if (i % 3 === 0) {                                                          // A lot of this is fancy code to make a grid system of row and 
                rowCounter = (i / 3);
                var rowDiv = $("<div class='row mb-3 row-"+ (i / 3) +"'>");                  // Set up bootstrap grid elements.
                var colDiv = $("<div class='col text-center'>");
                var newImg = $("<img>");
                var ratingBtn = $("<button class='btn btn-success my-1'>").text("Rating ");
                var ratingBadge = $("<span class='badge badge-light text-primary'>").text(results[i].rating.toUpperCase());

                newImg.attr("class", "rounded mx-auto d-block gif");
                newImg.attr("src", results[i].images.fixed_width_still.url);           // Lets allow pausing of our gif.
                newImg.attr("data-animate", results[i].images.fixed_width.url);
                newImg.attr("data-still", results[i].images.fixed_width_still.url);
                newImg.attr("data-state", "still");

                colDiv.append(newImg);
                ratingBtn.append(ratingBadge);      
                colDiv.append(ratingBtn);
                rowDiv.append(colDiv);
                $('#giphy-display').append(rowDiv);
            } else {
                var colDiv = $("<div class='col text-center'>");
                var newImg = $("<img>");
                var ratingBtn = $("<button class='btn btn-success my-1'>").text("Rating ");
                var ratingBadge = $("<span class='badge badge-light text-primary'>").text(results[i].rating.toUpperCase());

                newImg.attr("class", "rounded mx-auto d-block gif");
                newImg.attr("src", results[i].images.fixed_width_still.url);
                newImg.attr("data-animate", results[i].images.fixed_width.url);
                newImg.attr("data-still", results[i].images.fixed_width_still.url);
                newImg.attr("data-state", "still");

                colDiv.append(newImg);
                ratingBtn.append(ratingBadge);      
                colDiv.append(ratingBtn);
                $(".row-" + rowCounter).append(colDiv);
            };
        };
    });
};

// add-vehicle on click handler for when the user wants to add a new button to the list of buttons.
$("#add-vehicle").on("click", function(event) {
    event.preventDefault();
    topics.push($("#vehicle-input").val());
    renderButtons();
});

//run render buttons initially then every time after a button is added.
renderButtons();

// click handler for the dynamically created jquery buttons. This method allows new buttons to be clicked as well and work.
// Jquery wrapped document + filter + function to execute.
$(document).on("click", ".vehicle", function() {
    $("#giphy-display").empty();
    searchRequest = $(this).attr("data-vehicle");
    searchLimit = 12;
    pullGiphs(searchRequest, searchLimit);
});

// Creates a toggling switch of the attr "data-state" on each click.
$(document).on("click", ".gif", function() {
    var state = $(this).attr('data-state');
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    };
});

$("#minus").on("click", function() {
    $("#giphy-display").empty();
    searchLimit -= 3;
    pullGiphs(searchRequest, searchLimit);
});

$("#reset").on("click", function() {
    $("#giphy-display").empty();
    searchLimit = 12;
    pullGiphs(searchRequest, searchLimit);
});

$("#plus").on("click", function() {
    $("#giphy-display").empty();
    searchLimit += 3;
    pullGiphs(searchRequest, searchLimit);
});
