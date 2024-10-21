import { 
  formeventhtml
} from './forms-html'
import formreservaconfirm from './form-reserva-confirm'
import formreservamessage from './form-reserva-message'
import { callapi } from './dataapi'

export default (
  $, 
  calendar,
  event
) => {
  
  const $ledsreservasblock = $('#LEDS-Reservas')
  const $ledsreservas = $ledsreservasblock.eq(0) // Only allow one instance
  $ledsreservas
  .append(`
    <div id="FormWrapper">
    </div>
  `)
  const $formwrapper = $ledsreservas.find('#FormWrapper')      
  $formwrapper.append(formeventhtml(event))

  const $formevent = $ledsreservas.find('#Form.FormEvent')
  const $close = $formevent.find('.Title .Close')
  const $deleteevent = $formevent.find('#deleteevent')

  $close.length &&
  $close
  .on(
    'click',
    function() {

      $formwrapper.remove()
    }
  )

  $deleteevent
  .on(
    'click',
    function() {

      formreservaconfirm(
        $,
        {
          message: 'Seguro que quieres borrar este evento?',
          action: () => {   

            formreservamessage(
              $,
              {
                message: 'Borrando evento...'
              }
            )                 

            callapi({
              call: 'eventdelete',
              body: {
                eventid: event.event.id
              }
            })
            .then(result => {
              
              window.eventsreceived = events => {

                formreservamessage(
                  $,
                  {
                    message: 'Evento borrado'
                  }
                ) 

                setTimeout(
                  () => {

                    $formwrapper
                    .fadeOut(
                      1000,
                      () => {
                        
                        $formwrapper.remove() 
                      }
                    )             
                    
                  },
                  500
                )
              }

              calendar.refetchEvents() 
            })
            .catch(error => {

              console.log('Error')
              console.log(error)
            })
          }
        }
      ) 
    }
  )
}