import { formvalidateloginhtml } from './forms-html'
import calendar

export default $ => {  
  
  const $ledsreservasblock = $('#LEDS-Reservas')
  if($ledsreservasblock.length) {

    $ledsreservas = $ledsreservasblock.eq(0) // Only allow one instance

    $ledreservas.empty()
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

        formmessage({
          message: 'Validando...'
        })        

        callapi({
          call: 'validatecode',
          body: {
            email: emailforvalidation,
            code: $validatecode.val()
          }
        })
        .then(result => {

          if(
            result.result
            &&
            result.result == 'ok'
          ) {   

            formmessage(
              $,
              {
                message: `
                  Código válido, gracias por tu interés 
                  en nuestro espacio, por favor, 
                  selecciona tu reserva en el calendario.
                `
              }
            )

            setTimeout(() => {

              calendar($)
              
            }, 3000)
          } 
        })
      }
    )
  }
}