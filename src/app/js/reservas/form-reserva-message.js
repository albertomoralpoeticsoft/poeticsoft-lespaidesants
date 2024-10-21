import { formmessagehtml } from './forms-html'

export default ($, data) => {  
  
  const $ledsreservasblock = $('#LEDS-Reservas')
  if($ledsreservasblock.length) {

    const $ledsreservas = $ledsreservasblock.eq(0) // Only allow one instance
    const $formwrapper = $ledsreservas.find('#FormWrapper')  
    $formwrapper.empty()
    $formwrapper
    .append(formmessagehtml(data))
  }
}