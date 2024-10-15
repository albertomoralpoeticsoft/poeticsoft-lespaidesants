export default $ => {

  /* mision-landing-newsletter-y-masterclass */

  const $sintoniza_pensamiento_emocion_accion_action_subscribe = $('.page-id-1757 #wpforms-submit-1297')
  $sintoniza_pensamiento_emocion_accion_action_subscribe
  .on(
    'click',
    function() { 

      gtag(
        'event', 
        'form_subscription', 
        {
          'form': 'SINTONIZA PENSAMIENTO, EMOCIÓN Y ACCIÓN',
          'debug_mode': true 
        }
      )
    }
  )

  /* newsletter-alta */
  
  const $inscribete_nuestra_newsletter_action_subscribe = $('.page-id-1785 #wpforms-submit-1297')
  $inscribete_nuestra_newsletter_action_subscribe
  .on(
    'click',
    function() { 

      gtag(
        'event', 
        'form_subscription', 
        {
          'form': 'INSCRÍBETE A NUESTRA NEWSLETTER',
          'debug_mode': true 
        }
      )
    }
  )
  
  /*
  */
  const title = $(document).attr('title');
  let $iframe = $('iframe#mailrelay-subscription')
  if($iframe.length) {

    $iframe.on(
      'load',
      function() {
    
        const $button = $iframe.contents().find('#subscribe-form .submit-wrapper input');
        $button 
        .on(
          'click',
          function() { 

            gtag(
              'event', 
              'mailrelay_subscription', 
              {
                'page_title': title,
                'debug_mode': true 
              }
            );
          }
        )
      }
    )
  }
}