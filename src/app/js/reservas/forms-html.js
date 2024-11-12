import moment from 'moment'
moment.locale('es')

export const formmessagehtml = data => {

  return `
    <div 
    id="Form"
    class="FormMessage"
  > 
      <div class="Message">
        ${ data.message }
      </div>
    </div>
  `
}

export const formacceptemail = data => {

  return `
    <div 
      id="Form"
      class="FormAcceptEmail"
    > 
      <div class="Text">
        Bienvenido a la reserva de sala.
        Tu mail guardado es <strong>${ data.emailsaved }</strong>
        quieres usarlo para identificar tus reservas?
      </div>
      <div class="Actions">
        <button 
          id="confirmmail"
        >
          Si
        </button> 
        <button 
          id="changemail"
        >
          No, quiero usar otro
        </button> 
      </div>
    </div>
  `
}

export const formloginhtml = data => {

  return `
    <div 
      id="Form"
      class="FormLogin"
    > 
      <div class="Text">
        Bienvenido a la reserva de sala.
        Por favor usa tu mail para que podamos identificar tus reservas.
      </div>
      <div class="Fields">
        <div class="Field Mail">
          <input 
            id="yourmail"
            type="email" 
            placeholder="Tu Email"
          /> 
        </div>
      </div>
      <div class="Actions">
        <button 
          id="confirmmail"
          disabled="disabled"
        >
          Confirmar
        </button>
        <div class="ErrorMessage"></div>
      </div>
    </div>
  `
}

export const formvalidateloginhtml = data => {

  return `
    <div 
      id="Form"
      class="FormValidateLogin"
    > 
      <div class="Text">
        Te hemos enviado un mail a tu correo, revisa tu carpeta de spam por si se fué allí.
        Por favor escribe el código recibido 
        para validar tu dirección de coreo electrónico.
        <strong>El código es válido durante los próximos 10 minutos.</strong>
      </div>
      <div class="Fields">
        <div class="Field Mail">
          <input 
            id="validatecode"
            type="text" 
            placeholder="Codigo recibido"
          /> 
        </div>
      </div>
      <div class="Actions">
        <button 
          id="confirmcode" 
          disabled="disabled"
        >
          Confirmar código
        </button>
      </div>
    </div>
  `
}

export const formdateshtml = data => {

  let houroptions = '<option value="Todo">Todo el día</option>'
  for(let i=9; i<22; i++) {

    const hour = i.toString().padStart(2, 0)

    houroptions += `<option
      value="${ i }"
    >
      Desde ${ hour }:00
    </option>`
  }

  let durationoptions = '<option value="1">Duración (min 1h)</option>'
  for(let i=2; i<12; i++) {

    durationoptions += `<option
      value="${ i }"
    >
      ${ i } hora/s
    </option>`
  }

  let durantenoptions = '<option value="2">Hasta cuando? (min 2 semanas)</option>'
  for(let i=3; i<9; i++) {

    durantenoptions += `<option
      value="${ i }"
    >
      Durante ${ i } semanas
    </option>`
  }

  return `
    <div 
      id="Form"
      class="FormDates"
    > 
      <div class="Title">
        <div class="TitleText">
          ${ `Reserva el ${ data.diasemana } día ${ data.dia }` }
        </div>
        <button class="Close"><h3>x</h3></button>
      </div>
      <div class="Fields">
        <div class="Field HourSelector">
          <select 
            id="selecthour"
            name="hour"
          > 
            ${ houroptions }
          </select> 
        </div>
        <div class="Field DurationSelector">
          <select 
            id="selectduration"
            name="duration" 
            disabled="disabled"
          > 
            ${ durationoptions }
          </select> 
        </div>
        <div class="Field Recurrent">
          <input 
            id="isrecurrent"
            type="checkbox" 
            name="recurrent"
          /> 
          <label for="isrecurrent">
            Quiero reservar este horario los ${ data.diasemana }
          </label>
        </div>
        <div class="Field Durante">
          <select 
            id="recurrentuntil"
            name="duranten"
            disabled="disabled"
          > 
            ${ durantenoptions }
          </select> 
        </div>
        <div class="Field Title">
          <input 
            id="reservatitle"
            name="title"
            placeholder="Titulo de la reserva (requerido)"
          />
        </div>
      </div>
      <div class="Actions">
        <button 
          id="reservarmas"
          disabled="disabled"
        >
          Guardar y seguir
        </button>
        <button 
          id="reservar" 
          disabled="disabled"
        >
          Reservar
        </button>
      </div>
    </div>
  `
}

export const formreservaconfirmhtml = data => {

  return `
    <div 
      id="Form"
      class="FormReservaConfirm"
    >   
      <div class="Title">
        <button class="Close"><h3>x</h3></button>
      </div>    
      <div class="Text">
        ${ data.message }
      </div>
      <div class="Actions">
        <button 
          id="confirm"
        >
          Si
        </button>
      </div>
    </div>
  `
}

export const formerrorhtml = data => {

  return `
    <div 
      id="Form"
      class="FormError"
    >   
      <div class="Text">
        ${ data.message }
      </div>
      <div class="Actions">
        <button 
          id="confirm"
        >
          ${ data.confirmtext }
        </button>
      </div>
    </div>
  `
}

export const formeventhtml = data => {

  const date = moment(data.event.start).format('DD [de] MMMM [de] YYYY')
  let message = ''
  const extendeddata = data.event.extendedProps

  if(extendeddata.isrecurrent) {

    const rfrom = moment(extendeddata.startRecur).format('DD [de] MMMM [de] YYYY')
    const rto = moment(extendeddata.endRecur).format('DD [de] MMMM [de] YYYY')
    const rstart = moment(extendeddata.startTime).subtract(1, 'hour').format('HH:mm')
    const rend = moment(extendeddata.endTime).subtract(1, 'hour').format('HH:mm')

    message += `
      Esta reserva se repite 
      desde el dia 
      <strong>${ rfrom }</strong> 
      hasta el 
      <strong>${ rto }</strong>
      de las
      <strong>${ rstart }</strong>
      hasta las
      <strong>${ rend }</strong>
      horas.
    `
  } else {

    const start = moment(data.event.start).format('HH:mm')
    const end = moment(data.event.end).format('HH:mm')

    message += `
      De las
      <strong>${ start }</strong>
      hasta las
      <strong>${ end }</strong>
      horas.
    ` 
  }

  return `
    <div 
      id="Form"
      class="FormEvent"
    > 
      <div class="Title">
        <div class="TitleText">
          Reserva del dia ${ date }
        </div>
        <button class="Close"><h3>x</h3></button>
      </div> 
      <div class="Text">
        ${ message }
      </div>
      <div class="Actions">
        <input 
          id="deleteevent"
          type="submit" 
          value="Eliminar reserva"
        />
      </div>
    </div>
  `
}

export const formconfirmhtml = data => {

  return `
    <div 
      id="Form"
      class="FormConfirm"
    > 
      <div class="Fields">
        <div class="Field Mail">
          <input 
            id="yourmail"
            type="email" 
            placeholder="Tu Email para confirmar"
          /> 
        </div>
      </div>
      <div class="Actions">
        <input 
          id="confirmreservation"
          type="submit" 
          value="Confirmar" 
        /> 
      </div>
    </div>
  `
}