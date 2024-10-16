<?php

function lespaidesants_plugin_block_reservas_callback(
  $block_attributes,
  $content
) {

  return '<div class="ReservasCalendar">
    <div class="Calendar"></div>
  </div>';
}