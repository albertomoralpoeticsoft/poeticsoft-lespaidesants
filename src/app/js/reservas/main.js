// https://fullcalendar.io/docs/initialize-globals
// https://fullcalendar.io/docs/date-clicking-selecting
import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import rrulePlugin from '@fullcalendar/rrule'
import esLocale from '@fullcalendar/core/locales/es'

import dialogreserva from './dialogreserva'

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
        customButtons: {
          reservasbutton: {
            text: 'Reservas [6]',
            click: function() {

              console.log('Reservas');
            }
          }
        },
        validRange: function(nowDate) {
          return {
            start: nowDate
          };
        },
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'reservasbutton'
        },
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
        eventClick: info => {

          console.log('----------------------------')
          console.log('eventClick')
          console.log(info)

          return true
        }
      }
    )
    calendar.render()

    // calendar.refetchEvents()
  }
}