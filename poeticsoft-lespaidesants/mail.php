<?php

add_action(
  'phpmailer_init', 
  function($phpmailer) {

    $phpmailer->isSMTP();
    $phpmailer->Host = 'smtp1.s.ipzmarketing.com';
    $phpmailer->SMTPAuth = true;
    $phpmailer->Port = 587;
    $phpmailer->Username = 'nqgkdgylaxme';
    $phpmailer->Password = 'nV2F3Sm5BC4m';
    $phpmailer->SMTPSecure = 'tls';
    $phpmailer->From = 'hola@lespaidesants.com';
    $phpmailer->FromName = 'hola@lespaidesants.com';    
    $phpmailer->isHTML(true);
  }
);

function lespaidesants_mail_sendtest( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response();
  
  $process = [];

  $process[] = 'Intento de envio de mail';  

  try { 

    $process = [];

    $mailsent = wp_mail(
      'poeticsoft@gmail.com',
      'Mail test from L\'Espai de Sants',
      'Body'
    );

    $process[] = $mailsent ? 'sent' : 'not sent';      

    $res->set_data($process);
  
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
      'lespaidesants',
      'mail/sendtest',
      [
        'methods'  => 'GET',
        'callback' => 'lespaidesants_mail_sendtest',
        'permission_callback' => '__return_true'
      ]
    );
  }
);