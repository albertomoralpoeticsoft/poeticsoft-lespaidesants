import rotatory from './js/background/rotatory'
import inviewport from './js/inviewport/inviewport'
import flickitygallery from './js/hero/flickitygallery'
import flickityhero from './js/hero/flickityhero'
import reservas from './js/reservas/main'

(function ($) {

  rotatory($)
  // inviewport($)
  // flickitygallery($)
  flickityhero($)
  reservas($)  

  setTimeout(() => {

    $('#page')
    .css('opacity', 1)
    
  }, 500)

})(jQuery)