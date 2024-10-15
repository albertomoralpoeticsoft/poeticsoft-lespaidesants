<?php

add_action(  
  'wp_head', 
  function () {
    ?>

      <!-- Google tag (gtag.js) -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-MXDB2R1B9C"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-MXDB2R1B9C');
      </script>
    <?php
  }
);