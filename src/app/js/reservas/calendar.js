// https://fullcalendar.io/docs/initialize-globals
// https://fullcalendar.io/docs/date-clicking-selecting

import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'

import {
  receiveddatatransform
} from './datatransform'
import dialogreserva from './dialogreserva'

import { 
  callapi
} from './dataapi'

export default $ => {

  const $calendarreservas = $('.ReservasCalendar')
  if($calendarreservas.length) {

    const $calendarreserva = $calendarreservas.eq(0)

    $calendarreserva.html('<div class="Calendar"></div>')

    const $calendar =  $calendarreserva.find('.Calendar').eq(0)
    const calendarelm = $calendar[0]
    const calendar = new Calendar(
      calendarelm, 
      {
        // schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        locale: esLocale,
        plugins: [ 
          interactionPlugin,
          dayGridPlugin
        ],
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
          };
        },
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'reservasbutton'
        },
        defaultAllDay: true,
        forceEventDuration: true,
        eventDataTransform: receiveddatatransform,
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

          dialogreserva(
            $,
            calendar,
            info,
            $calendarreserva
          )
        },
        eventClick: event => {

          event.jsEvent.cancelBubble = true;
          event.jsEvent.preventDefault();

          return false
        }
      }
    )
    calendar.render()
  }
}