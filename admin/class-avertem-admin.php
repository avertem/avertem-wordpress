<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Avertem
 * @subpackage Avertem/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Avertem
 * @subpackage Avertem/admin
 * @author     Brett Chaldecott <brett.chaldecott@avertem.io>
 */
class Avertem_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;


	// options page slug
	private $options_page_name = 'avertem-settings';


	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}


	

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Plugin_Name_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Plugin_Name_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/avertem-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Plugin_Name_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Plugin_Name_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/avertem-admin.js', array( 'jquery' ), $this->version, false );

	}

	public function init_admin() {
		
	}

	/**
	 * Implements hook admin_menu to add our options/settings page to the
	 *  dashboard menu
	 */
	public function admin_menu() {
		// This page will be under "Settings"
		add_menu_page(
			'Settings Admin',
			'Avertem',
			'manage_options',
			'avertem-main-settings',
			array( $this, 'create_admin_page' ),
			plugin_dir_url( __FILE__ ) . '../assets/images/favicon-16x16.png'
		);
		add_submenu_page(
			'avertem-main-settings',
			'Settings Admin',
			'Settings',
			'manage_options',
			'avertem-main-settings',
			array( $this, 'create_admin_page' )
		);
	}

	function sanitize_options($value) {
		$value = stripslashes($value);
		$value = filter_var($value, FILTER_SANITIZE_STRING);
		return $value;
	}

	public function create_admin_page() {
		if (isset($_POST['avertem_option']) && !empty($_POST['avertem_option'])) {
			$post = $_POST['avertem_option'];
			foreach($post as $key=>$value) {
				$post[$key] = self::sanitize_options($value);
			}
			
			update_option( 'avertem_option', $post);
		}
		$avertem_option = get_option( 'avertem_option');
		?>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
		<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"></link>
		<br>
		<br>
		<div class="container">
			<div class="row">
	  			<div class="card col-12">
						<div class="card-header">
							<h1 class="display-4">Avertem</h1>
						</div>
						<form class="avertem-settings-form" method="post" action="#">
							<div class="card-body form-group">
								<label for="avertem_option_rest_endpoint">Rest End Point</label>
								<input type="text" id="avertem_option_rest_endpoint" name="avertem_option[rest_endpoint]" class="form-control" placeholder="Rest Endpoint" value="<?php echo $avertem_option['rest_endpoint'];?>" >
							</div>
							<div class="card-body form-group">
								<label for="avertem_option_rest_endpoint">Bearer Token</label>
								<textarea id="avertem_option_bearer_token" name="avertem_option[bearer_token]" class="form-control" placeholder="Bearer Token"><?php echo $avertem_option['bearer_token'];?></textarea>
							</div>
							<div class="card-footer text-right">
									<input type="submit" name="submit" id="submit" class="btn btn-primary btn-lg" value="<?php esc_attr_e('Save', 'avertem');?>">
							</div>
						</form>
					</div>
			</div>
		</div>
		<?
	}


}
