      // Initial array of gif catagories
      var gifs = ["Dog", "Cat", "Lion", "Snake"];
      var apiKey = "5dca7348ec7c425f9bb50f4a51b2d340";
      // displaygifInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + apiKey + "&limit=10&rating=g&rating=pg";
        console.log(queryURL)
        $('#gif-view').empty();
        // Creating an AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          var gifDiv = $("<div class='still'>")

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

      // Function for displaying gif catagory buttons.
      function renderButtons() {

        // Deleting the gif buttons prior to adding new gif buttons
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of gif catagories
        for (var i = 0; i < gifs.length; i++) {

          // Then dynamicaly generating buttons for each catagory in the array
          var a = $("<button>");
          // Adding a class of gif to our button
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
        // First we take an attribute from the image clicked with 
        // which we can compare the other images.
        var still = $(this).attr('stillURL')

        // Then we cycle through all of the images on the page
        $(".image").each(function(){

          // If the attribute matches that of the image clicked...
          if ($(this).attr('stillURL') == still) {

            // Set the source of that image to the moving gif URL
            $(this).attr('src', $(this).attr('gifURL'))
          } else {

            // If the attribute does not match that of the image clicked
            // set the src of the image to that of the still URL.
            $(this).attr('src', $(this).attr('stillURL'))
          }
        });
        
      }

      // This function handles events where a new gif button is added
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();

        // Adding gif from the textbox to our array
        gifs.push(gif);

        // Calling renderButtons which handles the processing of our gif button array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "gif"
      $(document).on("click", ".gif", displayMovieInfo);

      // Adding a click event listener to all elements with a class of "image"
      $(document).on("click", ".image", animateGif);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();