// https://fullcalendar.io/docs/initialize-globals
// https://fullcalendar.io/docs/date-clicking-selecting
import moment from 'moment'
moment.locale('es')
import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import rrulePlugin from '@fullcalendar/rrule'
import esLocale from '@fullcalendar/core/locales/es';

const form = data => {

  let houroptions = '<option value="Todo">Todo el día</option>'
  for(let i=9; i<22; i++) {

    const hour = i.toString().padStart(2, 0)

    houroptions += `<option
      value="${ hour }"
    >
      Desde ${ hour }:00
    </option>`
  }

  let durationoptions = '<option value="Todo"></option>'
  for(let i=1; i<12; i++) {

    durationoptions += `<option
      value="${ i }"
    >
      ${ i } hora/s
    </option>`
  }

  let durantenoptions = '<option value="No">Selecciona hasta cuando...</option>'
  for(let i=2; i<9; i++) {

    durantenoptions += `<option
      value="${ i }"
    >
      Durante ${ i } semanas
    </option>`
  }

  return `
    <form
      action="/wp-json/lespaidesants/reservas/data/event/add" 
      method="post"
    > 
      <div class="Fields">
        <div class="Field HourSelector">
          <select name="hour"> 
            ${ houroptions }
          </select> 
        </div>
        <div class="Field DurationSelector">
          <select name="duration" disabled="disabled"> 
            ${ durationoptions }
          </select> 
        </div>
        <div class="Field Recurrent">
          <input 
            type="checkbox" 
            name="recurrent"
          /> 
          <label for="recurrent">
            Quiero reservar este horario los ${ data.diasemana }
          </label>
        </div>
        <div class="Field Durante">
          <select name="duranten" > 
            ${ durantenoptions }
          </select> 
        </div>
        <div class="Field Mail">
          <input 
            type="email" 
            placeholder="Tu Email para confirmar"
          /> 
        </div>
      </div>
      <div class="Actions">
        <input 
          id="reservarmas"
          type="submit" 
          value="Reservar más dias" 
        /> 
        <input 
          id="reservar"
          type="submit" 
          value="Reservar" 
        /> 
      </div>
    </form>
  `
}

const dialogreserva = (
  $, 
  calendar,
  dayinfo,
  $elm
) => {

  const dia = moment(dayinfo.dateStr).format('D [de] MMMM')
  const diasemana = moment(dayinfo.dateStr).format('dddd')

  $elm
  .append(`<div id="ReservaDay">
    ${ form({
      diasemana: diasemana
    }) }
  </div>`)
  $('#ReservaDay')
  .dialog({    
    dialogClass: "ReservaDayDialog",
    modal: true,
    title: `Reserva el ${ diasemana } día ${ dia }`,
    width: 340,
    open: () => {
      
      $('.ui-widget-overlay').addClass('CustomOverlay');
    },
    close: () => {

      $('#ReservaDay, .ReservaDayDialog, .CustomOverlay').remove()
    },
    create: (event, ui) => {
      
      const $dialog = $(event.target)
      const $reservarmas = $dialog.find('#reservarmas')
      const $reservar = $dialog.find('#reservar')

      $reservarmas.on(
        'click',
        () => {

          $('#ReservaDay').dialog('close')

          return false
        }
      )

      $reservar.on(
        'click',
        () => {

          $('#ReservaDay').dialog('close')

          return false
        }
      )
    }
  })
}

export default $ => {

  const $calendarreservas = $('.ReservasCalendar')
  if($calendarreservas.length) {

    const $calendarreserva = $calendarreservas.eq(0)
    const $calendar =  $calendarreserva.find('.Calendar').eq(0)
    const calendarelm = $calendar[0]
    const calendar = new Calendar(
      calendarelm, 
      {
        // schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        locale: esLocale,
        plugins: [ 
          interactionPlugin,
          dayGridPlugin,
          rrulePlugin
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth'
        },
        selectable: true,
        events: (
          fetchInfo,
          success,
          fail
        ) => {

          const body = JSON.stringify({ 
            start: new Date(fetchInfo.startStr).getTime(),
            end: new Date(fetchInfo.endStr).getTime()
          })

          fetch(
            '/wp-json/lespaidesants/reservas/data/event/all',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: body
            }
          )
          .then(
            response => response.json().then(
              result => {              

                success(result)
              }
            )
          )
        },
        dateClick: info => {

          dialogreserva(
            $,
            calendar,
            info,
            $calendarreserva
          )
        },
        /*
        select: info => {

          console.log('----------------------------')
          console.log('select')
          // console.log(info)
        },
        unselect: info => {

          console.log('----------------------------')
          console.log('unselect')
          // console.log(info)
        },
        selectAllow: info => {

          console.log('----------------------------')
          console.log('selectAllow')
          // console.log(info)

          return true
        },
        eventClick: info => {

          console.log('----------------------------')
          console.log('eventClick')
          console.log(info)

          return true
        }
        */
      }
    )
    calendar.render()

    // calendar.refetchEvents()
  }
}