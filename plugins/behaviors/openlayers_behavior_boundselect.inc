<?php
/**
 * @file
 * Implementation of OpenLayers behavior.
 */

/**
 * Ctools plugin definition.
 */
$plugin = array(
  'title' => t('Bounds Select'),
  'description' => t('Allows the selection and display of a bounding box.'),
  'type' => 'map',
  'ui_visibility' => FALSE,
  'behavior' => array(
    'file' => 'openlayers_behavior_boundselect.inc',
    'class' => 'openlayers_behavior_boundselect',
    'parent' => 'openlayers_behavior',
  ),
);

/**
 * BoundSelect Behavior
 */
class openlayers_behavior_boundselect extends openlayers_behavior {
  /**
   * Provide initial values for options.
   */
  function options_init() {
    return array(
      'input_fields' => '',
    );
  }

  function js_dependency() {
    return array(
      'OpenLayers.Control.DrawFeature',
      'OpenLayers.Layer.Vector',
      'OpenLayers.Handler.RegularPolygon'
    );
  }

  function options_form($defaults) {
    return array(
    );
  }

  /**
   * Render.
   */
  function render(&$map) {
    drupal_add_js(drupal_get_path('module', 'openlayers_bounds_selector') . 
      '/plugins/behaviors/openlayers_behavior_boundselect.js');
    return $this->options;
  }
}
