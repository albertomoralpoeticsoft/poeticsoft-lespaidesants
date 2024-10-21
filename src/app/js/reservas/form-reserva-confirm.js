import { formreservaconfirmhtml } from './forms-html'

export default ($, data) => {  
  
  const $ledsreservasblock = $('#LEDS-Reservas')
  if($ledsreservasblock.length) {

    const $ledsreservas = $ledsreservasblock.eq(0) // Only allow one instance
    const $formwrapper = $ledsreservas.find('#FormWrapper')  
    $formwrapper.empty()
    $formwrapper
    .append(formreservaconfirmhtml(data))

    const $form = $formwrapper.find('#Form.FormReservaConfirm')
    const $close = $form.find('.Title .Close')
    const $confirm = $form.find('#confirm')    

    $close.length &&
    $close
    .on(
      'click',
      function() {

        $formwrapper.remove()
      }
    )

    $confirm.length &&
    $confirm
    .on(
      'click',
      data.action
    )
  }
}