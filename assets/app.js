$(document).ready(function() {

  let array = ["cats", "tv", "space", "trump", "sports", "news", "humor"];

  function renderButtons() {

   // Deleting the buttons prior to adding new ones
   $("#buttons").empty();

   // loop to create new buttons and populate button div
   for (let i = 0; i < array.length; i++) {
     let btnDiv = $("<div class='text-left'>");
     btnDiv.attr("id", "item-" + i);
     btnDiv.addClass("button-style");
     btnDiv.css({
      "margin-top": "0px",
      "outline": "0",
    });

     let closeBtn = $("<button>");
     closeBtn.attr("data-close", i);
     closeBtn.addClass("checkbox");
     closeBtn.text("x");
     closeBtn.css({
       "margin-top": "0px",
       "outline": "0",
     });

     let gifBtn = $("<button>");
     gifBtn.addClass("gif-button");
     gifBtn.attr("data-gif", array[i]);
     gifBtn.attr("type", "button");
     gifBtn.text(array[i]);

     $(btnDiv).append(closeBtn);
     $(btnDiv).append(gifBtn);

     $("#buttons").append(btnDiv);
   }
 }

 // when user clicks a gif button
 $("#buttons").on("click",".gif-button", function() {
       let topic = $(this).attr("data-gif");
       console.log(topic);
       let rating = Math.floor(Math.random() * 3);
       console.log(rating);
       if (rating === 0) {
         rating = "G";
         console.log("line 32 " + rating);
       }
       else if (rating === 1) {
         rating = "PG";
         console.log("line 32 " + rating);
       }
       else {
         rating = "PG-13";
         console.log("line 36 " + rating);
       }

       // setting giphy api
       let queryURL = "https://api.giphy.com/v1/gifs/random?api_key=XA9pNrEDRab3yb99QwuNVa8gWktN97yn&tag=" + topic + "&rating=" + rating;
       console.log(queryURL);

       $.ajax({
         url: queryURL,
         method: "GET"
       })
 
         .then(function(response) {

           // creating variables from api response
           let gifUrl = response.data.image_original_url;
           let stillUrl = response.data.images.original_still.url;
           // creating a div to stick the image and rating text in
           let gifDiv = $("<div class='imageBox'>");
           let p = $("<p>").text("Rated " + rating);
 
           // creating images and adding attributes
           let gifImage = $("<img>");
          
           // creating the image attributes
           $(gifImage).attr("src", gifUrl);
           $(gifImage).attr("data-still", stillUrl);
           $(gifImage).attr("data-animate", gifUrl);
           $(gifImage).attr("data-state", "animate");
           $(gifImage).css({"height": "300px"});
           $(gifImage).addClass("gif");
           $(gifImage).addClass("rounded mx-auto d-block");
           $(gifDiv).append(gifImage);
           $(gifDiv).append(p);
           $(gifDiv).css({"display": "inline-block"})

           // putting the gif and rating on the page with animation
           $(gifDiv).hide().prependTo("#images").slideDown(750);

         });

     });

     // when user clicks on a gif
     $("#images").on("click",".gif", function() {
     // setting the state to the state of the gif clicked
     let state = $(this).attr("data-state");
     // checking condition of state
     if (state === "still") {
       $(this).attr("src", $(this).attr("data-animate"));
       $(this).attr("data-state", "animate");
     } else {
       $(this).attr("src", $(this).attr("data-still"));
       $(this).attr("data-state", "still");
     }
   });

   // removes row
   $(document.body).on("click", ".checkbox", function() {
     let removeBtn = $(this).attr("data-close");
     console.log(removeBtn);
     console.log(array);
     $("#item-" + removeBtn).remove();
     array.splice(removeBtn, 1);
     console.log(array);
     renderButtons();
   });

   // when user adds a new topic button
   $("#add-gif").on("click", function(event) {
    event.preventDefault();
    let gifText = $("#gif-input").val().trim();
    array.push(gifText);
     renderButtons();
   });

   // displaying the initial list of buttons
   renderButtons();

});