<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Avertem
 * @subpackage Avertem/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Avertem
 * @subpackage Avertem/includes
 * @author     Brett Chaldecott <brett.chaldecott@avertem.io>
 */
class Avertem {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Plugin_Name_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'AVERTEM_VERSION' ) ) {
			$this->version = AVERTEM_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'avertem';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Avertem_Loader. Orchestrates the hooks of the plugin.
	 * - Avertem_i18n. Defines internationalization functionality.
	 * - Avertem_Admin. Defines all hooks for the admin area.
	 * - Avertem_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-avertem-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-avertem-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-avertem-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-avertem-public.php';

		$this->loader = new Avertem_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Avertem_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Avertem_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Avertem_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );
		$this->loader->add_action( 'init', $plugin_admin, 'init_admin' );
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'admin_menu' );

	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Avertem_Public( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );

		// alter the login form as dictated by settings
		$this->loader->add_filter( 'login_message', $plugin_public, 'handle_login_message' );
		$this->loader->add_filter( 'register_form', $plugin_public, 'handle_registration_form' );
		$this->loader->add_filter( 'rest_api_init', $plugin_public, 'handle_rest_api_init' );


		$this->loader->add_action( 'plugins_loaded', $plugin_public, 'textdomain' );
      	$this->loader->add_action( 'admin_head-nav-menus.php', $plugin_public, 'admin_nav_menu');
      	$this->loader->add_filter( 'wp_setup_nav_menu_item', $plugin_public, 'login_logout_setup_menu' );
      	$this->loader->add_filter( 'wp_nav_menu_objects', $plugin_public,'login_logout_menu_objects' );

      	// hook into the registration action
      	$this->loader->add_action( 'user_register', $plugin_public, 'handle_registration_hook' );

      	// add the short codes
      	add_shortcode( 'avertem_shortcode_wallet', array( $plugin_public, 'get_wallet_code' ) );
      	add_shortcode( 'avertem_shortcode_transactions', array( $plugin_public, 'get_transactions_code' ) );
      	add_shortcode( 'avertem_shortcode_send', array( $plugin_public, 'get_send_code' ) );
      	add_shortcode( 'avertem_shortcode_explorer', array( $plugin_public, 'get_explorer_code' ) );
      	add_shortcode( 'avertem_shortcode_producer', array( $plugin_public, 'get_producer_code' ) );

      	//add_shortcode( 'avertem_shortcode_buy', array( $plugin_public, 'get_buy_code' ) );
      	add_shortcode( 'avertem_shortcode_contract', array( $plugin_public, 'get_contract_code' ) );
      	add_shortcode( 'avertem_shortcode_contracts', array( $plugin_public, 'get_contracts_code' ) );
      	add_shortcode( 'avertem_shortcode_contract_errors', array( $plugin_public, 'get_contract_errors_code' ) );
      	
      	add_shortcode( 'avertem_shortcode_namespace', array( $plugin_public, 'get_namespace_code' ) );
      	add_shortcode( 'avertem_shortcode_namespaces', array( $plugin_public, 'get_namespaces_code' ) );
      	add_shortcode( 'avertem_shortcode_namespace_errors', array( $plugin_public, 'get_namespace_errors_code' ) );

      	add_shortcode( 'avertem_shortcode_sidechain', array( $plugin_public, 'get_sidechain_code' ) );
      	add_shortcode( 'avertem_shortcode_sidechains', array( $plugin_public, 'get_sidechains_code' ) );
      	add_shortcode( 'avertem_shortcode_sidechain_errors', array( $plugin_public, 'get_sidechain_errors_code' ) );
      	
      	
      	add_shortcode( 'avertem_shortcode_tools', array( $plugin_public, 'get_tools_code' ) );

	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Plugin_Name_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
