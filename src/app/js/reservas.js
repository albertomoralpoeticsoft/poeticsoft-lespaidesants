// https://fullcalendar.io/docs/initialize-globals
// https://fullcalendar.io/docs/date-clicking-selecting

import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import rrulePlugin from '@fullcalendar/rrule'
import esLocale from '@fullcalendar/core/locales/es';

export default $ => {

  const $calendarreservas = $('.ReservasCalendar')
  if($calendarreservas.length) {

    const calendarelm = $calendarreservas[0]
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
        // dayMaxEventRows: 1,
        selectable: true,
        events: (
          fetchInfo,
          success,
          fail
        ) => {

          console.log(fetchInfo)

          fetch(
            '/wp-json/'
          )

          const events = []
          for(let i=0; i<5; i++){

            const datestart = new Date().getTime()
            const dateend = datestart + (1 * 24 * 60 * 60 * 1000)

            events.push({
              'title': 'Title ' + i,
              'start': datestart,
              'end': dateend
            })
          }

          success(events)
        },
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