import { formvalidateloginhtml } from './forms-html'
import formmessage from './form-message'
import formvalidatelogin from './form-validatelogin'
import formlogin from './form-login'
import formerror from './form-error'
import { callapi } from './api'
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

          localStorage.setItem("LEDS-Reservas-Email", email)

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
        .catch(error => {         

          console.log(error)

          switch(error.status) {

            case 428:

              formerror(
                $,
                {
                  message: `
                    El código ha caducado, solo es válido durante 10 minutos.
                  `,
                  confirmtext: `Solicitar nuevo código`,
                  action: () => formvalidatelogin($, email)
                }
              )

              break

            case 410:

              formerror(
                $,
                {
                  message: `
                    No existe un usuario con ese mail o el código no es válido.
                  `,
                  confirmtext: `Volver a escribir mail`,
                  action: () => formlogin($)
                }
              )

              break

            default:

              formerror(
                $,
                {
                  message: `
                    Ha habido un error validando tu código.
                  `,
                  confirmtext: `Intentar de nuevo`,
                  action: () => formvalidatelogin($, email)
                }
              )

              break
          }
        })
      }
    )
  }
}