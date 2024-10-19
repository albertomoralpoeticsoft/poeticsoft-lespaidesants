import { formloginhtml } from './forms-html'
import { callapi } from './dataapi'
import formmessage from './form-message'

const validateemail = email => {

  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailReg.test(email)
}

export default $ => {  
  
  const $ledsreservasblock = $('#LEDS-Reservas')
  if($ledsreservasblock.length) {

    const $ledsreservas = $ledsreservasblock.eq(0) // Only allow one instance
    $ledsreservas.empty()
    $ledsreservas
    .append(formloginhtml())

    const $login = $ledsreservas.find('#Form.FormLogin')
    const $loginform = $login.find('.Form.LoginForm')
    const $yourmail = $loginform.find('#yourmail')
    const $confirmmail = $loginform.find('#confirmmail')
    const $errormessage = $loginform.find('.ErrorMessage')

    $yourmail
    .on(
      'keyup',
      function() {
        
        $errormessage.html('')
        
        const $this = $(this)
        if(
          $this.val() && 
          $this.val().length > 4
        ) {

          if(validateemail($this.val())) {

            $confirmmail.prop('disabled', false)

          } else {

            $errormessage.html('Escribe un mail válido')
            $confirmmail.prop('disabled', 'disabled')
          }

        } else {              

          $confirmmail.prop('disabled', 'disabled')
        }            
      }
    )

    $confirmmail
    .on(
      'click',
      function() {

        const emailforvalidation = $yourmail.val()

        formmessage(
          $,
          {
            message: 'Comprobando...'
          }
        )

        const $this = $(this)        

        callapi({
          call: 'validateuser',
          body: {
            email: emailforvalidation
          }
        })
        .then(result => {

          if(
            result.result
            && 
            result.result == 'ok'
          ) {

            formvalidatelogin($)
          }
        })
        .catch(error => {

          console.log('Error')
        })
      }
    )
  }
}