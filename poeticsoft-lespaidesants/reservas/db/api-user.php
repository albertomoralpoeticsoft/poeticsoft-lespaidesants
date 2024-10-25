<?php

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
          'code' => $token,          
          'requestTime' => time() * 1000
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
          'code' => $token,          
          'requestTime' => time() * 1000
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

        $res->set_data($updated);

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

      $now = time() * 1000;

      if(intval($user->requestTime) - $now > 10 * 60 * 60 * 1000) { // 10 minutos de validez

        throw new Exception('Código caducado', 428);
      }

      $res->set_data($user->id);

    } else {    

      throw new Exception('Código caducado', 428);
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