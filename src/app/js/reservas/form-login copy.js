import {
  loginform,
  messageform,
  validateloginform
} from './forms'
import {
  callapi
} from './dataapi'
import calendar from './calendar'

const validateemail = email => {

  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailReg.test(email)
}

export default $ => {  
  
  const $calendarreservas = $('.ReservasCalendar')
  if($calendarreservas.length) {

    $calendarreservas
    .append(`
      <div id="Login">
        ${ loginform() }
      </div>
    `)

    const $login = $calendarreservas.find('#Login')
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

        $login
        .html(messageform({
          message: 'Comprobando...'
        }))

        const $this = $(this)        

        callapi({
          call: 'validateuser',
          body: {
            email: emailforvalidation
          }
        })
        .then(result => {

          if(result.result && result.result == 'ok') {

            $login
            .html(validateloginform())
            
            const $validateloginform = $login.find('.Form.ValidateLoginForm')
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

                $login
                .html(messageform({
                  message: 'Validando...'
                }))        

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

                    // SAVE USER ID

                    console.log(result) 

                    $login
                    .html(messageform({
                      message: `
                        Código válido, gracias por tu interés 
                        en nuestro espacio, por favor, 
                        selecciona tu reserva en el calendario.
                      `
                    }))

                    setTimeout(() => {

                      calendar($)
                      
                    }, 3000)
                  } 
                })
              }
            )
          }
        })
        .catch(error => {

          console.log('Error')
        })
      }
    )
  }
}