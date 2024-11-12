import moment from 'moment'
moment.locale('es')
import { 
  formdateshtml,
  formconfirmhtml,
  formmessagehtml
} from './forms-html'
import { processreserva } from './api'
import formreservaerror from './form-reserva-error'

export default (
  $, 
  calendar,
  dayinfo,
  $elm
) => {

  const dia = moment(dayinfo.dateStr).format('D [de] MMMM')
  const diasemana = moment(dayinfo.dateStr).format('dddd') 
  
  const $ledsreservasblock = $('#LEDS-Reservas')
  const $ledsreservas = $ledsreservasblock.eq(0) // Only allow one instance
  $ledsreservas
  .append(`
    <div id="FormWrapper">
    </div>
  `)
  const $formwrapper = $ledsreservas.find('#FormWrapper')  

  // Redraw forms dom

  const drawform = formid => {

    $formwrapper.empty()   

    switch(formid) {

      case 'dates':
      
        $formwrapper.append(formdateshtml({
          diasemana: diasemana,
          dia: dia
        }))

        break

      case 'confirm':
      
        $formwrapper.html(formconfirmhtml())

        break

      case 'saving':  
      
        $formwrapper.html(formmessagehtml({
          message: 'Guardando...'
        }))

        break

      case 'saved':  
      
        $formwrapper.html(formmessagehtml({
          message: 'Reserva guardada'
        }))

        break
    }

    const $form = $formwrapper.find('#Form')
    const $close = $form.find('.Title .Close')
    const $selecthour = $form.find('#selecthour')
    const $selectduration = $form.find('#selectduration')
    const $isrecurrent = $form.find('#isrecurrent')
    const $recurrentuntil = $form.find('#recurrentuntil')
    const $reservatitle = $form.find('#reservatitle')
    const $reservarmas = $form.find('#reservarmas')
    const $reservar = $form.find('#reservar')
    const $confirmreservation = $form.find('#confirmreservation')

    // Events
        
    $selecthour.length &&
    $selecthour
    .on(
      'change',
      function() {

        const $this = $(this)
        if($this.val() == 'Todo') {

          $selectduration.prop('disabled', 'disabled')
          $selectduration.val('Todo')

        } else {

          $selectduration.prop('disabled', false)
        }
      }
    )
          
    $isrecurrent.length &&
    $isrecurrent
    .on(
      'change',
      function() {

        const $this = $(this)
        if($this.is(':checked')) {

          $recurrentuntil.prop('disabled', false)

        } else {

          $recurrentuntil.prop('disabled', 'disabled')
          $recurrentuntil.val('2')
        }
      }
    )
          
    $reservatitle.length &&
    $reservatitle
    .on(
      'keyup',
      function() {
        
        const $this = $(this)
        if($this.val() && $this.val().length > 4) {

          $reservarmas.prop('disabled', false)
          $reservar.prop('disabled', false)

        } else {              

          $reservarmas.prop('disabled', 'disabled')
          $reservar.prop('disabled', 'disabled')
        }            
      }
    )

    $close.length &&
    $close
    .on(
      'click',
      function() {

        $formwrapper.remove()
      }
    )

    $reservarmas.length &&
    $reservarmas
    .on(
      'click',
      () => {

        drawform(
          'saving'
        )

        processreserva({
          title: $reservatitle.val(),
          day: dayinfo.dateStr,
          hora: $selecthour.val(),
          duration: $selectduration.val(),
          isrecurrent: $isrecurrent.is(':checked'),
          recurrentuntil: $recurrentuntil.val()
        })
        .then(processresult => {

          window.eventsreceived = events => {

            drawform(
              'saved'
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

          formreservaerror(
            $,
            {
              message: `
                ${ error.reason }
              `,
              confirmtext: `De acuerdo`
            }
          )
        })

        return false
      }
    )

    $reservar.length &&
    $reservar
    .on(
      'click',
      () => {

        drawform('confirm')
      }
    )

    $confirmreservation.length &&
    $confirmreservation
    .on(
      'click',
      () => {

        window.eventsreceived = events => {

          $formwrapper.remove()
        }

        calendar.refetchEvents()
      }
    )
  }
  
  drawform('dates')
}