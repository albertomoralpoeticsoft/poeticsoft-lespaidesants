export const loginform = data => {

  return `
    <div class="Form LoginForm"> 
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

export const validateloginform = data => {

  return `
    <div class="Form ValidateLoginForm"> 
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

export const datesform = data => {

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
    <div class="Form DatesForm"> 
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

export const messageform = data => {

  return `
    <div class="Form MessageForm"> 
      <div class="Message">
        ${ data.message }
      </div>
    </div>
  `
}

export const confirmform = data => {

  return `
    <div class="Form ConfirmForm"> 
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