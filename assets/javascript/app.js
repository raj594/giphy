      // Initial array of movies
      var gifs = ["Dog", "Cat", "Lion", "Snake"];
      var apiKey = "5dca7348ec7c425f9bb50f4a51b2d340";
      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {

        var gif = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + apiKey + "&limit=10";
        console.log(queryURL)
        $('#gif-view').empty();
        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          var gifDiv = $("<div class='still'>")
          // Storing the rating data
          for (var i = 0; i < response.data.length; i++) {
            gifDiv = $("<div class='still'>")
            var stillURL = response.data[i].images.fixed_height_still.url;
            var gifURL = response.data[i].images.fixed_height.url;
            var rating = response.data[i].rating;
            // Creating an element to hold the image
            var image = $("<img class='image'>").attr("src", stillURL);
            image.attr("gifURL", gifURL)
            image.attr("stillURL", stillURL)
            image.attr("rating", rating)
            var pOne = $("<p>").text("Rating: " + rating);
            gifDiv.append(pOne);
            gifDiv.append(image)

            // Putting the entire movie above the previous movies
            $("#gif-view").prepend(gifDiv);
          }
        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < gifs.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("gif");
          // Adding a data-attribute
          a.attr("data-name", gifs[i]);
          // Providing the initial button text
          a.text(gifs[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      function animateGif() {
        //
        var still = $(this).attr('stillURL')
        $(".image").each(function(){
          if ($(this).attr('stillURL') == still) {
            $(this).attr('src', $(this).attr('gifURL'))
          } else {
            $(this).attr('src', $(this).attr('stillURL'))
          }
        });
        
      }

      // This function handles events where a movie button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();

        // Adding movie from the textbox to our array
        gifs.push(gif);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".gif", displayMovieInfo);
      $(document).on("click", ".image", animateGif);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();