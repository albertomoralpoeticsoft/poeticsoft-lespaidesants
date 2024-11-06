// https://fullcalendar.io/docs/initialize-globals
// https://fullcalendar.io/docs/date-clicking-selecting

import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'

import {
  receivedtransform
} from './transform'
import formreserva from './form-reserva'
import formevent from './form-event'

import { 
  callapi
} from './api'

export default $ => { 
  
  const $ledsreservasblock = $('#LEDS-Reservas')
  if($ledsreservasblock.length) {

    const $ledsreservas = $ledsreservasblock.eq(0) // Only allow one instance
    $ledsreservas.empty()
    const calendarelm = $ledsreservas[0]
    const calendar = new Calendar(
      calendarelm, 
      {
        // schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        locale: esLocale,
        plugins: [ 
          interactionPlugin,
          dayGridPlugin
        ],
        aspectRatio: 1.3,
        customButtons: {
          reservasbutton: {
            text: 'Refresh',
            click: function() {

              calendar.refetchEvents()
            }
          }
        },
        validRange: function(nowDate) {
          return {
            start: nowDate
          }
        },
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'reservasbutton'
        },
        defaultAllDay: true,
        forceEventDuration: true,
        eventDataTransform: receivedtransform,
        eventOverlap: false,
        events: (
          fetchInfo,
          success,
          fail
        ) => {

          callapi({
            call: 'eventall',
            body: { 
              start: new Date(fetchInfo.startStr).getTime(),
              end: new Date(fetchInfo.endStr).getTime()
            }
          })
          .then(result => {
            
            success(result)
            
            $('#ReservaDay').dialog('close')

          })
          .catch(fail)
        },
        dateClick: info => {

          formreserva(
            $,
            calendar,
            info
          )
        },
        eventClick: event => {

          formevent(
            $,
            calendar,
            event
          )

          event.jsEvent.cancelBubble = true
          event.jsEvent.preventDefault()

          return false
        },
        eventsSet: events => {
          
          window.eventsreceived(events) // Global event
        }
      }
    )
    calendar.render()
  }
}