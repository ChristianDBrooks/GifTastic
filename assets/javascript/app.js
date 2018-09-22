$('body').addClass("bg-primary");

var topics = ["Cars", "Trucks", "Motorcycles", "Helicopters", "Boats"];

// Render buttons function will loop through all items in the topics array and create a button for each one and set attr's.
function renderButtons() {
    $("#col-number-one").empty();
    $("#col-number-two").empty();
    $("#col-number-three").empty();
    for (i = 0; i < topics.length; i++) {
        var btn = $("<input class='btn btn-primary ml-2 my-2 vehicle'>");
        btn.attr("type", "button"); 
        btn.attr("data-vehicle", topics[i].toLocaleLowerCase());
        btn.attr("value", topics[i]);
        $('#button-display').append(btn);
    };
};

function pullGiphs(search) {
    var limit = 12;
    var apiKey = "api_key=3V63lgYu7x52HfL0pZ3wCWMlfz8DpAYp";
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q="+ search +"&limit="+ limit +"&" + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        var colDiv = $('#col-number-one');
        for (i = 0; i < results.length; i++) {
            if (i < 4) {                                                          // A lot of this is fancy code to make a grid system of row and            // Set up bootstrap grid elements.
                colDiv = $('#col-number-one');
                var newImg = $("<img>");
                var ratingBtn = $("<button class='btn btn-success my-1'>").text("Rating ");
                var ratingBadge = $("<span class='badge badge-light text-primary'>").text(results[i].rating.toUpperCase());

                newImg.attr("class", "rounded mx-auto d-block gif");
                newImg.attr("src", results[i].images.fixed_width_still.url);           // Lets allow pausing of our gif.
                newImg.attr("data-animate", results[i].images.fixed_width.url);
                newImg.attr("data-still", results[i].images.fixed_width_still.url);
                newImg.attr("data-state", "still");

                ratingBtn.append(ratingBadge);  
                colDiv.append(newImg);    
                colDiv.append(ratingBtn);
                $("#giphy-display").append(colDiv);
            } else if (i < 8) {                                                          // A lot of this is fancy code to make a grid system of row and            // Set up bootstrap grid elements.
                colDiv = $('#col-number-two');
                var newImg = $("<img>");
                var ratingBtn = $("<button class='btn btn-success my-1'>").text("Rating ");
                var ratingBadge = $("<span class='badge badge-light text-primary'>").text(results[i].rating.toUpperCase());

                newImg.attr("class", "rounded mx-auto d-block gif");
                newImg.attr("src", results[i].images.fixed_width_still.url);           // Lets allow pausing of our gif.
                newImg.attr("data-animate", results[i].images.fixed_width.url);
                newImg.attr("data-still", results[i].images.fixed_width_still.url);
                newImg.attr("data-state", "still");

                ratingBtn.append(ratingBadge);  
                colDiv.append(newImg);    
                colDiv.append(ratingBtn);
                $("#giphy-display").append(colDiv);
            } else if (i < 12) {                                                          // A lot of this is fancy code to make a grid system of row and            // Set up bootstrap grid elements.
                colDiv = $('#col-number-three');
                var newImg = $("<img>");
                var ratingBtn = $("<button class='btn btn-success my-1'>").text("Rating ");
                var ratingBadge = $("<span class='badge badge-light text-primary'>").text(results[i].rating.toUpperCase());

                newImg.attr("class", "rounded mx-auto d-block gif");
                newImg.attr("src", results[i].images.fixed_width_still.url);           // Lets allow pausing of our gif.
                newImg.attr("data-animate", results[i].images.fixed_width.url);
                newImg.attr("data-still", results[i].images.fixed_width_still.url);
                newImg.attr("data-state", "still");

                ratingBtn.append(ratingBadge);  
                colDiv.append(newImg);    
                colDiv.append(ratingBtn);
                $("#giphy-display").append(colDiv);
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
    $("#col-number-one").empty();
    $("#col-number-two").empty();
    $("#col-number-three").empty();
    pullGiphs($(this).attr("data-vehicle"));
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
