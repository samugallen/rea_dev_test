function buttonClicks(target) {
  console.log("Click");
  var propertyLength = $(target + " .property").length;
  var randProperty = Math.floor(Math.random() * propertyLength) + 1;
  console.log("Column: " + target);
  console.log("Total properties: " + propertyLength);
  console.log("Property Clicked: " + randProperty);
  $(target + " .property:nth-child(" + randProperty + "n) .property-control-button").click();
}

$(document).ready(function() {
  // Check if properties are loaded.
  $.when($.ajax( "data/properties.json" )).then(function( data, textStatus, jqXHR ) {
    console.log("Properties data loaded.");
    // Check is propertyData variable from main.js is populated.
    console.log(propertyData);

    if ($('.property').length > 0) {
      console.log("Property columns populated.")
    }

    var clicks = setInterval(function() {
      // Once properties have loaded, perform a few test clicks
      var targets = ["#results", "saved-properties"];
      buttonClicks(targets[Math.floor(Math.random() * targets.length)]);
    }, 10000);
    setTimeout(function() {
      clearInterval(clicks)
    }, 50000)
  });

  // Test when Save Property button is pressed.
  $(document).on("click", "#results .property-control-button", function(e) {
    // Find the id of the property clicked
    var propertyID = $(this).closest(".property").attr("data-propertyID");
    // Due to the order of events (i.e. the add function would happen AFTER the test checks if the element exists)
    // We add short timeout to ensure element has been added
    setTimeout(function() {
      // Check if property exists in the saved properties column
      // The outcome of this if can be toggled by removing lines 53-58 of assets/js/main.js
      if ($("#saved-properties .property[data-propertyID=" + propertyID + "]").length > 0) {
        console.log(propertyID + " saved");
      } else {
        console.log(propertyID + " not saved");
      }
    }, 200);
  });

  // Test when Remove Property is pressed
  $(document).on("click", "#saved-properties .property-control-button", function() {
    // Find the id of the property clicked
    var propertyID = $(this).closest(".property").attr("data-propertyID");
    // Due to the order of events (i.e. the remove function would happen AFTER the test checks if the element exists)
    // We add short timeout to ensure element has been removed
    setTimeout(function() {
      // Ensure property no longer exists in Saved Properties column.
      // The outcome of this if can be toggled by removing line ~64 of assets/js/main.js
      if ($("#saved-properties .property[data-propertyID=" + propertyID + "]").length <= 0) {
        console.log(propertyID + " removed");
      } else {
        console.log(propertyID + " not removed");
      }
    }, 200)
  });
});