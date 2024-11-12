import { formerrorhtml } from './forms-html'

export default ($, data) => {  
  
  const $ledsreservasblock = $('#LEDS-Reservas')
  if($ledsreservasblock.length) {

    const $ledsreservas = $ledsreservasblock.eq(0) // Only allow one instance
    const $formwrapper = $ledsreservas.find('#FormWrapper')  
    $formwrapper.empty()
    $formwrapper
    .append(formerrorhtml(data))

    const $form = $formwrapper.find('#Form.FormError')
    const $confirm = $form.find('#confirm') 

    $confirm.length &&
    $confirm
    .on(
      'click',
      () => $formwrapper.remove()
    )
  }
}