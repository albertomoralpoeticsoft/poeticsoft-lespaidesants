<?php

register_activation_hook(
	__FILE__,
	function() {  

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
      "requestTime BIGINT," . // Momento de envio del email
      "PRIMARY KEY (id)
    ) $charset_collate;";

    $wpdb->query($createsql);
    $result = dbDelta();
  }
);