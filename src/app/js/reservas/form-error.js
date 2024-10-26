import { formerrorhtml } from './forms-html'

export default ($, data) => {  
  
  const $ledsreservasblock = $('#LEDS-Reservas')
  if($ledsreservasblock.length) {

    const $ledsreservas = $ledsreservasblock.eq(0) // Only allow one instance
    $ledsreservas.empty()
    $ledsreservas
    .append(formerrorhtml(data))    
            
    const $errorform = $ledsreservas.find('#Form.FormError')
    const $confirm = $errorform.find('#confirm')

    $confirm
    .on(
      'click',
      data.action
    )
  }
}