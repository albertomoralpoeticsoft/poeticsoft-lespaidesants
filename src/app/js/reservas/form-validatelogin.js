import { formvalidateloginhtml } from './forms-html'
import formmessage from './form-message'
import { callapi } from './dataapi'
import calendar from './calendar'

export default ($, email) => {  
  
  const $ledsreservasblock = $('#LEDS-Reservas')
  if($ledsreservasblock.length) {

    const $ledsreservas = $ledsreservasblock.eq(0) // Only allow one instance
    $ledsreservas.empty()
    $ledsreservas
    .append(formvalidateloginhtml())    
            
    const $validateloginform = $ledsreservas.find('#Form.FormValidateLogin')
    const $validatecode = $validateloginform.find('#validatecode')
    const $confirmcode = $validateloginform.find('#confirmcode') 

    $validatecode
    .on(
      'keyup',
      function() {

        const $this = $(this)
        if(
          $this.val() && 
          $this.val().length > 3
        ) {
          
          $confirmcode.prop('disabled', false)

        } else {              

          $confirmcode.prop('disabled', 'disabled')
        }            
      }
    )       

    $confirmcode
    .on(
      'click',
      function() {

        formmessage(
          $,
          {
            message: 'Validando...'
          }
        )        

        callapi({
          call: 'validatecode',
          body: {
            email: email,
            code: $validatecode.val()
          }
        })
        .then(result => {

          localStorage.setItem("LEDS-Reservas-Email", email);

          formmessage(
            $,
            {
              message: `
                Código válido para <strong>${ email }</strong>, gracias por tu interés 
                en nuestro espacio, por favor, 
                selecciona tu/s reserva/s en el calendario.
              `
            }
          )

          setTimeout(() => {

            calendar($)
            
          }, 4000)
        })
      }
    )
  }
}