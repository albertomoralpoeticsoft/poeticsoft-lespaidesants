import { formmessagehtml } from './form-html'

export default ($, data) => {  
  
  const $ledsreservasblock = $('#LEDS-Reservas')
  if($ledsreservasblock.length) {

    $ledsreservas = $ledsreservasblock.eq(0) // Only allow one instance

    $ledreservas.empty()
    $ledsreservas
    .append(formmessagehtml(data))
  }
}