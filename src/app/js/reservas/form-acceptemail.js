import {
  formacceptemail
} from './forms-html'
import calendar from './calendar'
import login from './form-login'

export default $ => {  
  
  const $ledsreservasblock = $('#LEDS-Reservas')
  if($ledsreservasblock.length) {

    const $ledsreservas = $ledsreservasblock.eq(0) // Only allow one instance
    $ledsreservas.empty()
    const emailsaved = localStorage.getItem('LEDS-Reservas-Email')
    $ledsreservas
    .append(formacceptemail({
      emailsaved: emailsaved
    }))

    const $acceptemail = $ledsreservas.find('#Form.FormAcceptEmail')
    const $confirmmail = $acceptemail.find('#confirmmail')
    const $changemail = $acceptemail.find('#changemail')

    $confirmmail
    .on(
      'click',
      function() {
        
        calendar($)
      }
    )
    
    $changemail
    .on(
      'click',
      function() {

        localStorage.removeItem('LEDS-Reservas-Email')
        login($)
      }
    )
  }
}