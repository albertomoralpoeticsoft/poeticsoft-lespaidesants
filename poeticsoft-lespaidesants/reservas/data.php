<?php

function lespaidesants_plugin_reservas_init() {

  global $wpdb;
  $charset_collate = $wpdb->get_charset_collate();
  require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

  $baseprefix = $wpdb->base_prefix;
  if(is_multisite()) {

    $blogid = get_current_blog_id();
    $baseprefix .= $blogid . '_';
  }    

  $tablename = $baseprefix . 'reservas_events';

  // https://fullcalendar.io/docs/event-parsing

  $createsql = "CREATE TABLE IF NOT EXISTS $tablename (" .
    "id INTEGER NOT NULL AUTO_INCREMENT," . 
    "userid INTEGER," .

    "title VARCHAR(256)," .
    "url VARCHAR(256)," .
    "interactive TINYINT(1)," . // Boolean 0/1
    "className VARCHAR(256)," . // 'myclass' | 'myclass1 myclass2'

    "groupId VARCHAR(256)," .
    "allDay TINYINT(1)," . // Boolean 0/1
    "start BIGINT," . // Date parseable https://fullcalendar.io/docs/date-parsing
    "end BIGINT," . // Date parseable

    "daysOfWeek VARCHAR(256)," . // JSON array [0,1]
    "startTime BIGINT," . // Duration object  https://fullcalendar.io/docs/duration-object
    "endTime BIGINT," . // Duration object
    "startRecur BIGINT," . // Date parseable
    "endRecur BIGINT," . // Date parseable
    
    "editable TINYINT(1)," . // Boolean 0/1
    "startEditable TINYINT(1)," . // Boolean 0/1
    "durationEditable TINYINT(1)," . // Boolean 0/1
    "resourceEditable TINYINT(1)," . // Boolean 0/1
    "resourceId VARCHAR(256)," .
    "resourceIds VARCHAR(256)," . // JSON array ["resource id",...]
    
    "display VARCHAR(256)," . // 'auto','block', 'list-item', 'background', 'inverse-background', or 'none'
    "overlap TINYINT(1)," . // Boolean 0/1
    "restriction VARCHAR(256)," . // fot constraint reserved key A groupId 
    "color VARCHAR(256)," .
    "backgroundColor VARCHAR(256)," .
    "borderColor VARCHAR(256)," .
    "textColor VARCHAR(256)," .
    "extendedProps VARCHAR(4096)," . // JSON object 

    "state VARCHAR(256)," . // reserved | paid | past

    "PRIMARY KEY (id)
  ) $charset_collate;";

  $wpdb->query($createsql);
  $result = dbDelta();  

  $tablename = $baseprefix . 'reservas_users';

  $createsql = "CREATE TABLE IF NOT EXISTS $tablename (" .
    "id INTEGER NOT NULL AUTO_INCREMENT," . 
    "email VARCHAR(512)," . 
    "code VARCHAR(512)," .
    "PRIMARY KEY (id)
  ) $charset_collate;";

  $wpdb->query($createsql);
  $result = dbDelta();
}

/* API DATA EVENTS*/

// CREATE

function lespaidesants_plugin_reservas_data_event_all( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response(); 

  try { 

    global $wpdb;

    $baseprefix = $wpdb->base_prefix;
    if(is_multisite()) {

      $blogid = get_current_blog_id();
      $baseprefix .= $blogid . '_';
    }    

    $tablename = $baseprefix . 'reservas_events';
    
    $params = $req->get_params();
    $start = $params['start']; // In milliseconds
    $end = $params['end'];     //       "

    $query = "
      SELECT * 
      FROM {$tablename};
    ";
    
    $result = $wpdb->get_results($query);

    $res->set_data($result);
  
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());
  }

  return $res;
}

// CREATE

function lespaidesants_plugin_reservas_data_event_create( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response(); 

  try { 

    global $wpdb;

    $baseprefix = $wpdb->base_prefix;
    if(is_multisite()) {

      $blogid = get_current_blog_id();
      $baseprefix .= $blogid . '_';
    }
    $tablename = $baseprefix . 'reservas_events';    
    $data = lespaidesants_plugin_reservas_data_event_parsefordb($req->get_params());

    $wpdb->insert(
      $tablename,
      $data
    );

    $query = "
      SELECT * 
      FROM {$tablename};
    ";    
    $result = $wpdb->get_results($query);

    $res->set_data($result);
  
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());
  }

  return $res;
}

// CREATE

function lespaidesants_plugin_reservas_user_validate( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response(); 

  try { 

    global $wpdb;

    $baseprefix = $wpdb->base_prefix;
    if(is_multisite()) {

      $blogid = get_current_blog_id();
      $baseprefix .= $blogid . '_';
    }
    $tablename = $baseprefix . 'reservas_users';
    
    $email = $req->get_param('email');
    $token = lespaidesants_plugin_reservas_user_generatetoken();
    
    $query = "
      SELECT * 
      FROM {$tablename}
      WHERE email = '$email';
    "; 
    $result = $wpdb->get_results($query);
    $updated = false;

    if(count($result)) {

      $user = $result[0];

      $updated = $wpdb->update(
        $tablename,
        [
          'code' => $token
        ],
        [
          'id' => $user->id,
        ]
      );

    } else {

      $updated = $wpdb->insert(
        $tablename,
        [
          'email' => $email,
          'code' => $token
        ],
      );
    }

    if($updated) {      

      $mailsent = wp_mail(
        $email,
        '[L\'Espai de Sants] Validar mail',
        "
          <div>Usa este código para verificar tu mail</div>
          <div>Code: $token</div>
        "
      );

      if($mailsent) {

        $res->set_data('ok');

      } else {

        throw new Exception('No se ha podido enviar el mail', 500);
      }

    } else {

      throw new Exception('Error validando mail', 500);
    }
  
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());
  }

  return $res;
}

function lespaidesants_plugin_reservas_user_validatecode( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response(); 

  try { 

    global $wpdb;

    $baseprefix = $wpdb->base_prefix;
    if(is_multisite()) {

      $blogid = get_current_blog_id();
      $baseprefix .= $blogid . '_';
    }
    $tablename = $baseprefix . 'reservas_users';
    
    $email = $req->get_param('email');
    $token = $req->get_param('code');
    
    $query = "
      SELECT * 
      FROM {$tablename}
      WHERE email = '$email' AND code = '$token';
    "; 
    $result = $wpdb->get_results($query);

    if(count($result)) {   

      $user = $result[0];   

      $res->set_data([
        'result' => 'ok',
        'userid' => $user->id
      ]);

    } else {    

      $res->set_data([
        'result' => 'ko'
      ]);
    }
      
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());
  }

  return $res;
}

add_action(
  'rest_api_init',
  function () {

    register_rest_route(
      'lespaidesants/reservas/data',
      'event/all',
      [
        'methods'  => 'POST',
        'callback' => 'lespaidesants_plugin_reservas_data_event_all',
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      'lespaidesants/reservas/data',
      'event/create',
      [
        'methods'  => 'POST',
        'callback' => 'lespaidesants_plugin_reservas_data_event_create',
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      'lespaidesants/reservas/user',
      'validate',
      [
        'methods'  => 'POST',
        'callback' => 'lespaidesants_plugin_reservas_user_validate',
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      'lespaidesants/reservas/user',
      'validatecode',
      [
        'methods'  => 'POST',
        'callback' => 'lespaidesants_plugin_reservas_user_validatecode',
        'permission_callback' => '__return_true'
      ]
    );
  }
);