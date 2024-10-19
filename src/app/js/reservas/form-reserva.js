import moment from 'moment'
moment.locale('es')
import {
  datesform,
  messageform,
  confirmform
} from './forms'
import { processreserva } from './dataapi'

export default (
  $, 
  calendar,
  dayinfo,
  $elm
) => {

  const dia = moment(dayinfo.dateStr).format('D [de] MMMM')
  const diasemana = moment(dayinfo.dateStr).format('dddd')

  $('body')
  .append(`
    <div id="ModalReserva">
      <div 
        id="Form"
        class="FormReserva"
      >
      </div>
    </div>
  `)

  $elm
  .append(`<div id="ReservaDay">
    <div id="form"></div>
  </div>`)
  $('#ReservaDay')
  .dialog({    
    dialogClass: "ReservaDayDialog",
    modal: true,
    title: `Reserva el ${ diasemana } día ${ dia }`,
    closeText: 'x',
    width: 340,
    open: () => {
      
      $('.ui-widget-overlay').addClass('CustomOverlay');
    },
    close: () => {

      $('#ReservaDay, .ReservaDayDialog, .CustomOverlay').remove()
    },
    create: (event, ui) => {
      
      const $dialog = $(event.target)
      const $form = $dialog.find('#form')

      const drawform = formid => {

        $form.empty()   

        switch(formid) {

          case 'dates':         

            $form.html(datesform({
              diasemana: diasemana
            }))

            break;

          case 'confirm':         

            $form.html(confirmform())

            break;

          case 'saving':         

            $form.html(messageform({
              message: 'Guardando...'
            }))

            break;
        }

        const $selecthour = $form.find('#selecthour')
        const $selectduration = $form.find('#selectduration')
        const $isrecurrent = $form.find('#isrecurrent')
        const $recurrentuntil = $form.find('#recurrentuntil')
        const $reservatitle = $form.find('#reservatitle')
        const $reservatitleerrormessage = $form.find('#reservatitleerrormessage')
        const $yourmail = $form.find('#yourmail')
        const $reservarmas = $form.find('#reservarmas')
        const $reservar = $form.find('#reservar')
        const $confirmreservation = $form.find('#confirmreservation')
      
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
              $recurrentuntil.val('No')
            }
          }
        )
        
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

        $reservarmas &&
        $reservarmas.on(
          'click',
          () => {

            drawform('saving')

            processreserva({
              title: $reservatitle.val(),
              day: dayinfo.dateStr,
              hora: $selecthour.val(),
              duration: $selectduration.val(),
              isrecurrent: $isrecurrent.is(':checked'),
              recurrentuntil: $recurrentuntil.val()
            })
            .then(processresult => {

              calendar.refetchEvents()
            })

            return false
          }
        )

        $reservar &&
        $reservar.on(
          'click',
          () => {

            $('#ReservaDay').dialog(
              'option',
              'title', 
              'Confirmar reservas' 
            )

            drawform('confirm')

            return false
          }
        )

        $confirmreservation &&
        $confirmreservation.on(
          'click',
          () => {

            $('#ReservaDay').dialog('close')

            return false
          }
        )
      }

      drawform('dates')
    }
  })
}