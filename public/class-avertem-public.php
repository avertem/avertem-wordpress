<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://avertem.io
 * @since      1.0.0
 *
 * @package    Avertem
 * @subpackage Avertem/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Avertem
 * @subpackage Avertem/public
 * @author     Brett Chaldecott <brett.chaldecott@avertem.io>
 */
class Avertem_Public {

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

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Avertem_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Avertem_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/avertem-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Avertem_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Avertem_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/avertem-public.js', array( 'jquery' ), $this->version, false );

	}


	public function handle_login_message($message) {
		// login button is appended to existing messages in case of error
		$message .= $this->login_message($message);
		return $message;
	}

	/**
	 * Create a login button (link)
	 *
	 * @return string
	 */
	private function login_message($message) {


		ob_start();
		?>
		<p style='text-align: center;'>
			Welcome to the Avertem Network. 
		</p>
		
		<?php
		return ob_get_clean();
	}


	public function handle_registration_form($process = 'wp') {

	}

	function callAPI($method, $url, $data, $options){
	   $curl = curl_init();
	   switch ($method){
	      case "POST":
	         curl_setopt($curl, CURLOPT_POST, 1);
	         if ($data)
	            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	         break;
	      case "PUT":
	         curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
	         if ($data)
	            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);			 					
	         break;
	      default:
	         if ($data)
	            $url = sprintf("%s?%s", $url, http_build_query($data));
	   }
	   // OPTIONS:
	   curl_setopt($curl, CURLOPT_URL, $url);
	   curl_setopt($curl, CURLOPT_HTTPHEADER, array(
	      'Content-Type: application/json',
	      'Authorization: Bearer '.$options['bearer_token']
	   ));
	   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	   //curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

	   // EXECUTE:
	   $result = curl_exec($curl);
	   if(!$result){die("Connection Failure");}
	   
	   curl_close($curl);
	   return $result;
	}

	public function handle_registration_hook($user_id) {
		error_log('Register  the user '.$user_id);

		$user = get_userdata($user_id);
		$mnemonic_key = json_decode(get_user_meta( $user_id, 'mnemonic', true ));

		//if (get_user_meta( $user_id, 'anonymous', true ) == 'anonymous') {
		//	$username = $mnemonic_key->mnemonic_account;
		//	$email = $mnemonic_key->mnemonic_account;
		//	$email_verified = false;
		//	$firstname = $mnemonic_key->mnemonic_account;
		//	$lastname = $mnemonic_key->mnemonic_account;
		//} else {
			$username = $user->user_login;
			$email = $user->user_email;
			$email_verified = false;
			$firstname = $user->first_name;
			$lastname = $user->last_name;
		//}

		$account_type = 'personal';
		if (get_user_meta( $user_id, 'business', true ) == 'business') {
			$account_type = 'business';
		}
		

		$data = array(
		    'account' => $mnemonic_key->mnemonic_account,
		    'accountKey' => $mnemonic_key->mnemonic_public_key,
		    'email' => $email,
		    'email_verified' => $email_verified,
		    'user' => $username,
		    'account_type' => $account_type,
		    'firstname' => $firstname,
		    'lastname' => $lastname
		);
		$payload = json_encode($data);
		error_log('The payload : '.$payload);
		$avertem_option = get_option('avertem_option');

		$result = $this->callAPI('POST',$avertem_option['rest_endpoint'],$payload,$avertem_option);
		error_log('Result : '. $result->created);
		
	}


	/**
    * Load Languages
    * @since 1.0.0
    */
    public function textdomain() {

      $plugin_dir =  dirname( plugin_basename( __FILE__ ) ) ;
      load_plugin_textdomain( 'login-logout-menu', false, $plugin_dir . '/languages/' );
    }

    /* Registers Login/Logout/Register Links Metabox */
    function admin_nav_menu() {
      add_meta_box( 'login_logout_menu', __( 'Avertem Menu', 'login-logout-menu' ), array( $this, 'admin_nav_menu_callback' ), 'nav-menus', 'side', 'default' );
    }

    /* Displays Login/Logout/Register Links Metabox */
    function admin_nav_menu_callback(){

      global $nav_menu_selected_id;

      $elems = array(
        '#loginpress-login#'	      => __( 'Log In', 'login-logout-menu' ),
        '#loginpress-logout#'	    => __( 'Log Out', 'login-logout-menu' ),
        '#loginpress-loginlogout#' => __( 'Log In', 'login-logout-menu' ) . ' | ' . __( 'Log Out', 'login-logout-menu' ),
        '#loginpress-register#'    => __( 'Register', 'login-logout-menu' ),
        '#loginpress-profile#'     => __( 'Profile', 'login-logout-menu' )
      );
      $logitems = array(
        'db_id' => 0,
        'object' => 'bawlog',
        'object_id',
        'menu_item_parent' => 0,
        'type' => 'custom',
        'title',
        'url',
        'target' => '',
        'attr_title' => '',
        'classes' => array(),
        'xfn' => '',
      );

      $elems_obj = array();
      foreach ( $elems as $value => $title ) {
        $elems_obj[ $title ] 		= (object) $logitems;
        $elems_obj[ $title ]->object_id	= esc_attr( $value );
        $elems_obj[ $title ]->title	= esc_attr( $title );
        $elems_obj[ $title ]->url	= esc_attr( $value );
      }

      $walker = new Walker_Nav_Menu_Checklist( array() );
      ?>
      <div id="login-links" class="loginlinksdiv">

        <div id="tabs-panel-login-links-all" class="tabs-panel tabs-panel-view-all tabs-panel-active">
          <ul id="login-linkschecklist" class="list:login-links categorychecklist form-no-clear">
            <?php echo walk_nav_menu_tree( array_map( 'wp_setup_nav_menu_item', $elems_obj ), 0, (object) array( 'walker' => $walker ) ); ?>
          </ul>
        </div>

        <p class="button-controls">
          <span class="list-controls hide-if-no-js">
            <a href="javascript:void(0);" class="help" onclick="jQuery( '#login-logout-menu-help' ).toggle();"><?php _e( 'Help', 'login-logout-menu' ); ?></a>
            <span class="hide-if-js" id="login-logout-menu-help"><br /><a name="login-logout-menu-help"></a>
              <?php
              echo '&#9725;' . esc_html__( 'To redirect user after login/logout/register just add a relative link after the link\'s keyword, example :', 'login-logout-menu' ) . ' <br /><code>#loginpress-loginlogout#index.php</code>.';
              echo '<br /><br />&#9725;' . esc_html__( 'You can also use', 'login-logout-menu' ) . ' <code>%current-page%</code> ' . esc_html__( 'to redirect the user on the current visited page after login/logout/register, example :', 'login-logout-menu' ) . ' <code>#loginpress-loginlogout#%current-page%</code>.<br /><br />';
              echo sprintf( __( 'To get plugin support contact us on <a href="%1$s" target="_blank">plugin support forum</a> or <a href="%2$s" target="_blank">contact us page</a>.', 'login-logout-menu'), 'https://avertem.io/', 'https:/avertem.io/contact/' ) . '<br /><br />';
                ?>
              </span>
            </span>

            <span class="add-to-menu">
              <input type="submit"<?php disabled( $nav_menu_selected_id, 0 ); ?> class="button-secondary submit-add-to-menu right" value="<?php esc_attr_e( 'Add to Menu', 'login-logout-menu' ); ?>" name="add-login-links-menu-item" id="submit-login-links" />
              <span class="spinner"></span>
            </span>
          </p>

        </div>
        <?php

    }

  	/**
   	* Show Login || Logout Menu item for front end.
   	*
   	* @since 1.0.0
   	* @param object $menu_item The menu item object.
   	*/
  	function login_logout_setup_title( $title ) {

	    $titles = explode( '|', $title );

	    if ( ! is_user_logged_in() ) {
	      return esc_html( isset( $titles[0] ) ? $titles[0] : $title );
	    } else {
	      return esc_html( isset( $titles[1] ) ? $titles[1] : $title );
	    }
  	}

	/**
	* Filters a navigation menu item object. Decorates a menu item object with the shared navigation menu item properties on front end.
	*
	* @since 1.0.0
	* @param object $menu_item The menu item object.
	*/
	function login_logout_setup_menu( $item ) {

		global $pagenow;

		if ( $pagenow != 'nav-menus.php' && ! defined( 'DOING_AJAX' ) && isset( $item->url ) && strstr( $item->url, '#loginpress' ) != '' ) {

		  $item_url = substr( $item->url, 0, strpos( $item->url, '#', 1 ) ) . '#';
		  $item_redirect = str_replace( $item_url, '', $item->url );

		  if ( $item_redirect == '%current-page%' ) {
		    $item_redirect = $_SERVER['REQUEST_URI'];
		  }

		  switch ( $item_url ) {
		    case '#loginpress-loginlogout#' :

			    $item_redirect = explode( '|', $item_redirect );

			    if ( count( $item_redirect ) != 2 ) {
			      $item_redirect[1] = $item_redirect[0];
			    }

			    if ( is_user_logged_in() ) {

			      	$item->url = wp_logout_url( $item_redirect[1] );
			    } else if ( shortcode_exists('openid_connect_generic_auth_url') ) {
			    	$item->url = do_shortcode('[openid_connect_generic_auth_url]');
			    } else {
			      	$item->url = wp_login_url( $item_redirect[0] );
			    }
			    

			    $item->title = $this->login_logout_setup_title( $item->title ) ;
			    break;

		    case '#loginpress-login#' :

			    if ( is_user_logged_in() ) {
			      return $item;
			    }

			    if ( shortcode_exists('openid_connect_generic_auth_url') ) {
			    	$item->url = do_shortcode('[openid_connect_generic_auth_url]');
			    } else {
			      	$item->url = wp_login_url( $item_redirect[0] );
			    }
			    break;

		    case '#loginpress-logout#' :
			    if ( ! is_user_logged_in() ) {
			      return $item;
			    }

			    $item->url = wp_logout_url( $item_redirect );
			    break;

		    case '#loginpress-register#' :

			    if ( is_user_logged_in() ) {
			      return $item;
			    }

			    $item->url = wp_registration_url();
			    
			    break;

		    case '#loginpress-profile#' :
			    if ( ! is_user_logged_in() ) {
			      return $item;
			    }

			    if ( function_exists('bp_core_get_user_domain') ) {
			      $url = bp_core_get_user_domain( get_current_user_id() );
			    } else if ( function_exists('bbp_get_user_profile_url') ) {
			      $url = bbp_get_user_profile_url( get_current_user_id() );
			    } else if ( class_exists( 'WooCommerce' ) ) {
			      $url = get_permalink( get_option('woocommerce_myaccount_page_id') );
			    } else {
			      $url = get_edit_user_link();
			    }

			    $item->url = esc_url( $url );
			    break;
		  }
		  $item->url = esc_url( $item->url );
		}
		return $item;
	}


	function login_logout_menu_objects( $sorted_menu_items ) {

		foreach ( $sorted_menu_items as $menu => $item ) {
		  if ( strstr( $item->url, '#loginpress' ) != '' ) {
		    unset( $sorted_menu_items[ $menu ] );
		  }
		}
		return $sorted_menu_items;
	}


	/**
	* Define constant if not already set
	* @param  string $name
	* @param  string|bool $value
	*/
	private function define( $name, $value ) {
		if ( ! defined( $name ) ) {
		  define( $name, $value );
		}
	}


}
