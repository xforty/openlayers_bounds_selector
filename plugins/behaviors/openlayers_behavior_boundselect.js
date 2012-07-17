/**
 * @file
 * JS Implementation of OpenLayers behavior.
 */

(function ($) {
  var input_selector = '.field-widget-openlayers-bounds-selector-bounds-selector input.form-text';
  /**
   * Bound Select Behavior.  Allows user to select a bounding box.
   * 
   */
  Drupal.openlayers.addBehavior('openlayers_behavior_boundselect', function (data, options) {
    // Callback to set extent into a specific form item.
    function setRestrictedExtent(box) {
      var proj = new OpenLayers.Projection("EPSG:4326");
      var bounding_box = box.geometry.getBounds().transform(data.openlayers.projection,proj).toBBOX();
      $(input_selector).val(bounding_box);
      for (var i = 0; i < selections_layer.features.length; i++) {
        if (selections_layer.features[i] != box) {
          selections_layer.features[i].destroy();
        }
      }
    }

    // Create layer to draw with and handle events.
    var selections_layer = new OpenLayers.Layer.Vector('Temporary Box Layer');
    var control = new OpenLayers.Control.DrawFeature(selections_layer,
      OpenLayers.Handler.RegularPolygon, {
        featureAdded: setRestrictedExtent
      }
    );
    control.handler.setOptions({
      'keyMask': OpenLayers.Handler.MOD_SHIFT,
      'sides': 4,
      'irregular': true
    });
    control.events.on({'featureAdded': this.setRestrictedExtent});
    data.openlayers.addLayer(selections_layer);
    data.openlayers.addControl(control);
    
    // If there already is a value, then update the map appropriately.
    if ($(input_selector).val()) {
      bounds = $(input_selector).val();
      var proj = new OpenLayers.Projection("EPSG:4326");
      var bounds = new OpenLayers.Bounds.fromString(bounds).transform(proj,data.openlayers.projection); 
      geometry = bounds.toGeometry();
      feature = new OpenLayers.Feature.Vector(geometry);
      selections_layer.addFeatures([feature]);
      data.openlayers.zoomToExtent(bounds);
    }
    control.activate();
  });
}(jQuery));
