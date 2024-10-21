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
        <input 
          id="confirmmail"
          type="submit" 
          value="Si"
        /> 
        <input 
          id="changemail"
          type="submit" 
          value="No, quiero usar otro"
        /> 
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
        <input 
          id="confirmmail"
          type="submit" 
          value="Confirmar" 
          disabled="disabled"
        /> 
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
        Te hemos enviado un mail a tu correo, 
        Por favor escribe el código recibido 
        para validar tu dirección de coreo electrónico.
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
        <input 
          id="confirmcode"
          type="submit" 
          value="Confirmar código" 
          disabled="disabled"
        /> 
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

  let durantenoptions = '<option value="2">Selecciona hasta cuando (min 2 semanas)</option>'
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
        <button class="Close">x</button>
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
          <label for="recurrent">
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
        <input 
          id="reservarmas"
          type="submit" 
          value="Guardar y seleccionar más dias"
          disabled="disabled" 
        /> 
        <input 
          id="reservar"
          type="submit" 
          value="Reservar" 
          disabled="disabled" 
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