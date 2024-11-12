import moment from 'moment'
moment.locale('es')

import {
  senttransform
} from './transform'

export const callapi = data => {

  const urlbase = '/wp-json/lespaidesants/reservas/'

  const P = new Promise((resolve, reject) => { 

    if(!data.call) {

      return reject({
        result: 'error',
        reason: 'Api call not provided'
      })
    }

    let url = urlbase
    let method = 'POST'

    switch(data.call) {

      case 'eventall':

        url += 'event/all' 

        break

      case 'eventcreate':

        url += 'event/create'

        break

      case 'eventdelete':

        url += 'event/delete'

        break

      case 'validateuser':

        url += 'user/validate'

        break

      case 'validatecode':

        url += 'user/validatecode'

        break
    }

    fetch(
      url,
      {
        method: method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.body)
      }
    )
    .then(response => {

      if(response.status != 200) {

        response
        .json()
        .then(
          result => reject({
            status: response.status,
            reason: result
          })
        )

      } else {
        
        response
        .json()
        .then(result => resolve(result))
      }
    })
    .catch(reject)
  })

  return P
}

export const processreserva = data => {

  const P = new Promise((resolve, reject) => {

    let eventdata = {
      title: data.title,
      extendedProps: {}
    }

    if(data.isrecurrent) {

      const startday = moment(data.day)
      const weekday = startday.day()
      eventdata.daysOfWeek =[weekday]
      const until = parseInt(data.recurrentuntil)
      const endday = moment(data.day).add(until, 'weeks')
      eventdata.startRecur = startday.valueOf()
      eventdata.endRecur = endday.valueOf()

      eventdata.extendedProps.isrecurrent = true      
      eventdata.extendedProps.startRecur = eventdata.startRecur
      eventdata.extendedProps.endRecur = eventdata.endRecur

      if(data.hora != 'Todo') {        

        console.log('-------------------------------')
        console.log(data.hora)
        console.log(data.duration)

        const hora = parseInt(data.hora)
        const duration = parseInt(data.duration)
        const starttime = moment.duration(hora, 'hours')
        const endtime = moment.duration(hora + duration, 'hours')
        eventdata.startTime = starttime.valueOf()
        eventdata.endTime = endtime.valueOf()
  
        eventdata.extendedProps.startTime = eventdata.startTime
        eventdata.extendedProps.endTime = eventdata.endTime

        console.log('-------------------------------')
        console.log(eventdata.startTime / 1000 / 60 / 60)
        console.log(eventdata.endTime / 1000 / 60 / 60)

      } else {

        eventdata.extendedProps.allDay = true        
      }

    } else {      

      if(data.hora == 'Todo') {

        const start = moment(data.day)
        const end = moment(data.day)

        eventdata.allDay = true
        eventdata.start = start.valueOf()
        eventdata.end = end.valueOf()

        eventdata.extendedProps.allDay = true  

      } else {
        
        const start = moment(data.day)
        const hora = parseInt(data.hora)
        start.add(hora, 'hours')
        const duration = parseInt(data.duration) + 1
        const end = moment(start)
        end.add(duration, 'hours')

        eventdata.start = start.valueOf()
        eventdata.end = end.valueOf()
      }
    }

    callapi({
      call: 'eventcreate',
      body: senttransform(eventdata)
    })
    .then(resolve)
    .catch(reject)
  })

  return P
}