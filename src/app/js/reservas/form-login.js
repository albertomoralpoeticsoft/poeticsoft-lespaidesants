import { 
  formloginhtml
} from './forms-html'
import { callapi } from './dataapi'
import formacceptemail from './form-acceptemail'
import formmessage from './form-message'
import formvalidatelogin from './form-validatelogin'

const validateemail = email => {

  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailReg.test(email)
}

export default $ => {  

  const usermail = localStorage.getItem('LEDS-Reservas-Email')
  if(usermail) {

    return formacceptemail($)
  }
  
  const $ledsreservasblock = $('#LEDS-Reservas')
  if($ledsreservasblock.length) {

    const $ledsreservas = $ledsreservasblock.eq(0) // Only allow one instance
    $ledsreservas.empty()
    $ledsreservas
    .append(formloginhtml())

    const $login = $ledsreservas.find('#Form.FormLogin')
    const $yourmail = $login.find('#yourmail')
    const $confirmmail = $login.find('#confirmmail')
    const $errormessage = $login.find('.ErrorMessage')

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
            email: $yourmail.val()
          }
        })
        .then(result => formvalidatelogin($, $yourmail.val()))
        .catch(error => {

          console.log('Error')
          console.log(error)
        })
      }
    )
  }
}