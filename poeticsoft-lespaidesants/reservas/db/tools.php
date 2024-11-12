<?php

// https://github.com/fightbulc/moment.php

require __DIR__ . '/../tools/vendor/autoload.php';

// $m = new \Moment\Moment($twitterCreatedAt);

function lespaidesants_plugin_reservas_event_checkoverlap($allevents, $event) {

  // json_decode($event['extendedProps'])->allDay

  return true;
}

function lespaidesants_plugin_reservas_user_generatetoken($length = 6) {

    $characters = '0123456789';
    $code = '';
    for ($i = 0; $i < $length; $i++) {
      $code .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $code;
}