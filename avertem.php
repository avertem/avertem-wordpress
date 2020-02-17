<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://avertem.io
 * @since             1.0.0
 * @package           Avertem
 *
 * @wordpress-plugin
 * Plugin Name:       Avertem
 * Plugin URI:        http://avertem.io/wp-plugin/
 * Description:       Avertem Network
 * Version:           1.0.0
 * Author:            Avertem
 * Author URI:        http://avertem.io/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       avertem
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'AVERTEM_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-avertem-activator.php
 */
function activate_avertem() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-avertem-activator.php';
	Avertem_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-plugin-name-deactivator.php
 */
function deactivate_avertem() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-avertem-deactivator.php';
	Avertem_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_avertem' );
register_deactivation_hook( __FILE__, 'deactivate_avertem' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-avertem.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_avertem() {

	$plugin = new Avertem();
	$plugin->run();

}
run_avertem();
