// https://fullcalendar.io/docs/initialize-globals
// https://fullcalendar.io/docs/date-clicking-selecting

import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import rrulePlugin from '@fullcalendar/rrule'
import esLocale from '@fullcalendar/core/locales/es';

export default $ => {

  const $calendarreservas = $('.ReservasCalendar')
  if($calendarreservas.length) {

    const calendarelm = $calendarreservas[0]
    const calendar = new Calendar(
      calendarelm, 
      {
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        locale: esLocale,
        plugins: [ 
          interactionPlugin,
          dayGridPlugin,
          resourceTimelinePlugin,
          rrulePlugin
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth'
        },
        events: [
          {
            id: 'a',
            title: 'my event',
            start: '2024-10-17T09:00:00.000Z',
            rrule: {
              freq: 'weekly',
              dtstart: '2024-10-17T09:00:00.000Z', // will also accept '20120201T103000'
            }
          }
        ],
        selectable: true,
        /*
        dateClick: info => {

          console.log('----------------------------')
          console.log('dateClick')
          // console.log(info)
        },
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
        */
        eventClick: info => {

          console.log('----------------------------')
          console.log('eventClick')
          console.log(info)

          return true
        }
      }
    )
    calendar.render()
  }
}