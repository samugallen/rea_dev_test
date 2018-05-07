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
    });
  }
}

$(document).ready(devTest.init);