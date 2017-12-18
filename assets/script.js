$(document).ready(function(){

	let giphyQueries = ["30 Rock","face palm", "Chuck Norris","nyan cat","turnt"];
	let newQuery = $("")
	//console.log(giphyQueries);
	$("#newQueryInput").focus();

	//CREATE THE INITIAL BUTTON ARRAY DISPLAY
	function createButtonDisplay(){
		for(var index = 0; index < giphyQueries.length; index++){
			let originalButtons = $("<button>");
			originalButtons.addClass("query original-buttons");
			originalButtons.attr("data-query",giphyQueries[index]);
			originalButtons.text(giphyQueries[index]);

			$(".button-container").append(originalButtons);
			console.log(originalButtons);
		}
	}
	createButtonDisplay();
    
	//GIHPY BUTTON CLICK FUNCTION
    $(".original-buttons").on("click", function() {
      	var query = $(this).attr("data-query");
      	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=dc6zaTOxFJmzC&limit=10";
      	console.log(queryURL);
      	console.log(query);
    	$(".giphy-container").empty(""); 
    		$.ajax({
        		url: queryURL,
          		method: "GET"
        	}).done(function(response) {
          	var results = response.data;
        	for (var giphy = 0; giphy < results.length; giphy++) {
	            let giphyImage = $("<img>");
	            giphyImage.attr("src", results[giphy].images.fixed_height.url);
	            //giphyImage.addClass("img-responsive")
	            $(".giphy-container").prepend(giphyImage);
          	}
        });
    });

    //WHEN A NEW GIPHY IS ADDED IT WILL AUTOMATICALLY UPDATE THE GIPHY DISPLAY WHILE ALSO UPDATING THE BUTTON DISPLAY
    $("#newButton").on("click", function(event) {
    	event.preventDefault();
    	let userInput = $("#newQueryInput").val();
      	let query = $("#newQueryInput").val().trim();
      	let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=dc6zaTOxFJmzC&limit=10";
      	let newButton = $("<button>");
      	giphyQueries.push(query);
      	//console.log(queryURL);
      	//console.log(query);
      	newButton.addClass("query original-buttons");
		newButton.attr("data-query", query);
		newButton.text(userInput);

		$(".button-container").append(newButton);
    	$(".giphy-container").empty("");
       	$("#newQueryInput").val(""); 
    		$.ajax({
        		url: queryURL,
          		method: "GET"
        	}).done(function(response) {
          	var results = response.data;
        	for (var giphy = 0; giphy < results.length; giphy++) {
	            let giphyImage = $("<img>");
	            giphyImage.attr("src", results[giphy].images.fixed_height.url);
	            //giphyImage.addClass("img-responsive")
	            $(".giphy-container").prepend(giphyImage);
          	}
        });
    });
});