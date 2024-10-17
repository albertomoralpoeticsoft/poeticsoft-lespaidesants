<?php

function lespaidesants_plugin_reservas_data_event_parsefordb($data)  {

  core_log($data);

  return $data;
}