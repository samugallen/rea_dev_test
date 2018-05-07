// variable for property data loaded via JSON
var propertyData = "";


var devTest = {
  init: function() {
    devTest.loadData();
  },
  loadData: function() {
    // Loads the JSON from the specified location and saves it to the prepared variable
    $.getJSON( "data/properties.json", function( data ) {
      propertyData = data;
      devTest.displayProperties(propertyData);
    });
  },
  displayProperties: function(propertyData) {
    // Loop through results and display the properties in the results column
    for (i = 0; i < propertyData.results.length; i++) {
      devTest.propertyTemplate("#results", propertyData.results[i]);
    }
    // Loop through results and display the properties in the saved column
    for (i = 0; i < propertyData.results.length; i++) {
      devTest.propertyTemplate("#saved-properties", propertyData.saved[i]);
    }
    // Prepare property button functions
    devTest.propertyButtonControls();
  },
  propertyTemplate: function(target, property) {
    if (property != undefined || property != null) {
      var propertyHTML =  "<div data-propertyID='property-" + property.id + "' class='property'>";
      propertyHTML +=       "<div class='property-header' style='background: " + property.agency.brandingColors.primary + ";'>";
      propertyHTML +=         "<img src='" + property.agency.logo + "' alt='' class='property-logo'/>";
      propertyHTML +=       "</div>";
      propertyHTML +=       "<div class='property-body'>";
      propertyHTML +=         "<img src='" + property.mainImage + "' alt='' class='main-image'/>";
      propertyHTML +=         "<a href='#' class='property-control-button'><span class='add'>Add Property</span><span class='remove'>Remove Property</span></a>";
      propertyHTML +=       "</div>";
      propertyHTML +=       "<div class='property-footer'>";
      propertyHTML +=         "<span class='price'>" + property.price + "</span>";
      propertyHTML +=       "</div>";
      propertyHTML +=      "</div>";

      $(target).append(propertyHTML);
    }
  },
  propertyButtonControls: function() {
    $('#results .property-control-button').on("click", function(e) {
      e.preventDefault();
      // Check if the property is already saved.
      var propertyID = $(this).closest(".property").attr("data-propertyID");
      if ($("#saved-properties .property[data-propertyID=" + propertyID + "]").length <= 0) {
        // Add the property to the saved list.
        $(this).closest(".property").clone().appendTo('#saved-properties');
        // Disable the button and update its text.
        $(this).addClass("disabled").find('span.add').html("Saved")
      }
    });
    $(document).on("click", "#saved-properties .property-control-button", function() {
      var propertyID = $(this).closest(".property").attr("data-propertyID");
      // Remove the property
      $(this).closest(".property").remove();
      // Enable the button in the results column and update its text.
      $("#results .property[data-propertyID=" + propertyID + "] .property-control-button").removeClass("disabled").find('span.add').html("Add Property")
    });
  }
}

$(document).ready(devTest.init);